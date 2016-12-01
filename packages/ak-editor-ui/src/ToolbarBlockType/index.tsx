import React, { PureComponent } from 'react';
import AkButton from 'ak-button';
import { BlockType, BlockTypeState } from 'ak-editor-plugin-block-type';
import Panel from '../Panel';
import styles from './styles.global.less';

interface Props {
  pluginState: BlockTypeState;
}

interface State {
  active: boolean;
  availableBlockTypes: BlockType[];
  canChange: boolean;
  currentBlockType: BlockType;
}

export default class ToolbarBlockType extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const { pluginState } = props;

    this.state = {
      active: false,
      availableBlockTypes: pluginState.availableBlockTypes,
      canChange: false,
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
    const { active, currentBlockType, canChange, availableBlockTypes } = this.state;

    return (
      <span onClick={this.handleToggleDropdown} className={styles.container}>
        <AkButton
          disabled={!canChange}
          selected={active}
          appearance='subtle'
          spacing='compact'
        >
          <span className={styles.buttonContent}>{currentBlockType.title}</span>
        </AkButton>
        {!active ? null :
        <Panel align='left' spacing='none' onOutsideClick={this.handleToggleDropdown}>
          <ul className={styles.dropdown}>
            {availableBlockTypes.map(blockType => (
            <li key={blockType.name}>
              <a
                onClick={() => this.handleSelectBlockType(blockType)}
                className={`${styles.blockType} ${this.blockTypeItemClass(blockType)} ${currentBlockType === blockType ? styles.active : ''}`}
              ><span>{blockType.title}</span></a>
            </li>
            ))}
          </ul>
        </Panel>
        }
      </span>
    );
  }

  private handlePluginStateChange = (pluginState: BlockTypeState) => {
    this.setState({
      active: this.state.active,
      availableBlockTypes: pluginState.availableBlockTypes,
      canChange: pluginState.canChange,
      currentBlockType: pluginState.currentBlockType,
    });
  }

  private handleSelectBlockType = (blockType: BlockType) => {
    const { availableBlockTypes, canChange, currentBlockType } = this.state;
    this.props.pluginState.changeBlockType(blockType.name);
    this.setState({
      active: false,
      availableBlockTypes,
      canChange,
      currentBlockType
    });
  }

  private handleToggleDropdown = () => {
    if (this.props.pluginState.canChange) {
      const { availableBlockTypes, canChange, currentBlockType } = this.state;
      this.setState({
        active: !this.state.active,
        availableBlockTypes,
        canChange,
        currentBlockType
      });
    }
  }

  private blockTypeItemClass(blockType: BlockType): string | undefined {
    switch (blockType.name) {
      case 'normal': return styles.blockTypeNormal;
      case 'heading1': return styles.blockTypeHeading1;
      case 'heading2': return styles.blockTypeHeading2;
      case 'heading3': return styles.blockTypeHeading3;
      case 'code': return styles.blockTypeCode;
      case 'quote': return styles.blockTypeQuote;
    }
  }
}
