import React, { PureComponent, PropTypes } from 'react';
import keyCode from 'keycode';
import { style } from 'glamor';
import { akFontSizeDefault } from '@atlaskit/util-shared-styles';

const css = {
  common: style({
    color: 'inherit',
    fontSize: akFontSizeDefault,
    letterSpacing: 'normal',
    appearance: 'none',
  }),
  readView: style({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }),
  editView: style({
    lineHeight: 'inherit',
    background: 'transparent',
    border: 0,
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    cursor: 'inherit',
    outline: 'none',
    width: '100%',
    ':invalid': {
      boxShadow: 'none',
    },
  }),
};

export default class SingleLineTextInput extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    style: PropTypes.shape({}),
    isInitiallySelected: PropTypes.bool,
    isEditing: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func,
    onKeyDown: PropTypes.func,
  }

  static defaultProps = {
    style: {},
    isInitiallySelected: false,
    onConfirm: () => {},
    onKeyDown: () => {},
  }

  componentDidMount() {
    this.selectInputIfNecessary();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isEditing) {
      this.selectInputIfNecessary();
    }
  }

  onKeyDown = (event) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
    if (event.keyCode === keyCode('enter')) {
      this.props.onConfirm(event);
    }
  }

  getInputProps = () => {
    const inputProps = {
      ...this.props,
      type: 'text',
      onKeyDown: this.onKeyDown,
    };
    delete inputProps.style;
    delete inputProps.isEditing;
    delete inputProps.isInitiallySelected;
    delete inputProps.onConfirm;
    return inputProps;
  }

  selectInputIfNecessary() {
    if (this.props.isEditing && this.props.isInitiallySelected) {
      this.inputRef.select();
    }
  }

  renderEditView() {
    return (
      <input
        {...style(css.common, css.editView, this.props.style)}
        {...this.getInputProps()}
        ref={(ref) => { this.inputRef = ref; }}
      />
    );
  }

  renderReadView() {
    return (
      <div {...style(css.common, css.readView, this.props.style)}>
        {this.props.value}
      </div>
    );
  }

  render() {
    return this.props.isEditing ? this.renderEditView() : this.renderReadView();
  }
}
