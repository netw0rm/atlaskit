import { Node } from 'prosemirror/dist/model';
import { Context } from './';

export default function(context: Context) {
  type Content = string | Node | Node[];
  type Attrs = {[key: string]: any};

  function flatten(content: Content[]) {
    let result: Node[] = [];

    content.forEach(child => {
      if (typeof child === "string") {
        result.push(context.schema.text(child));
      } else if (child instanceof context.Node) {
        result.push(child);
      } else if (child instanceof Array) {
        result = result.concat(child);
      }
    });

    return result;
  }

  function block(type: string, attrs?: Attrs) {
    return function(...content: Content[]): Node {
      const nodes = flatten(content);
      return context.schema.nodes[type].create(attrs, nodes);
    }
  }

  function mark(type: string, attrs?: Attrs) {
    const mark = context.schema.mark(type, attrs)
    return (...content: Content[]) => flatten(content)
      .map(n => mark.type.isInSet(n.marks)
        ? n
        : n.mark(mark.addToSet(n.marks)));
  }

  return {
    doc: block("doc"),
    p: block("paragraph"),
    blockquote: block("blockquote"),
    pre: block("code_block"),
    h1: block("heading", {level: 1}),
    h2: block("heading", {level: 2}),
    li: block("list_item"),
    ul: block("bullet_list"),
    ol: block("ordered_list"),
    br: context.schema.node("hard_break"),
    img: (attrs: { src: string, alt?: string, title?: string }) => context.schema.node("image", attrs),
    hr: context.schema.node("horizontal_rule"),
    em: mark("em"),
    strong: mark("strong"),
    code: mark("code"),
    a: (attrs: { href: string }) => mark("link", attrs),
    text: (text: string) => context.schema.text(text),
    fragment: (...content: Content[]) => flatten(content),
    slice: (...content: Content[]) => new context.Slice(new context.Fragment(flatten(content)), 0, 0),
  };
};
