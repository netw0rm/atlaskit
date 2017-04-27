import { Fragment, MarkSpec, NodeSpec, Schema  } from '../prosemirror';
import schema from './atlassian';

export function renderText(doc: any): string {
  const node = schema.nodeFromJSON(doc);
  const serializer = TextSerializer.fromSchema(schema);
  return serializer.serializeFragment(node.content);
}

interface SerializerMap {
  [key: string]: Function;
}

class TextSerializer {
  private nodes: SerializerMap;
  private marks: SerializerMap;

  constructor(nodes: SerializerMap, marks: SerializerMap) {
    this.nodes = nodes || {};
    this.marks = marks || {};
  }

  serializeFragment(fragment: Fragment): string {
    const text: string[] = [];
    fragment.forEach(node => {
      // TODO: handle marks
      if (node && !node.isLeaf) {
        text.push(this.serializeFragment(node.content));
      } else if (this.nodes[node.type.name]) {
        text.push(this.nodes[node.type.name](node));
      }
    });
    return text.join('');
  }

  static fromSchema(schema: Schema<NodeSpec, MarkSpec>): TextSerializer {
    // TODO: memoization
    return new TextSerializer(this.nodesFromSchema(schema), this.marksFromSchema(schema));
  }

  static nodesFromSchema(schema: Schema<NodeSpec, MarkSpec>): SerializerMap {
    const result = gatherToText(schema.nodes);
    // if (!result.text) result.text = node => node.text;
    return result;
  }

  static marksFromSchema(schema: Schema<NodeSpec, MarkSpec>): SerializerMap {
    return gatherToText(schema.marks);
  }
}

function gatherToText(obj: any): SerializerMap {
  const result: SerializerMap = {};
  for (let name in obj) {
    const toText = obj[name].spec.toText;
    if (toText) result[name] = toText;
  }
  return result;
}
