import { Schema, Text, NodeType } from "ak-editor-prosemirror";

function assert(expr: boolean, error: string) {
  if (!expr) {
    throw new Error(error);
  }
}

function empty(properties: any) {
  const size = Array.isArray(properties)
    ? properties.length
    : Object.keys(properties).length;

  return size === 0;
}

function createMarkDef(schema: Schema, name: string) {
  const mark = schema.marks[name];
  const definition: any = {
    type: 'object',
    properties: {
      _: { enum: [name] },
    },
    required: ['_'],
    additionalProperties: false,
  };

  Object.keys(mark.attrs).forEach(key => {
    const attr = mark.attrs[key];
    definition.properties[key] = {type: 'string'};
    if (attr.isRequired) {
      definition.required.push(key);
    }
  });

  return definition;
}

function createTextNodeDef(name: string) {
  return {
    properties: {
      text: {
        minLength: 1,
        type: 'string'
      },
      type: { enum: [name] },
    },
    required: ['text', 'type'],
    additionalProperties: false,
  }
}

function createBlockNodeDef(schema: Schema, name: string) {
  const { nodeType, elements } = schema.nodes[name].contentExpr;
  assert(elements.length <= 2, 'JSON Schema can not express more than two sequenced elements.');

  const definition: any = {
    properties: {
      type: { enum: [name] },
    },
    required: ['type'],
    additionalProperties: false,
  };

  const makeNodeSchema = (expr: any) => {
    const refs = expr.nodeTypes.map((type: NodeType) => ({
      '$ref': `#/definitions/${type.name}_node`,
    }));

    const nodes = refs.length === 1 ? refs[0] : { oneOf: refs };
    const markNames: string[] = expr.marks === true
      ? Object.keys(schema.marks)
      : (expr.marks || []).map((mark: any) => mark.name);

    return markNames.length === 0 ? nodes : {
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
  };

  const content: any = {
    type: 'array',
    items: [],
    minItems: 0,
  };

  const [ first, second ] = elements;

  if (first) {
    content.items = makeNodeSchema(first);
    content.minItems = first.min;

    if (second) {
      // It's not possible to express 'p{2} inline*'
      assert(content.minItems === 1, 'JSON Schema is unable to express an array with multiple specific leading items.');

      // Switch to tuple mode.
      content.items = [ content.items ];
      content.additionalItems = makeNodeSchema(second);
      content.minItems += second.min;
    }
  }

  if (content.minItems === 0) {
    delete content.minItems;
  }

  if (!empty(content.items)) {
    definition.properties.content = content;
    definition.required.push('content');
  }

  definition.properties.attrs = {
    type: 'object',
    properties: {},
    required: [],
  };

  Object.keys(nodeType.attrs).forEach(key => {
    const attr = nodeType.attrs[key];
    definition.properties.attrs.properties[key] = {type: 'string'};
    if (attr.isRequired) {
      definition.properties.attrs.required.push(key);
    }
  });

  if (definition.properties.attrs.required.length > 0) {
    definition.required.push('attrs');
  } else {
    delete definition.properties.attrs.required;
  }

  if (empty(definition.properties.attrs.properties)) {
    delete definition.properties.attrs;
  }

  return definition;
}

function createNodeDef(schema: Schema, name: string) {
  const { nodeType } = schema.nodes[name].contentExpr;

  if (nodeType instanceof Text) {
    return createTextNodeDef(name);
  } else {
    return createBlockNodeDef(schema, name);
  }
}

export default function(schema: Schema) {
  return {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'description': 'Schema for Atlassian Editor documents.',
    'type': 'object',
    'required': [ 'doc' ],
    'properties': {
      'doc': {
        '$ref': '#/definitions/doc_node',
      },
    },
    'additionalProperties': false,
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
