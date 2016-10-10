import { Schema, Text, MarkType, NodeType as _NodeType } from "ak-editor-prosemirror";

type AnyObject = { [key: string]: any };

interface ContentElement {
  marks: boolean | MarkType[];
  nodeTypes: NodeType[];
  min: number;
  max: number;
}

interface ContentExpression {
  nodeType: NodeType;
  elements: ContentElement[];
}

class NodeType extends _NodeType {
  contentExpr: ContentExpression;
}

function assert(expr: boolean, error: string) {
  if (!expr) {
    throw new Error(error);
  }
}

function isEmpty(properties: AnyObject | any[]): boolean {
  const size = Array.isArray(properties)
    ? properties.length
    : Object.keys(properties).length;

  return size === 0;
}

function createMarkDef(schema: Schema, name: string) {
  const mark = schema.marks[name];
  const definition: AnyObject = {
    type: 'object',
    properties: {
      _: { 'enum': [name] },
    },
    required: ['_'],
    additionalProperties: false,
  };

  Object.keys(mark.attrs).forEach(key => {
    const attr = mark.attrs[key];
    definition['properties'][key] = {type: 'string'};
    if (attr.isRequired) {
      definition['required'].push(key);
    }
  });

  return definition;
}

const everHasMarks = (schema: Schema, nodeName: string) => Object
  .keys(schema.nodes)
  .map(nodeName => schema.nodes[nodeName])
  .map(node => node.contentExpr.elements)
  .reduce((acc, x) => acc.concat(x), [])
  .filter((contentElement: ContentElement) => contentElement.nodeTypes
    .some(nodeType => nodeType.name === nodeName))
  .map((contentElement: ContentElement) => contentElement.marks)
  .some(Boolean);

function createTextNodeDef(schema: Schema, nodeName: string) {
  const definition: AnyObject = {
    properties: {
      text: {
        minLength: 1,
        type: 'string'
      },
      type: { 'enum': [nodeName] },
    },
    required: ['text', 'type'],
    additionalProperties: false,
  };

  if (everHasMarks(schema, nodeName)) {
    definition['properties']['marks'] = {};
  }

  return definition;
}

function createBlockNodeDef(schema: Schema, nodeName: string) {
  const { nodeType, elements } = schema.nodes[nodeName].contentExpr;
  assert(elements.length <= 2, 'JSON Schema can not express more than two sequenced elements.');

  const definition: AnyObject = {
    properties: {
      type: { 'enum': [nodeName] },
    },
    required: ['type'],
    additionalProperties: false,
  };

  const makeNodeSchema = (elem: ContentElement): AnyObject => {
    const nodeNames: string[] = elem.nodeTypes.map((type: NodeType) => type.name);
    const refs = nodeNames.map(name => ({ '$ref': `#/definitions/${name}_node` }));
    const nodes = refs.length === 1 ? refs[0] : { anyOf: refs };
    const markNames: string[] = elem.marks === true
      ? Object.keys(schema.marks)
      : (elem.marks || []).map(mark => mark.name);

    if (markNames.length) {
      return {
        allOf: [
          nodes,
          {
            properties: {
              marks: {
                type: 'array',
                items: {
                  anyOf: markNames.map(name => (
                  { $ref: `#/definitions/${name}_mark` }
                  )),
                }
              }
            }
          }
        ]
      };
    } else if (nodeNames.some(name => everHasMarks(schema, name))) {
      return {
        allOf: [
          nodes,
          {
            properties: {
              marks: {
                maxItems: 0
              }
            }
          }
        ]
      };
    } else {
      return nodes;
    }
  };

  const content: AnyObject = {
    type: 'array',
    items: [],
    minItems: 0,
  };

  const [ first, second ] = elements;

  if (first) {
    content['items'] = makeNodeSchema(first);
    content['minItems'] = first.min;

    if (second) {
      // It's not possible to express 'p{2} inline*'
      assert(content['minItems'] === 1, 'JSON Schema is unable to express an array with multiple specific leading items.');

      // Switch to tuple mode.
      content['items'] = [ content['items'] ];
      content['additionalItems'] = makeNodeSchema(second);
      content['minItems'] += second.min;
    }
  }

  if (content['minItems'] === 0) {
    delete content['minItems'] ;
  } else {
    definition['required'].push('content');
  }

  if (!isEmpty(content['items'] )) {
    definition['properties'].content = content;
  }

  definition['properties']['attrs'] = {
    type: 'object',
    properties: {},
    required: [],
  };

  Object.keys(nodeType.attrs).forEach(key => {
    const attr = nodeType.attrs[key];
    definition['properties']['attrs']['properties'][key] = {};
    if (attr.isRequired) {
      definition['properties']['attrs']['required'].push(key);
    }
  });

  if (definition['properties']['attrs']['required'].length > 0) {
    definition['required'].push('attrs');
  } else {
    delete definition['properties']['attrs']['required'];
  }

  if (isEmpty(definition['properties']['attrs']['properties'])) {
    delete definition['properties']['attrs'];
  }

  return definition;
}

function createNodeDef(schema: Schema, name: string) {
  const { nodeType } = schema.nodes[name].contentExpr;

  if (nodeType instanceof Text) {
    return createTextNodeDef(schema, name);
  } else {
    return createBlockNodeDef(schema, name);
  }
}

export default function(schema: Schema) {
  return {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'description': 'Schema for Atlassian Editor documents.',
    '$ref': '#/definitions/doc_node',
    'definitions': Object.assign(
      {},
      ...Object.keys(schema.nodes).map(name => (
        { [`${name}_node`]: createNodeDef(schema, name) }
      )),
      ...Object.keys(schema.marks).map(name => (
        { [`${name}_mark`]: createMarkDef(schema, name) }
      )),
    ),
  };
}
