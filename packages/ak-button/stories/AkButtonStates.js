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
      disabled: false,
      selected: false,
      compact: false,
      appearance: APPEARANCE.STANDARD,
      label: 'Button',
    };
  }

  createCheckboxBooleanAttribute(attribute) {
    return (
      <label>
        {attribute}
        <input
          type="checkbox"
          onChange={() => this.setState({ [attribute]: !this.state[attribute] })}
          checked={this.state[attribute]}
        />
      </label>
    );
  }

  createRadioAppearanceAttribute(attribute) {
    return (
      <label>
        {attribute}
        <input
          type="radio"
          onChange={() => this.setState({ appearance: attribute })}
          checked={this.state.appearance === attribute}
        />
      </label>
    );
  }

  render() {
    return (
      <div>
        <form>
          <label><strong>Boolean Attributes</strong></label>
          <br />
          {this.createCheckboxBooleanAttribute('disabled')}
          {this.createCheckboxBooleanAttribute('selected')}
          {this.createCheckboxBooleanAttribute('compact')}
        </form>
        <br />
        <form>
          <label><strong>Appearances</strong></label>
          <br />
          {this.createRadioAppearanceAttribute(APPEARANCE.STANDARD)}
          {this.createRadioAppearanceAttribute(APPEARANCE.PRIMARY)}
          {this.createRadioAppearanceAttribute(APPEARANCE.SUBTLE)}
        </form>
        <br />
        <form>
          <label><strong>Button Text</strong></label>
          <br />
          <input
            type="text"
            value={this.state.label}
            onChange={event => this.setState({ label: event.target.value })}
          />
        </form>
        <br />
        <AkButton
          disabled={this.state.disabled}
          selected={this.state.selected}
          compact={this.state.compact}
          appearance={this.state.appearance}
          onclick={action('clicking the WebComponent')}
        >
          {this.state.label}
        </AkButton>
      </div>
    );
  }
}
