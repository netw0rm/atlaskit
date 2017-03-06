import AkButton from '@atlaskit/button';
import DropdownList from '@atlaskit/droplist';
import Group from '@atlaskit/droplist-group';
import Item from '@atlaskit/droplist-item';
import * as React from 'react';
import { PureComponent } from 'react';

import { analyticsService as analytics } from '../../analytics';
import { findKeymapByDescription, tooltip } from '../../keymaps';
import { BlockType, BlockTypeState, GroupedBlockTypes } from '../../plugins/block-type';
import * as styles from './styles';

export interface Props {
  pluginState: BlockTypeState;
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

  render() {
    const { active, currentBlockType, availableBlockTypes } = this.state;

    return (
      <DropdownList
        isOpen={this.state.active}
        onOpenChange={(attrs: any) => {
          const { availableBlockTypes, currentBlockType } = this.state;

          if (attrs.isOpen) {
            this.props.pluginState.blur();
          } else {
            this.props.pluginState.focus();
          }

          this.setState({
            active: attrs.isOpen,
            availableBlockTypes,
            currentBlockType
          });
        }}
        appearance="tall"
        position="top left"
        trigger={
          <AkButton
            isSelected={active}
            appearance="subtle"
            spacing="compact"
          >
            <div className={styles.buttonContent}>{currentBlockType.title}</div>
          </AkButton>
        }
      >
      {availableBlockTypes.map((blockTypeGroup, groupNo) => (
        <Group key={`blockTypeGroup${groupNo}`}>
        {blockTypeGroup.map(blockType => (
          <Item
            key={blockType.name}
            isActive={currentBlockType === blockType}
            onActivate={() => { this.handleSelectBlockType(blockType); }}
          >
            <span title={tooltip(findKeymapByDescription(blockType.title))}>
              {blockType.title}
            </span>
          </Item>
        ))}
        </Group>
      ))}
      </DropdownList>
    );
  }

  private handlePluginStateChange = (pluginState: BlockTypeState) => {
    this.setState({
      active: this.state.active,
      availableBlockTypes: pluginState.availableBlockTypes,
      currentBlockType: pluginState.currentBlockType,
    });
  }

  private handleSelectBlockType = (blockType: BlockType) => {
    this.props.pluginState.focus();

    const { availableBlockTypes, currentBlockType } = this.state;
    this.props.pluginState.changeBlockType(blockType.name);
    this.setState({
      active: false,
      availableBlockTypes,
      currentBlockType
    });

    analytics.trackEvent(`atlassian.editor.format.${blockType.name}.button`);
  }
}
