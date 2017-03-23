import * as React from 'react';
import { PureComponent } from 'react';
import {
  BlockTypePlugin,
  Chrome,
  ContextName,
  HyperlinkPlugin,
  ListsPlugin,
  MentionsPlugin,
  Node,
  PanelPlugin,
  ProseMirror,
  TextFormattingPlugin,
  ClearFormattingPlugin,
  DefaultKeymapsPlugin,
} from '../../';
import schema from './schema';

export interface Props {
  context?: ContextName;
  isExpandedByDefault?: boolean;
  defaultValue?: string;
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  placeholder?: string;
  imageUploader?: Function;
}

export interface State {
  pm?: ProseMirror;
  isExpanded?: boolean;
}

export default class Editor extends PureComponent<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { isExpanded: props.isExpandedByDefault };
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

  expand = () => {
    this.setState({ isExpanded: true });
  }


  collapse = () => {
    this.setState({ isExpanded: false });
  }


  clear(): void {
    const { pm } = this.state;
    if (pm) {
      pm.tr.delete(0, pm.doc.nodeSize - 2).apply();
    }
  }

  isEmpty(): boolean {
    const { pm } = this.state;
    return pm && pm.doc
      ? !!pm.doc.textContent
      : false;
  }

  get value(): string | undefined {
    return this.props.defaultValue;
  }

  get doc(): Node | undefined {
    const { pm } = this.state;
    return pm
      ? pm.doc
      : undefined;
  }

  render() {
    const handleCancel = this.props.onCancel ? this.handleCancel : undefined;
    const handleSave = this.props.onSave ? this.handleSave : undefined;
    const { pm, isExpanded } = this.state;

    return (
      <Chrome
        children={<div ref={this.handleRef} />}
        isExpanded={isExpanded}
        feedbackFormUrl="https://atlassian.wufoo.com/embed/zy8kvpl0qfr9ov/"
        onCancel={handleCancel}
        onSave={handleSave}
        placeholder={this.props.placeholder}
        onCollapsedChromeFocus={this.expand}
        pluginStateBlockType={pm && BlockTypePlugin.get(pm)}
        pluginStateHyperlink={pm && HyperlinkPlugin.get(pm)}
        pluginStateLists={pm && ListsPlugin.get(pm)}
        pluginStateTextFormatting={pm && TextFormattingPlugin.get(pm)}
        pluginStateClearFormatting={pm && ClearFormattingPlugin.get(pm)}
        pluginStatePanel={pm && PanelPlugin.get(pm)}
      />
    );
  }

  private handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel(this);
    }
  }

  private handleChange = () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(this);
    }
  }

  private handleSave = () => {
    const { onSave } = this.props;
    if (onSave) {
      onSave(this);
    }
  }

  private parseHtml(html: string) {
    const el = document.createElement('div');
    el.innerHTML = html;
    return schema.parseDOM(el);
  }

  private handleRef = (place: Element | null) => {
    if (place) {
      const { context } = this.props;
      const pm = new ProseMirror({
        place,
        doc: this.parseHtml(this.props.defaultValue || ''),
        // doc: schema.nodes.doc.create({}, schema.nodes.paragraph.create({}, schema.text(''))),
        plugins: [
          HyperlinkPlugin,
          BlockTypePlugin,
          ListsPlugin,
          TextFormattingPlugin,
          ClearFormattingPlugin,
          MentionsPlugin,
          PanelPlugin,
          DefaultKeymapsPlugin,
        ],
      });

      if (context) {
        BlockTypePlugin.get(pm)!.changeContext(context);
      }

      pm.on.change.add(this.handleChange);
      pm.focus();

      this.setState({ pm });
    } else {
      this.setState({ pm: undefined });
    }
  }
}
