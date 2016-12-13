import React, { PureComponent } from 'react';
import AkInlineDialog from 'ak-inline-dialog';
import AkAvatar from 'ak-avatar';
import { MentionList } from 'ak-mention';
import reactify from 'akutil-react';
import AkInlineEdit from '../src';

// TODO: Use native React version once available
const InlineDialog = reactify(AkInlineDialog);

const keyCodes = {
  up: 38,
  down: 40,
  enter: 13,
};

const avatarStyle = {
  paddingRight: 8,
  display: 'flex',
};

const mentionWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
};

const mentionListWrapperStyle = {
  marginLeft: -8,
  marginTop: 4,
};

const inputStyle = {
  border: 0,
  background: 'transparent',
  color: 'inherit',
  fontSize: 14,
  outline: 0,
  width: '100%',
};

/* eslint-disable react/prop-types */
export default class extends PureComponent {
  state = {
    query: null,
    selectedMention: null,
    confirmedMention: null,
    isFocused: false,
  }

  onInputChange = (e) => {
    this.setState({
      query: e.target.value,
      selectedMention: null,
    });
  }

  onConfirm = () => {
    this.setState(state => ({
      query: null,
      confirmedMention: state.selectedMention,
    }));
  }

  onCancel = () => {
    this.setState(state => ({
      query: null,
      selectedMention: state.confirmedMention,
    }));
  }

  onSelection = (mention) => {
    this.setState({
      query: null,
      selectedMention: mention,
    });
  }

  onKeyDown = ({ keyCode }) => {
    if (this.isMentionsListVisible()) {
      this.handleKeyDownForMentionList(keyCode);
    } else if (keyCode === keyCodes.down) {
      this.setState({
        query: this.getNameForEditView(),
      });
    }
  }

  getNameForEditView = () => {
    if (this.state.selectedMention) {
      return this.state.selectedMention.name;
    }
    return this.state.query || '';
  }

  getNameForReadView = () => (
    this.state.confirmedMention ? this.state.confirmedMention.name : 'None'
  )

  handleKeyDownForMentionList = (keyCode) => {
    switch (keyCode) {
      case keyCodes.up:
        this.mentionList.selectPrevious();
        break;
      case keyCodes.down:
        this.mentionList.selectNext();
        break;
      case keyCodes.enter:
        this.mentionList.chooseCurrentSelection();
        break;
      default:
    }
  }

  focus = () =>
    this.setState({ isFocused: true })

  blur = () =>
    this.setState({ isFocused: false })

  isMentionsListVisible = () =>
    this.state.isFocused && this.state.query != null

  renderReadView = () => (
    <div style={mentionWrapperStyle}>
      {this.state.confirmedMention && this.renderAvatar(this.state.confirmedMention)}
      <span>{this.getNameForReadView()}</span>
    </div>
  )

  renderEditView = () => (
    <div style={mentionWrapperStyle}>
      {this.state.selectedMention && this.renderAvatar(this.state.selectedMention)}
      <input
        value={this.getNameForEditView()}
        autoFocus
        style={inputStyle}
        onChange={this.onInputChange}
        onKeyDown={this.onKeyDown}
        onFocus={this.focus}
        onBlur={this.blur}
        ref={(textInput) => { this.textInput = textInput; }}
      />
    </div>
  )

  renderAvatar = mention => (
    <div style={avatarStyle}>
      <AkAvatar size="small" src={mention.avatarUrl} />
    </div>
  )

  renderMentionsList = () => (
    <InlineDialog
      open
      target={this.field}
    >
      <MentionList
        mentions={this.props.mentions}
        onSelection={this.onSelection}
        ref={(mentionList) => { this.mentionList = mentionList; }}
      />
    </InlineDialog>
  )

  render = () => (
    <div>
      <div ref={(field) => { this.field = field; }}>
        <AkInlineEdit
          label={this.props.label}
          editView={this.renderEditView()}
          readView={this.renderReadView()}
          areActionButtonsHidden={this.isMentionsListVisible()}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          {...this.props}
        />
      </div>
      <div style={mentionListWrapperStyle}>
        {this.isMentionsListVisible() && this.renderMentionsList()}
      </div>
    </div>
  )
}
