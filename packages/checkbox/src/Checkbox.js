// @flow
import React, { PureComponent } from 'react';
import CheckboxStateless from './CheckboxStateless';

type Props = {|
  /** Sets whether the checkbox begins checked. */
  initiallyChecked?: boolean,
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
  new state of the checkbox. */
  onChange?: ({ event: Event, isChecked: boolean }) => mixed,
  /** The value to be used in the checkbox input. This is the value that will
  be returned on form submission. */
  value: number|string,
|}

export default class Checkbox extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp

  static defaulProps = {
    initiallyChecked: false,
    onChange: () => {},
  }

  state = { isChecked: !!this.props.initiallyChecked }

  onChange = (event: Event&{ currentTarget: HTMLInputElement }) => {
    const { isDisabled, onChange } = this.props;
    if (isDisabled) return null;
    const isChecked = event.currentTarget.checked;
    return this.setState({ isChecked }, () => {
      if (onChange) onChange({ event, isChecked });
    });
  }

  render() {
    const { label, value, isFullWidth, isDisabled, name } = this.props;
    const { isChecked } = this.state;
    return (
      <CheckboxStateless
        isChecked={isChecked}
        isDisabled={isDisabled}
        isFullWidth={isFullWidth}
        label={label}
        onChange={this.onChange}
        value={value}
        name={name}
      />
    );
  }
}
