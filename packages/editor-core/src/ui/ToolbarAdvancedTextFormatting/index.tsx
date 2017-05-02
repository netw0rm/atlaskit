import * as React from 'react';
import { PureComponent } from 'react';
import Tooltip from '@atlaskit/tooltip';
import DropdownList from '@atlaskit/droplist';
import Group from '@atlaskit/droplist-group';
import Item from '@atlaskit/droplist-item';
import AdvancedIcon from '@atlaskit/icon/glyph/editor/advanced';
import ExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import { analyticsDecorator as analytics } from '../../analytics';
import { TextFormattingState } from '../../plugins/text-formatting';
import { ClearFormattingState } from '../../plugins/clear-formatting';
import ToolbarButton from '../ToolbarButton';
import { toggleCode, toggleStrikethrough, clearFormatting, tooltip } from '../../keymaps';
import * as styles from './styles';
import { EditorView } from '../../prosemirror';

export interface Props {
  editorView: EditorView;
  softBlurEditor: () => void;
  focusEditor: () => void;
  pluginStateTextFormatting?: TextFormattingState | undefined;
  pluginStateClearFormatting?: ClearFormattingState | undefined;
}

export interface State {
  isOpen?: boolean;
  codeActive?: boolean;
  codeDisabled?: boolean;
  codeHidden?: boolean;
  strikeActive?: boolean;
  strikeDisabled?: boolean;
  strikeHidden?: boolean;
  subscriptActive?: boolean;
  subscriptDisabled?: boolean;
  subscriptHidden?: boolean;
  superscriptActive?: boolean;
  superscriptDisabled?: boolean;
  superscriptHidden?: boolean;
  clearFormattingDisabled?: boolean;
}

export default class ToolbarAdvancedTextFormatting extends PureComponent<Props, State> {
  state: State = {
    isOpen: false,
  };

  componentDidMount() {
    const { pluginStateTextFormatting, pluginStateClearFormatting } = this.props;
    if (pluginStateTextFormatting) {
      pluginStateTextFormatting.subscribe(this.handlePluginStateTextFormattingChange);
    }
    if (pluginStateClearFormatting) {
      pluginStateClearFormatting.subscribe(this.handlePluginStateClearFormattingChange);
    }
  }

  componentWillUmount() {
    const { pluginStateTextFormatting, pluginStateClearFormatting } = this.props;
    if (pluginStateTextFormatting) {
      pluginStateTextFormatting.unsubscribe(this.handlePluginStateTextFormattingChange);
    }
    if (pluginStateClearFormatting) {
      pluginStateClearFormatting.unsubscribe(this.handlePluginStateClearFormattingChange);
    }
  }

  render() {
    const {
      isOpen,
      codeActive,
      codeDisabled,
      codeHidden,
      strikeActive,
      strikeDisabled,
      strikeHidden,
      subscriptActive,
      subscriptDisabled,
      subscriptHidden,
      superscriptActive,
      superscriptDisabled,
      superscriptHidden,
      clearFormattingDisabled,
    } = this.state;
    const {
      pluginStateTextFormatting,
      pluginStateClearFormatting,
    } = this.props;
    const hasMarksInSchema = !codeHidden || !strikeHidden || !subscriptHidden || !superscriptHidden;
    if ((pluginStateTextFormatting && hasMarksInSchema) || pluginStateClearFormatting) {
      return (
        <DropdownList
          isOpen={isOpen}
          onOpenChange={this.toggleOpen}
          appearance="tall"
          position="top left"
          trigger={
            <ToolbarButton
              selected={isOpen || codeActive || strikeActive}
              disabled={codeDisabled && strikeDisabled && clearFormattingDisabled}
              iconBefore={
                <div className={styles.triggerWrapper}>
                  <AdvancedIcon label="text-formatting" />
                  <div className={styles.expandIcon}>
                    <ExpandIcon label="expand-dropdown-menu" />
                  </div>
                </div>}
            />
          }
        >
          {(pluginStateTextFormatting && hasMarksInSchema) && <Group>
            {!codeHidden &&
              <Tooltip position="right" description={tooltip(toggleCode)}>
                <Item
                  isActive={codeActive}
                  isDisabled={codeDisabled}
                  onActivate={this.handleCodeClick}
                >
                  <span>Code</span>
                </Item>
              </Tooltip>}
            {!strikeHidden &&
              <Tooltip position="right" description={tooltip(toggleStrikethrough)}>
                <Item
                  isActive={strikeActive}
                  isDisabled={strikeDisabled}
                  onActivate={this.handleStrikeClick}
                >
                  <span>Strikethrough</span>
                </Item>
              </Tooltip>}
            {!subscriptHidden &&
              <Tooltip position="right" description="Toggle subscript">
                <Item
                  isActive={subscriptActive}
                  isDisabled={subscriptDisabled}
                  onActivate={this.handleSubscriptClick}
                >
                  <span>Subscript</span>
                </Item>
              </Tooltip>
            }
            {!superscriptHidden &&
              <Tooltip position="right" description="Toggle superscript">
                <Item
                  isActive={superscriptActive}
                  isDisabled={superscriptDisabled}
                  onActivate={this.handleSuperscriptClick}
                >
                  <span>Superscript</span>
                </Item>
              </Tooltip>
            }
          </Group>}
          {pluginStateClearFormatting &&
            <Group>
              <Tooltip position="right" description={tooltip(clearFormatting)}>
                <Item
                  isDisabled={clearFormattingDisabled}
                  onActivate={this.handleClearFormattingClick}
                >
                  <span>Clear formatting</span>
                </Item>
              </Tooltip>
            </Group>}
        </DropdownList>
      );
    } else {
      return null;
    }
  }

  private toggleOpen = () => {
    const { codeDisabled, strikeDisabled, clearFormattingDisabled, isOpen } = this.state;
    if (!(codeDisabled && strikeDisabled && clearFormattingDisabled)) {

      if (!isOpen) {
        this.props.softBlurEditor();
      } else {
        this.props.focusEditor();
      }

      this.setState({
        isOpen: !isOpen,
      });
    }
  }

  private handlePluginStateTextFormattingChange = (pluginState: TextFormattingState) => {
    this.setState({
      codeActive: pluginState.codeActive,
      codeDisabled: pluginState.codeDisabled,
      codeHidden: pluginState.codeHidden,

      strikeActive: pluginState.strikeActive,
      strikeDisabled: pluginState.strikeDisabled,
      strikeHidden: pluginState.strikeHidden,

      subscriptActive: pluginState.subscriptActive,
      subscriptDisabled: pluginState.subscriptDisabled,
      subscriptHidden: pluginState.subscriptHidden,

      superscriptActive: pluginState.superscriptActive,
      superscriptDisabled: pluginState.superscriptDisabled,
      superscriptHidden: pluginState.superscriptHidden,
    });
  }

  private handlePluginStateClearFormattingChange = (pluginState: ClearFormattingState) => {
    this.setState({
      clearFormattingDisabled: !pluginState.formattingIsPresent,
    });
  }

  @analytics('atlassian.editor.format.strikethrough.button')
  private handleStrikeClick = () => {
    if (!this.state.strikeDisabled) {
      const { pluginStateTextFormatting } = this.props;
      if (pluginStateTextFormatting) {
        pluginStateTextFormatting.toggleStrike(this.props.editorView);
      }
      this.toggleOpen();
    }
  }

  @analytics('atlassian.editor.format.subscript.button')
  private handleSubscriptClick = () => {
    if (!this.state.subscriptDisabled) {
      const { pluginStateTextFormatting } = this.props;
      if (pluginStateTextFormatting) {
        pluginStateTextFormatting.toggleSubscript(this.props.editorView);
      }
      this.toggleOpen();
    }
  }

  @analytics('atlassian.editor.format.superscript.button')
  private handleSuperscriptClick = () => {
    if (!this.state.subscriptDisabled) {
      const { pluginStateTextFormatting } = this.props;
      if (pluginStateTextFormatting) {
        pluginStateTextFormatting.toggleSuperscript(this.props.editorView);
      }
      this.toggleOpen();
    }
  }

  @analytics('atlassian.editor.format.code.button')
  private handleCodeClick = () => {
    if (!this.state.codeDisabled) {
      const { pluginStateTextFormatting } = this.props;
      if (pluginStateTextFormatting) {
        pluginStateTextFormatting.toggleCode(this.props.editorView);
      }
      this.toggleOpen();
    }
  }

  @analytics('atlassian.editor.format.clear.button')
  private handleClearFormattingClick = () => {
    if (!this.state.clearFormattingDisabled) {
      const { pluginStateClearFormatting } = this.props;
      if (pluginStateClearFormatting) {
        pluginStateClearFormatting.clearFormatting(this.props.editorView);
      }
      this.toggleOpen();
    }
  }
};
