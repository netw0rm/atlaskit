import { EmojiPicker } from '@atlaskit/emoji';
import { EditorMoreIcon } from '@atlaskit/icon';
import {
  akBorderRadius,
  akColorN30A
} from '@atlaskit/util-shared-styles';
import * as cx from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import * as ReactDOM from 'react-dom';
import { style } from 'typestyle';
import Popup from './internal/popup';
import Selector from './internal/selector';
import Trigger from './internal/trigger';

export interface Props {
  emojiService: any;
  onSelection: Function;
  miniMode?: boolean;
  boundariesElement?: string;
}

export interface State {
  isOpen: boolean;
  showFullPicker?: boolean;
}

const pickerStyle = style({
  $nest: {
    '&.miniMode': {
      display: 'inline-block',
      height: '20px',
      overflow: 'hidden'
    }
  }
});

const contentStyle = style({
  display: 'flex',
});

const moreButtonStyle = style({
  outline: 'none',
  backgroundColor: 'transparent',
  border: 0,
  borderRadius: akBorderRadius,
  cursor: 'pointer',
  margin: '4px 4px 4px 0',
  padding: '4px',
  width: '38px',
  $nest: {
    '&:hover': {
      backgroundColor: akColorN30A
    }
  }
});

export default class ReactionPicker extends PureComponent<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      showFullPicker: false
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  private handleClickOutside = (e) => {
    const { isOpen } = this.state;
    if (!isOpen) {
      return;
    }

    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || (e.target instanceof Node && !domNode.contains(e.target))) {
      this.close();
    }
  }

  private close() {
    this.setState({
      isOpen: false,
      showFullPicker: false
    });
  }

  private showFullPicker = (e) => {
    e.preventDefault();

    this.setState({
      isOpen: true,
      showFullPicker: true
    });
  }

  private renderSelector() {
    const { emojiService } = this.props;

    return (
      <div className={contentStyle}>
        <Selector
          emojiService={emojiService}
          onSelection={this.onEmojiSelected}
        />
        <button className={moreButtonStyle} onMouseDown={this.showFullPicker}>
          <EditorMoreIcon label="More" />
        </button>
      </div>
    );
  }

  private renderEmojiPicker() {
    const { emojiService } = this.props;

    return (
      <EmojiPicker
        emojiService={emojiService}
        onSelection={this.onEmojiSelected}
      />
    );
  }

  private renderContent() {
    const { showFullPicker } = this.state;
    return showFullPicker ? this.renderEmojiPicker() : this.renderSelector();
  }

  private onEmojiSelected = (emoji) => {
    const { onSelection } = this.props;

    onSelection(emoji.id);
    this.close();
  }

  private onTriggerClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      showFullPicker: false
    });
  }

  renderPopup() {
    const { isOpen } = this.state;
    if (!isOpen) {
      return null;
    }

    return (
      <Popup
        boundariesElement={this.props.boundariesElement || 'body'}
        target={this.refs['trigger']}
      >
        {this.renderContent()}
      </Popup>
    );
  }

  render() {
    const { isOpen } = this.state;
    const { miniMode } = this.props;
    const classNames = cx(pickerStyle, {
      'isOpen': isOpen,
      'miniMode': miniMode
    });

    return (
      <div className={classNames}>
        <Trigger
          onClick={this.onTriggerClick}
          miniMode={miniMode}
          ref="trigger"
        />
        {this.renderPopup()}
      </div>
    );
  }

}
