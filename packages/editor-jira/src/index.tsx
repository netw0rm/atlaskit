import {
  AnalyticsHandler,
  analyticsService,
  BlockTypePlugin,
  Chrome,
  CodeBlockPlugin,
  ContextName,
  HorizontalRulePlugin,
  Keymap,
  ListsPlugin,
  ProseMirror,
  TextFormattingPlugin
} from 'ak-editor-core';
import * as React from 'react';
import { PureComponent } from 'react';
import { encode, parse } from './html';
import { makeSchema, SupportedSchema } from './schema';

export interface Props {
  context?: ContextName;
  isExpandedByDefault?: boolean;
  defaultValue?: string;
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  placeholder?: string;
  analyticsHandler?: AnalyticsHandler;
  allowLists?: boolean;
}

export interface State {
  pm?: ProseMirror;
  isExpanded?: boolean;
  schema: SupportedSchema;
}

export default class Editor extends PureComponent<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      isExpanded: props.isExpandedByDefault,
      schema: makeSchema(!!props.allowLists),
    };

    analyticsService.handler = props.analyticsHandler || ((name) => {});
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
   * Clear the content of the editor, making it an empty document.
   */
  clear(): void {
    const { pm } = this.state;
    if (pm) {
      pm.tr.delete(0, pm.doc.nodeSize - 2).apply();
    }
  }

  /**
   * Check if the user has entered any significant content.
   * (i.e. text)
   */
  isDirty(): boolean {
    const { pm } = this.state;
    return pm && pm.doc
      ? !!pm.doc.textContent
      : false;
  }

  /**
   * The current value of the editor, encoded as HTML.
   */
  get value(): string | undefined {
    const { pm, schema } = this.state;
    return pm
      ? encode(pm.doc, schema)
      : this.props.defaultValue;
  }

  render() {
    const { pm, isExpanded, schema } = this.state;
    const handleCancel = this.props.onCancel ? this.handleCancel : undefined;
    const handleSave = this.props.onSave ? this.handleSave : undefined;

    return (
      <Chrome
        children={<div ref={this.handleRef} />}
        isExpanded={isExpanded}
        onCancel={handleCancel}
        onSave={handleSave}
        onCollapsedChromeFocus={() => this.setState({ isExpanded: true, schema })}
        placeholder={this.props.placeholder}
        pluginStateBlockType={pm && BlockTypePlugin.get(pm)}
        pluginStateLists={pm && ListsPlugin.get(pm)}
        pluginStateTextFormatting={pm && TextFormattingPlugin.get(pm)}
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

  private handleRef = (place: Element | null) => {
    const { schema } = this.state;
    if (place) {
      const { context } = this.props;
      const pm = new ProseMirror({
        place,
        doc: parse(this.props.defaultValue || '', schema),
        plugins: [
          BlockTypePlugin,
          CodeBlockPlugin,
          ListsPlugin,
          TextFormattingPlugin,
          HorizontalRulePlugin
        ],
      });

      if (context) {
        BlockTypePlugin.get(pm)!.changeContext(context);
      }

      pm.addKeymap(new Keymap({
        'Mod-Enter': this.handleSave
      }));

      pm.on.domPaste.add(() => {
        analyticsService.trackEvent('atlassian.editor.paste');
      });

      pm.on.change.add(this.handleChange);
      pm.focus();

      analyticsService.trackEvent('atlassian.editor.start');

      this.setState({ pm, schema });
    } else {
      this.setState({ pm: undefined, schema });
    }
  }
}
