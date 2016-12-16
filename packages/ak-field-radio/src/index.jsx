import React, { PropTypes, PureComponent } from 'react';

import AkRadioGroup from './RadioGroup';
import AkRadio from './Radio';

export {
  AkRadioGroup,
  AkRadio,
};

export default class RadioGroup extends PureComponent {
  static propTypes = {
    defaultValue: PropTypes.string,
  }

  static defaultProps = {
    defaultValue: null,
  }

  constructor(props) {
    super();
    this.state = {
      value: props && props.defaultValue,
    };
  }

  changeHandler = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <AkRadioGroup
        {...this.props}
        onRadioChange={this.changeHandler}
        value={this.state.value}
      />
    );
  }
}
