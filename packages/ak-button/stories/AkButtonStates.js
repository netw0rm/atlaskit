const { React, ReactDOM } = window;
import AkButtonTemplate from '../src/index';
import reactify from 'akutil-react';
import { action } from '@kadira/storybook';
const AkButton = reactify(AkButtonTemplate, {
  React,
  ReactDOM,
});

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      selected: false,
    };
  }

  updateState(value) {
    return () => {
      const data = {};
      data[value] = !this.state[value];
      this.setState(data);
    };
  }

  createCheckboxState(state) {
    return (
      <label>
        {state}
        <input
          type="checkbox"
          id="selected-checkbox"
          onChange={this.updateState(state)}
          defaultChecked={this.state[state]}
        />
      </label>
    );
  }

  render() {
    return (
      <div>
        {this.createCheckboxState('disabled')}
        {this.createCheckboxState('selected')}
        <AkButton
          disabled={this.state.disabled}
          selected={this.state.selected}
          onclick={action('clicking the WebComponent')}
        >
          Button
        </AkButton>
      </div>
    );
  }
}
