import DropdownMenu from '@atlaskit/dropdown-menu';
import AkButton from '@atlaskit/button';
import * as React from 'react';
import { PureComponent } from 'react';

import { analyticsService as analytics } from '../../analytics';
import { BlockTypeState, GroupedBlockTypes } from '../../plugins/block-type';
import { BlockType } from '../../plugins/block-type/types';
import { findKeymapByDescription, tooltip } from '../../keymaps';
import { EditorView } from '../../prosemirror';

import { ButtonContent } from './styles';

export interface Props {
  isDisabled?: boolean;
  editorView: EditorView;
  pluginState: BlockTypeState;
  softBlurEditor: () => void;
  focusEditor: () => void;
}

export interface State {
  active: boolean;
  availableBlockTypes: GroupedBlockTypes;
  currentBlockType: BlockType;
}

export default class ToolbarBlockType extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const { pluginState } = props;

    this.state = {
      active: false,
      availableBlockTypes: pluginState.availableBlockTypes,
      currentBlockType: pluginState.currentBlockType,
    };
  }

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  private onOpenChange = (attrs: any) => {
    // Hack for IE needed to prevent caret blinking above the opened dropdown.
    if (attrs.isOpen) {
      this.props.softBlurEditor();
    } else {
      this.props.focusEditor();
    }

    this.setState({
      active: attrs.isOpen,
    });
  }

  render() {
    const { active, currentBlockType } = this.state;
    const items = this.createItems();
    if (this.props.isDisabled) {
      return (
        <AkButton
          isSelected={active}
          appearance="subtle"
          isDisabled={true}
          spacing="compact"
        >
          <ButtonContent>{currentBlockType.title}</ButtonContent>
        </AkButton>
      );
    }
    return (
      <DropdownMenu
        items={items}
        appearance="tall"
        position="top left"
        onOpenChange={this.onOpenChange}
        onItemActivated={this.handleSelectBlockType}
      >
        <AkButton
          isSelected={active}
          appearance="subtle"
          spacing="compact"
        >
          <ButtonContent>{currentBlockType.title}</ButtonContent>
        </AkButton>
      </DropdownMenu>
    );
  }

  private createItems = () => {
    const { currentBlockType, availableBlockTypes } = this.state;
    let items: any[] = [];
    availableBlockTypes.forEach((blockTypeGroup, groupNo) => {
      blockTypeGroup.forEach((blockType, blockTypeNo) => {
        items.push({
          content: blockType.title,
          value: blockType,
          isActive: (currentBlockType === blockType),
          tooltipDescription: tooltip(findKeymapByDescription(blockType.title)),
          tooltipPosition: 'right',
        });
      });
    });
    return [{
      items,
    }];
  }

  private handlePluginStateChange = (pluginState: BlockTypeState) => {
    this.setState({
      active: this.state.active,
      availableBlockTypes: pluginState.availableBlockTypes,
      currentBlockType: pluginState.currentBlockType,
    });
  }

  private handleSelectBlockType = ({ item }) => {
    this.props.focusEditor();
    const blockType = item.value;
    const { availableBlockTypes } = this.state;
    this.props.pluginState.toggleBlockType(blockType.name, this.props.editorView);
    this.setState({
      active: false,
      availableBlockTypes,
      currentBlockType: blockType
    });

    analytics.trackEvent(`atlassian.editor.format.${blockType.name}.button`);
  }
}
