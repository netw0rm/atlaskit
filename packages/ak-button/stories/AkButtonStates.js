import React from 'react';
import reactify from 'akutil-react';
import { action } from '@kadira/storybook';
import uid from 'uid';

import AkButtonTemplate, { APPEARANCE } from '../src';


const AkButton = reactify(AkButtonTemplate);

class AkButtonStates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      selected: false,
      compact: false,
      appearance: APPEARANCE.STANDARD,
      before: false,
      after: false,
    };
  }

  createCheckboxBooleanAttribute(attribute) {
    const id = `label-${uid()}`;
    return (
      <label htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          onChange={() => this.setState({ [attribute]: !this.state[attribute] })}
          checked={this.state[attribute]}
        />
        {attribute}
      </label>
    );
  }

  createRadioAppearanceAttribute(attribute) {
    const id = `label-${uid()}`;
    return (
      <label htmlFor={id}>
        <input
          id={id}
          type="radio"
          onChange={() => this.setState({ appearance: attribute })}
          checked={this.state.appearance === attribute}
        />
        {attribute}
      </label>
    );
  }

  createRadioIconOption(Icon, side) {
    const id = `label-${uid()}`;
    return (
      <label htmlFor={id}>
        <input
          id={id}
          type="radio"
          onChange={() => this.setState({ [side]: Icon })}
          checked={this.state[side] === Icon}
        />
        <Icon />
      </label>
    );
  }

  createIcon(side) {
    const Icon = this.state[side] || (() => null);
    return (<Icon slot={side} />);
  }

  render() {
    return (
      <div>
        <style>{'label {margin-right: 10px;}'}</style>
        <form>
          <strong>Boolean Attributes</strong>
          <br />
          {this.createCheckboxBooleanAttribute('disabled')}
          {this.createCheckboxBooleanAttribute('selected')}
          {this.createCheckboxBooleanAttribute('compact')}
        </form>
        <br />
        <form>
          <strong>Appearances</strong>
          <br />
          {this.createRadioAppearanceAttribute(APPEARANCE.STANDARD)}
          {this.createRadioAppearanceAttribute(APPEARANCE.PRIMARY)}
          {this.createRadioAppearanceAttribute(APPEARANCE.SUBTLE)}
          {this.createRadioAppearanceAttribute(APPEARANCE.LINK)}
        </form>
        <br />
        <form>
          <strong>Left Icons</strong>
          <br />
          {
            this.props.icons.map(Icon => this.createRadioIconOption(Icon, 'before'))
          }
        </form>
        <br />
        <form>
          <strong>Right Icons</strong>
          <br />
          {
            this.props.icons.map(Icon => this.createRadioIconOption(Icon, 'after'))
          }
        </form>
        <br />
        <p>
          Baseline alignment check
          <AkButton
            disabled={this.state.disabled}
            selected={this.state.selected}
            compact={this.state.compact}
            appearance={this.state.appearance}
            onclick={action('clicking the WebComponent')}
          >
            {this.createIcon('before')}
            {this.createIcon('after')}
            Button
          </AkButton>
        </p>
      </div>
    );
  }
}

AkButtonStates.displayName = 'AkButtonStates';
AkButtonStates.propTypes = {
  icons: React.PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default AkButtonStates;
