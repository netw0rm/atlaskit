import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { HiddenInput, Label, Wrapper } from '../styled/Radio';
import RadioIcon from '../styled/RadioIcon';
import Indicator from '../styled/RadioIconCheckedIndicator';

/* eslint-disable jsx-a11y/label-has-for */
export default class Radio extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isDisabled: PropTypes.bool,
    isRequired: PropTypes.bool,
    isSelected: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }

  static defaultProps = {
    isDisabled: false,
    isSelected: false,
  }

  state = {
    isHover: false,
    isFocus: false,
  }

  onMouseEnter = () => this.setState({ isHover: true })

  onMouseLeave = () => this.setState({ isHover: false })

  onFocus = () => this.setState({ isFocus: true })

  onBlur = () => this.setState({ isFocus: false })

  render() {
    const { children, isDisabled, isRequired, isSelected, name, onChange, value } = this.props;
    const { isFocus, isHover } = this.state;

    return (
      <Label>
        <Wrapper>
          <HiddenInput
            checked={isSelected}
            disabled={isDisabled}
            name={name}
            onChange={onChange}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            required={isRequired}
            type="radio"
            value={value}
          />
          <RadioIcon
            isDisabled={isDisabled}
            isFocus={isFocus}
            isHover={isHover}
            isSelected={isSelected}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            {isSelected && (
              <Indicator isFocus={isFocus} />
            )}
          </RadioIcon>
        </Wrapper>
        <span>
          {children}
        </span>
      </Label>
    );
  }
}
