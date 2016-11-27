import React, { PureComponent } from 'react';
import AkButton from 'ak-button';
import AkButtonGroup from 'ak-button-group';
import { ProseMirror } from 'ak-editor-prosemirror';
import { BlockTypePlugin } from 'ak-editor-plugin-block-type';
import { HyperlinkPlugin } from 'ak-editor-plugin-hyperlink';
import { ListsPlugin } from 'ak-editor-plugin-lists';
import { TextFormattingPlugin } from 'ak-editor-plugin-text-formatting';
import MentionIcon from 'ak-icon/glyph/editor/mention';
import ImageIcon from 'ak-icon/glyph/editor/image';
import * as styles from './styles.global.less';
import ToolbarIconButton from '../ToolbarIconButton/index.react';
import ToolbarBlockType from '../ToolbarBlockType/index.react';
import ToolbarLists from '../ToolbarLists/index.react';
import ToolbarHyperlink from '../ToolbarHyperlink/index.react';
import ToolbarTextFormatting from '../ToolbarTextFormatting/index.react';
import ToolbarFeedback from '../ToolbarFeedback/index.react';

interface Props {
  feedbackFormUrl?: string;
  onCancel?: () => void;
  onInsertMention?: () => void;
  onInsertImage?: () => void;
  onSave?: () => void;
  pm?: ProseMirror;
}

interface State {}

export default class ChromeExpanded extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { props } = this;
    const { pm } = props;

    const blockTypePluginState = pm ? BlockTypePlugin.get(pm) : null;
    const hyperlinkPluginState = pm ? HyperlinkPlugin.get(pm): null;
    const listsPluginState = pm ? ListsPlugin.get(pm) : null;
    const textFormattingPluginState = pm ? TextFormattingPlugin.get(pm) : null;

    return (
      <div
        className={styles.container}
        // Prevent any keyboard events from bubbling outside of the editor chrome
        onKeyDown={this.handleKeyEvent}
        onKeyUp={this.handleKeyEvent}
        onKeyPress={this.handleKeyEvent}
      >
        <div className={styles.toolbar}>
          {blockTypePluginState ? <ToolbarBlockType pluginState={blockTypePluginState} /> : null}
          {textFormattingPluginState ? <ToolbarTextFormatting pluginState={textFormattingPluginState} /> : null}
          {hyperlinkPluginState ? <ToolbarHyperlink pluginState={hyperlinkPluginState} /> : null}
          {listsPluginState ? <ToolbarLists pluginState={listsPluginState} /> : null}
          <span style={{ flexGrow: 1 }} />
          {props.feedbackFormUrl ? <ToolbarFeedback feedbackFormUrl={props.feedbackFormUrl} /> : null}
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
        <div className={styles.footer}>
          <div className={styles.footerActions}>
            <AkButtonGroup>
              {!this.props.onSave ? null :
              <span onClick={this.handleSave}>
                <AkButton appearance='primary'>Save</AkButton>
              </span>
              }
              {!this.props.onCancel ? null :
              <span onClick={this.handleCancel}>
                <AkButton appearance='subtle'>Cancel</AkButton>
              </span>
              }
            </AkButtonGroup>
          </div>
          <div>
            {!props.onInsertMention ? null :
            <ToolbarIconButton
              onClick={this.handleInsertMention}
              icon={<MentionIcon label='Mention' />}
            />
            }
            {!props.onInsertImage ? null :
            <ToolbarIconButton
              onClick={this.handleInsertImage}
              icon={<ImageIcon label='Image' />}
            />
            }
          </div>
        </div>
      </div>
    );
  }

  private handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  }

  private handleInsertImage = () => {
    const { onInsertImage } = this.props;
    if (onInsertImage) {
      onInsertImage();
    }
  }

  private handleInsertMention = () => {
    const { onInsertMention } = this.props;
    if (onInsertMention) {
      onInsertMention();
    }
  }

  private handleSave = () => {
    const { onSave } = this.props;
    if (onSave) {
      onSave();
    }
  }

  private handleKeyEvent(event: KeyboardEvent) {
    const isTabKey = event.keyCode === 9;
    event.stopPropagation();
  }
};
