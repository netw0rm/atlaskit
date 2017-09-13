// @flow
import React, { PureComponent } from 'react';
import CheckboxIcon from '@atlaskit/icon/glyph/checkbox';
import { colors, themed } from '@atlaskit/theme';
import { HiddenCheckbox, IconWrapper, Label, Wrapper } from './styled/Checkbox';

type Props = {|
  /** Sets whether the checkbox is checked or unchecked. */
  isChecked: boolean,
  /** Sets whether the checkbox is disabled. */
  isDisabled?: boolean,
  /** Sets whether the checkbox should take up the full width of the parent. */
  isFullWidth?: boolean,
  /** The label to be displayed to the right of the checkbox. The label is part
  of the clickable element to select the checkbox. */
  label: string,
  /** The name of the submitted field in a checkbox. */
  name: string,
  /** Function that is called whenever the state of the checkbox changes. It will
  be called with an object containing the react synthetic event as well as the
  state the checkbox will naturally be set to. The stateless version does not
  automatically update whether the checkbox is checked. */
  onChange: (event: Event & { currentTarget: HTMLInputElement }) => mixed,
  /** The value to be used in the checkbox input. This is the value that will
  be returned on form submission. */
  value: number|string,
|}

type State = {|
  isActive: boolean,
  isFocused: boolean,
  isHovered: boolean,
|};

export default class CheckboxStateless extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp
  state: State = {
    isActive: false,
    isFocused: false,
    isHovered: false,
  }
  checkbox: ?HTMLButtonElement
  actionKeys = [' ']

  // expose blur/focus to consumers via ref
  blur = (e: FocusEvent) => {
    if (this.checkbox && this.checkbox.blur) this.checkbox.blur(e);
  }
  focus = (e: FocusEvent) => {
    if (this.checkbox && this.checkbox.focus) this.checkbox.focus(e);
  }

  onBlur = () => this.setState({ isActive: false, isFocused: false })
  onFocus = () => this.setState({ isFocused: true })
  onMouseLeave = () => this.setState({ isActive: false, isHovered: false })
  onMouseEnter = () => this.setState({ isHovered: true })
  onMouseUp = () => this.setState({ isActive: false })
  onMouseDown = () => this.setState({ isActive: true })

  onKeyDown = (event: KeyboardEvent) => {
    if (this.actionKeys.includes(event.key)) {
      this.setState({ isActive: true });
    }
  }
  onKeyUp = (event: KeyboardEvent) => {
    if (this.actionKeys.includes(event.key)) {
      this.setState({ isActive: false });
    }
  }

  getSecondaryColor = (): string => {
    const { isChecked, isDisabled, ...rest } = this.props;
    const { isHovered, isActive } = this.state;

    let color = themed({ light: colors.N0, dark: colors.N0 });

    if (isDisabled) {
      color = themed({ light: colors.N30, dark: colors.N30 });
    } else if (isActive) {
      color = themed({ light: colors.B50, dark: colors.B50 });
    } else if (isHovered && !isChecked) {
      color = themed({ light: colors.N50, dark: colors.N50 });
    } else if (!isChecked) {
      color = themed({ light: colors.N30, dark: colors.N30 });
    }

    return color(rest);
  }

  getPrimaryColor = (): string => {
    const { isChecked, isDisabled, ...rest } = this.props;
    const { isHovered, isActive } = this.state;
    let color = themed({ light: colors.N30, dark: colors.N30 });
    if (isDisabled) {
      color = isChecked
      ? themed({ light: colors.N70A, dark: colors.N70A })
      : themed({ light: colors.N30, dark: colors.N30 });
    } else if (isActive) {
      color = themed({ light: colors.B400, dark: colors.B400 });
    } else if (isHovered) {
      color = isChecked
        ? themed({ light: colors.B300, dark: colors.B300 })
        : themed({ light: colors.N50, dark: colors.N50 });
    } else if (isChecked) {
      color = colors.blue;
    }

    return color(rest);
  }

  render() {
    const {
      isChecked,
      onChange,
      label,
      value,
      isFullWidth,
      isDisabled,
      name,
    } = this.props;
    const { isFocused } = this.state;
    return (
      <Label
        isDisabled={isDisabled}
        isFullWidth={isFullWidth}
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseUp={this.onMouseUp}
      >
        <HiddenCheckbox
          disabled={isDisabled}
          checked={isChecked}
          onChange={onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onKeyUp={this.onKeyUp}
          onKeyDown={this.onKeyDown}
          type="checkbox"
          value={value}
          name={name}
          innerRef={r => (this.checkbox = r)}
        />
        <Wrapper>
          <IconWrapper
            isChecked={isChecked}
            isDisabled={isDisabled}
            isFocused={isFocused}
          >
            <CheckboxIcon
              primaryColor={this.getPrimaryColor()}
              secondaryColor={this.getSecondaryColor()}
              label="checkboxIcon"
            />
          </IconWrapper>
          <span>{label}</span>
        </Wrapper>
      </Label>
    );
  }
}
