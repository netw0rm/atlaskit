import { Keymap, ProseMirror, Fragment, MentionsPlugin, MentionPicker, TextSelection, DocNode } from 'ak-editor-core';
import * as React from 'react';
import { PureComponent } from 'react';
import schema from './schema';

const hipchatSerializer = (doc: any) => {
  const root = doc.content[0];

  if (!root.content) {
    return [];
  }

  return root.content.map((node: any) => {
    switch (node.type) {
      case 'mention':  // Hipchat expects a 'text'-field for mentions
        node.text = node.attrs.displayName;
        break;

      case 'text':  // Hipchat expect empty marks for text
        node.marks = node.marks || [];
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
  reverseMentionPicker?: boolean;
}

export interface State {
  pm?: ProseMirror;
}

export default class Editor extends PureComponent<Props, State> {
  public static defaultProps: Props = {
    reverseMentionPicker: true
  };

  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  private insertNewLine(): boolean {
    const { pm } = this.state;

    if (!pm) {
      return false;
    }

    const { $from } = pm.selection;
    const node = $from.parent;
    const { hard_break } = pm.schema.nodes;

    if(hard_break) {
      const hardBreakNode = hard_break.create();

      if(node.type.validContent(Fragment.from(hardBreakNode))) {
        pm.tr.replaceSelection(hardBreakNode).applyAndScroll();
        return true;
      }
    }

    pm.tr.typeText('\n').applyAndScroll();
    return true;
  }

  render() {
    const { props } = this;
    const { pm } = this.state;

    const pluginStateMentions = props.mentionResourceProvider && pm && MentionsPlugin.get(pm);

    return (
      <div className="ak-editor-hipchat" id={this.props.id ? this.props.id : undefined}>
        <div ref={this.handleRef}>
          {!pluginStateMentions ? null:
            <MentionPicker resourceProvider={props.mentionResourceProvider} pluginState={pluginStateMentions} reversePosition={props.reverseMentionPicker} />
          }
        </div>
      </div>
    );
  }

  private handleRef = (place: Element | null) => {
    if (place) {

      const { props } = this;
      const pm = new ProseMirror({
        place,
        doc: schema.nodes.doc.createAndFill(),
        plugins: [
          ...(this.props.mentionResourceProvider ? [ MentionsPlugin ] : [] )
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
        },
        'Shift-Enter': () => {
          this.insertNewLine();
        }
      }), -10);

      if (props.maxContentSize) {
        pm.on.transform.add((tr) => {
          if (tr.doc.nodeSize > props.maxContentSize) {
            const doc = tr.docs[0] as DocNode;
            pm.setDoc(doc, new TextSelection(doc.resolve(doc.nodeSize - 3)));
          }
        });
      }

      pm.on.change.add(this.handleChange);

      this.setState({ pm });
    } else {
      this.setState({ pm: undefined });
    }
  }

  private handleChange = (evt) => {
    const { pm } = this.state;
    const { onChange } = this.props;

    if (onChange) {
      onChange();
    }
  }

  /** 
   * Return the current document's node size
   */
  get documentSize(): number {
    const { pm } = this.state;
    return pm ? pm.doc.nodeSize : 0;
  }

  /**
   * Return the current hipchat-friendly value from the editor.
   */
  get value(): string | undefined {
    const { pm } = this.state;
    return pm
      ? hipchatSerializer(pm.doc.toJSON())
      : '';
  }

  /**
   * Set value from JSON
   */
  setFromJson(value: any): void {
    const { pm } = this.state;
    if (pm) {
      const val = {
        type: 'paragraph',
        content: (value.length ? value : [{ type: 'text', text: ' ' }]) // We need to insert a space instead of an empty node in order to trigger the update event (which will close the mentions picker)
      };

      pm.setDoc(schema.nodes.doc.create({}, pm.schema.nodeFromJSON(val)));
      pm.setSelection(new TextSelection(pm.doc.resolve(pm.doc.nodeSize - 3)));
      pm.flush();

      if (!value.length) {
        this.clear(); // Part of hack above
      }
    }
  }

  /**
   * Clear the content of the editor, making it an empty document.
   */
  clear(): void {
    const { pm } = this.state;
    if (pm) {
      pm.tr.delete(0, pm.doc.nodeSize - 2).apply();
    }
  }

  /**
   * Focus the content region of the editor.
   */
  focus(): void {
    const { pm } = this.state;
    if (pm) {
      pm.focus();
    }
  }

  /**
   * Append text
   */
  appendText(text: string): void {
    const { pm } = this.state;
    if (pm) {
      pm.tr.typeText(text).applyAndScroll();
    }
  }
}
