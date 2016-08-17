const { React, ReactDOM } = window;
import AkButtonTemplate, { APPEARANCE } from '../src/index';
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
      disable: false,
      appearance: APPEARANCE.STANDARD,
    };
  }

  disable() {
    this.setState({ disable: !this.state.disable });
  }
  select() {
    this.setState({
      appearance: this.state.appearance === APPEARANCE.STANDARD ?
        APPEARANCE.SELECTED : APPEARANCE.STANDARD,
    });
  }

  render() {
    return (
      <div>
        <label>
          Disabled
          <input
            type="checkbox"
            id="disable-checkbox"
            onChange={this.disable.bind(this)}  // eslint-disable-line react/jsx-no-bind
            defaultChecked={this.state.disable}
          />
        </label>
        <label>
          Selected
          <input
            type="checkbox"
            id="selected-checkbox"
            onChange={this.select.bind(this)}  // eslint-disable-line react/jsx-no-bind
            defaultChecked={this.state.appearance === APPEARANCE.SELECTED}
          />
        </label>
        <AkButton
          disabled={this.state.disable}
          appearance={this.state.appearance}
          onclick={action('clicking the WebComponent')}
        >
          Button
        </AkButton>
      </div>
    );
  }
}
