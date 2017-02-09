import {
  BlockTypePlugin,
  DocNode,
  EmojisPluginFactory,
  EmojiTypeAhead,
  HyperlinkEdit,
  HyperlinkPlugin,
  Keymap,
  MentionPicker,
  MentionsPlugin,
  Plugin,
  ProseMirror,
  TextSelection,
} from '@atlaskit/editor-core';
import * as cx from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import schema from './schema';

let debounced: number | null = null;

const emojiAttrs = (node) => {
  const { emojiService, ...attrs } = node.attrs;
  return attrs;
};

const hipchatSerializer = (doc: any) => {
  const root = doc.content[0];

  if (!root.content) {
    return [];
  }

  return root.content.map(node => {
    switch (node.type) {
      case 'emoji':
        node = {
          type: 'emoji',
          attrs: emojiAttrs(node),
        };
        break;

      case 'mention':  // Hipchat expects a 'text'-field for mentions
        node.text = node.attrs.displayName;
        break;

      case 'text':  // Hipchat expects text nodes to always have a marks array
        node.marks = (node.marks || []).map(mark => {
          if (mark._ === 'link') {
            return {
              type: mark._,
              attrs: {
                url: mark.href
              }
            };
          }
          return mark;
        });
        break;

      case 'hard_break': // Hipchat expects hard breaks to be text
        node = {
          type: 'text',
          text: '\n',
          marks: []
        };
        break;
    }

    return node;
  });
};

const hipchatDeserializer = (content: any, emojiService: any) => {
  return content.map(node => {
    switch (node.type) {
      case 'emoji': {
        node = {
          type: 'emoji',
          attrs: {
            ...node.attrs,
            emojiService,
          },
        };
      }
    }
    return node;
  });
};

export type Doc = {
  type: 'doc',
  content?: any[]
};

export interface Props {
  id?: string;
  maxContentSize?: number;
  onSubmit?: (doc: Doc) => void;
  onChange?: () => void;
  mentionResourceProvider?: any;
  emojiService?: any;
  reverseMentionPicker?: boolean;
}

export interface State {
  pm?: ProseMirror;
  maxLengthReached?: boolean;
  flashToggle?: boolean;
}

export default class Editor extends PureComponent<Props, State> {
  private emojiPlugin: Plugin<any>;

  public static defaultProps: Props = {
    reverseMentionPicker: true
  };

  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {};
    // FIXME deal with prop change
    this.emojiPlugin = EmojisPluginFactory({ emojiService: props.emojiService});
  }

  render() {
    const { props } = this;
    const { pm } = this.state;

    const pluginStateMentions = props.mentionResourceProvider && pm && MentionsPlugin.get(pm);
    const pluginStateHyperlink = pm && HyperlinkPlugin.get(pm);
    const pluginStateEmojis = props.emojiService && pm && this.emojiPlugin.get(pm);
    const classNames = cx('ak-editor-hipchat', {
      'max-length-reached': this.state.maxLengthReached,
      'flash-toggle': this.state.flashToggle
    });

    return (
      <div className={classNames} id={this.props.id}>
        <div ref={this.handleRef}>
          {!pluginStateHyperlink ? null :
            <HyperlinkEdit pluginState={pluginStateHyperlink} />
          }
          {!pluginStateMentions ? null :
            <MentionPicker resourceProvider={props.mentionResourceProvider} pluginState={pluginStateMentions} reversePosition={props.reverseMentionPicker} />
          }
          {!pluginStateEmojis ? null :
            <EmojiTypeAhead emojiService={props.emojiService} pluginState={pluginStateEmojis} />
          }
        </div>
      </div>
    );
  }

  private handleRef = (place: Element | null) => {
    if (!place) {
      return this.setState({ pm: undefined });
    }

    const { props } = this;
    const pm = new ProseMirror({
      place,
      doc: schema.nodes.doc.createAndFill(),
      plugins: [
        BlockTypePlugin,
        HyperlinkPlugin,
        ...(this.props.mentionResourceProvider ? [MentionsPlugin] : []),
        ...(this.props.emojiService ? [this.emojiPlugin] : [])
      ],
    });

    if (place instanceof HTMLElement) {
      const content = place.querySelector('[contenteditable]');
      if (content instanceof HTMLElement) {
        content.style.outline = 'none';
        content.style.whiteSpace = 'pre-wrap';
      }
    }

    pm.addKeymap(new Keymap({
      'Enter': () => {
        if (this.props.onSubmit) {
          this.props.onSubmit(hipchatSerializer(pm.doc.toJSON()));
        }
      }
    }), -10);

    const { maxContentSize } = props;
    if (maxContentSize) {
      pm.on.transform.add((tr) => {
        if (tr.doc.nodeSize > maxContentSize) {
          const doc = tr.docs[0] as DocNode;
          pm.setDoc(doc, new TextSelection(doc.resolve(doc.nodeSize - 3)));
          this.setState({
            maxLengthReached: true,
            flashToggle: this.state.maxLengthReached && !this.state.flashToggle
          });
        } else if (this.state.maxLengthReached) {
          this.setState({
            maxLengthReached: false,
            flashToggle: false
          });
        }
      });
    }

    pm.on.change.add(this.handleChange);

    this.setState({ pm });
  }

  private handleChange = () => {
    const { onChange } = this.props;
    if (onChange) {
      if (debounced) {
        clearTimeout(debounced);
      }

      debounced = setTimeout(() => { onChange(); }, 200);
    }
  }

  get documentSize(): number {
    const { pm } = this.state;
    return pm ? pm.doc.nodeSize : 0;
  }

  get value(): string {
    const { pm } = this.state;
    return pm
      ? hipchatSerializer(pm.doc.toJSON())
      : '';
  }

  setFromJson(value: any): void {
    const { pm } = this.state;
    if (pm) {
      const val = {
        type: 'paragraph',
        content: (value.length ? hipchatDeserializer(value, this.props.emojiService) : [{ type: 'text', text: ' ' }]) // We need to insert a space instead of an empty node in order to trigger the update event (which will close the mentions picker)
      };

      pm.setDoc(schema.nodes.doc.create({}, pm.schema.nodeFromJSON(val)));
      pm.setSelection(new TextSelection(pm.doc.resolve(pm.doc.nodeSize - 3)));
      pm.flush();

      if (!value.length) {
        this.clear(); // Part of hack above
      }
    }
  }

  clear(): void {
    const { pm } = this.state;
    if (pm) {
      pm.tr.delete(0, pm.doc.nodeSize - 2).apply();
    }
  }

  focus(): void {
    const { pm } = this.state;
    if (pm) {
      pm.focus();
    }
  }

  appendText(text: string): void {
    const { pm } = this.state;
    if (pm) {
      pm.tr.typeText(text).applyAndScroll();
    }
  }
}
