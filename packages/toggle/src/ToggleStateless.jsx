import uid from 'uid';
import React, { PureComponent, PropTypes } from 'react';
import CloseIcon from 'ak-icon/glyph/cancel';
import ConfirmIcon from 'ak-icon/glyph/confirm';
import { Handle, IconWrapper, Inner, Input, Label, Slide } from './styled';

export default class ToggleStateless extends PureComponent {
  static propTypes = {
    isChecked: PropTypes.bool,
    isDisabled: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    size: PropTypes.oneOf(['regular', 'large']),
    value: PropTypes.string,
  }

  static defaultProps = {
    isChecked: false,
    isDisabled: false,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    size: 'regular',
  };

  state = {
    isChecked: this.props.isChecked,
    isFocused: false,
  }

  componentDidUpdate() {
    // TODO: This is a hack. find a way to make it work with preventDefault onMouseDown event
    if (this.mouseWasDown) {
      this.input.blur();
      this.mouseWasDown = false;
    }
  }

  handleMouseDown = () => (
    this.mouseWasDown = true
  )
  handleBlur = (e) => {
    this.setState({ isFocused: false });
    this.props.onBlur(e);
  }
  handleChange = (e) => {
    this.setState({ isChecked: e.target.checked });
    this.props.onChange(e);
  }
  handleFocus = (e) => {
    this.setState({ isFocused: true });
    this.props.onFocus(e);
  }

  render() {
    const { isDisabled, label, name, size, value } = this.props;
    const { isChecked, isFocused } = this.state;
    const styledProps = { isChecked, isDisabled, isFocused, size };
    const Icon = isChecked ? ConfirmIcon : CloseIcon;
    const id = uid();

    return (
      <Label size={size} isDisabled={isDisabled} htmlFor={id} onMouseDown={this.handleMouseDown}>
        <Input
          checked={isChecked}
          disabled={isDisabled}
          id={id}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          innerRef={el => (this.input = el)}
          type="checkbox"
          value={value}
        />
        <Slide {...styledProps}>
          <Inner {...styledProps}>
            <Handle
              isChecked={isChecked}
              isDisabled={isDisabled}
              size={size}
            />
            <IconWrapper isChecked={isChecked} size={size}>
              <Icon label={label || (isChecked ? 'Uncheck' : 'Check')} />
            </IconWrapper>
          </Inner>
        </Slide>
      </Label>
    );
  }
}
