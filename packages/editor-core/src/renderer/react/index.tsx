import * as React from 'react';

import {
  Fragment,
  Mark,
  Node,
  Schema,
} from '../../prosemirror';

import {
  Serializer,
} from '../serializer';

import {
  mergeTextNodes,
  isTextWrapper,
  TextWrapper,
  toReact,
} from './nodes';

import {
  toReact as markToReact
} from './marks';

import {
  getMarksByOrder,
  isSameMark,
} from '../validator';

import ProviderFactory from '../../providerFactory';
import { EventHandlers } from '../../ui/Renderer';

export type ReactComponentConstructor = new () => React.Component<any, any>;

export default class ReactSerializer implements Serializer<JSX.Element> {
  private providers?: ProviderFactory;
  private eventHandlers?: EventHandlers;

  constructor(providers?: ProviderFactory, eventHandlers?: EventHandlers) {
    this.providers = providers;
    this.eventHandlers = eventHandlers;
  }

  serializeNode(node: Node, index: number = 0): JSX.Element | null {
    const content = ReactSerializer.getChildNodes(node.content).map((childNode, index) => {
      if (isTextWrapper(childNode.type.name)) {
        return this.serializeTextWrapper((childNode as TextWrapper).content);
      }

      return this.serializeNode(childNode as Node, index);
    });

    return this.renderNode(node, `${node.type.name}-${index}`, content);
  }

  private serializeTextWrapper(content: Node[]) {
    return ReactSerializer
      .buildMarkStructure(content)
      .map((mark, index) => this.serializeMark(mark, index));
  }

  private serializeMark(mark: Mark, index: number = 0) {
    if (mark.type.name === 'text') {
      return (mark as any).text;
    }

    const content = ((mark as any).content || []).map((child, index) => this.serializeMark(child, index));
    return this.renderMark(markToReact(mark), this.getMarkProps(mark), `${mark.type.name}-${index}`, content);
  }

  private getDOMDataAttributes(node: Node) {
    const attrs = node.type.spec.toDOM ? node.type.spec.toDOM(node) : null;
    if (!attrs || !attrs[1]) {
      return null;
    }
    const dataAttrs = attrs[1];
    return Object.keys(dataAttrs).reduce((accu, key) => {
      if (key.match(/^data-/)) {
        accu[key] = dataAttrs[key];
      }
      return accu;
    }, {});
  }

  private renderNode(node: Node, key: string, content: (string | JSX.Element | any[] | null | undefined)): JSX.Element {
    // tslint:disable-next-line:variable-name
    const Component = toReact(node);
    const props = this.getProps(node);
    const dataAttrs = this.getDOMDataAttributes(node);
    return (
      <Component key={key} {...props} dataAttrs={dataAttrs}>
        {content}
      </Component>
    );
  }

  // tslint:disable-next-line:variable-name
  private renderMark(Mark: ReactComponentConstructor, props: any, key: string, content: any) {
    return (
      <Mark key={key} {...props}>
        {content}
      </Mark>
    );
  }

  private getProps(node: Node) {
    return {
      text: node.text,
      providers: this.providers,
      eventHandlers: this.eventHandlers,
      ...node.attrs,
    };
  }

  private getMarkProps(mark: Mark): any {
    return mark.attrs;
  }

  static getChildNodes(fragment: Fragment): (Node | TextWrapper)[] {
    const children: Node[] = [];
    fragment.forEach(node => {
      children.push(node);
    });
    return mergeTextNodes(children) as Node[];
  }

  static getMarks(node: Node): Mark[] {
    if (!node.marks || node.marks.length === 0) {
      return [];
    }

    return getMarksByOrder(node.marks);
  }

  static buildMarkStructure(content: Node[]) {
    let currentMarkNode: any;
    return content.reduce((acc, node, index) => {

      const nodeMarks = this.getMarks(node);

      if (nodeMarks.length === 0) {
        currentMarkNode = node;
        acc.push(currentMarkNode);
      } else {
        nodeMarks.forEach((mark, markIndex) => {
          const isSameAsPrevious = isSameMark(mark, currentMarkNode as Mark);
          const previousIsInMarks = markIndex > 0 && nodeMarks.some(m => isSameMark(m, currentMarkNode));

          if (!isSameAsPrevious) {
            let newMarkNode: any = {
              ...mark,
              content: [],
            };

            if (previousIsInMarks) {
              currentMarkNode.content!.push(newMarkNode);
              currentMarkNode = newMarkNode;
            } else {
              acc.push(newMarkNode);
              currentMarkNode = newMarkNode;
            }
          }
        });

        currentMarkNode.content!.push(node);
      }

      return acc;
    }, [] as Mark[]);
  }

  static fromSchema(schema: Schema<any, any>, providers?: ProviderFactory, eventHandlers?: EventHandlers): ReactSerializer {
    // TODO: Do we actually need the schema here?
    return new ReactSerializer(providers, eventHandlers);
  }
}
