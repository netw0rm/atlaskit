import React, { PureComponent } from 'react';
import AkButton from 'ak-button';
import { BlockType, BlockTypeState } from 'ak-editor-plugin-block-type';
import cx from 'classnames';
import '../types';
import DismissBlanket from '../DismissBlanket/index.react';
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
        <AkButton disabled={!canChange} selected={active} appearance='subtle'>
          <span className={styles.buttonContent}>{currentBlockType.title}</span>
        </AkButton>
        {!active ? null :
        <DismissBlanket onDismiss={this.handleToggleDropdown}>
          <ul className={styles.dropdown}>
            {availableBlockTypes.map(blockType => (
            <li key={blockType.name}>
              <a
                onClick={() => this.handleSelectBlockType(blockType)}
                className={cx(styles.selectOptions, { [styles.active]: currentBlockType === blockType })}
              >{blockType.title}</a>
            </li>
            ))}
          </ul>
        </DismissBlanket>
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
}
