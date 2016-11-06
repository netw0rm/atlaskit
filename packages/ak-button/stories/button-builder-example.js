import React from 'react';
import reactify from 'akutil-react';
import { action } from '@kadira/storybook';
import uid from 'uid';

import AkButtonTemplate, { APPEARANCE, SPACING } from '../src';


const AkButton = reactify(AkButtonTemplate);

class ButtonBuilderExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      selected: false,
      spacing: SPACING.NORMAL,
      appearance: APPEARANCE.STANDARD,
      href: undefined,
      target: undefined,
      before: false,
      after: false,
    };
  }

  createInputAttribute(data) {
    const id = `label-${uid()}`;
    return (
      <label htmlFor={id}>
        <input
          id={id}
          type={data.type}
          onChange={data.onChange || (() => (this.setState({ [data.name]: data.value })))}
          checked={data.value ? this.state[data.name] === data.value : this.state[data.name]}
        />
        {data.desc || data.value}
      </label>
    );
  }

  createCheckboxAttribute(attribute, desc, onChange) {
    return this.createInputAttribute({ type: 'checkbox', name, desc: desc || attribute, onChange });
  }

  createBooleanCheckboxAttribute(attribute, desc) {
    return this.createCheckboxAttribute(
      attribute,
      desc,
      () => this.setState({ [attribute]: !this.state[attribute] })
    );
  }

  createStringCheckboxAttribute(attribute, defaultValue, desc) {
    return this.createCheckboxAttribute(
      attribute,
      desc,
      () => this.setState({ [attribute]: (this.state[attribute]) ? undefined : defaultValue })
    );
  }

  createRadioAttribute(name, value, desc) {
    return this.createInputAttribute({ type: 'radio', name, value, desc });
  }

  createIcon(side) {
    const Icon = this.state[side] || (() => null);
    return (<Icon slot={side} />);
  }

  render() {
    const props = {
      disabled: this.state.disabled,
      selected: this.state.selected,
      appearance: this.state.appearance,
      onclick: action('clicking the WebComponent'),
      spacing: this.state.spacing,
      href: this.state.href,
      target: this.state.target,
    };

    return (
      <div>
        <style>{'label {margin-right: 10px;}'}</style>
        <form>
          <strong>Href Attribute</strong>
          <br />
          {this.createStringCheckboxAttribute('href', 'http://www.atlassian.com', 'link to "http://www.atlassian.com"')}
        </form>
        <br />
        <form>
          <strong>Target Attribute</strong>
          <br />
          {this.createStringCheckboxAttribute('target', '_blank', 'target="_blank"')}
        </form>
        <br />
        <form>
          <strong>Spacing Attribute</strong>
          <br />
          {this.createRadioAttribute('spacing', 'normal')}
          {this.createRadioAttribute('spacing', 'none')}
          {this.createRadioAttribute('spacing', 'compact')}
        </form>
        <br />
        <form>
          <strong>Boolean Attributes</strong>
          <br />
          {this.createBooleanCheckboxAttribute('disabled')}
          {this.createBooleanCheckboxAttribute('selected')}
        </form>
        <br />
        <form>
          <strong>Appearances</strong>
          <br />
          {this.createRadioAttribute('appearance', APPEARANCE.STANDARD)}
          {this.createRadioAttribute('appearance', APPEARANCE.PRIMARY)}
          {this.createRadioAttribute('appearance', APPEARANCE.SUBTLE)}
          {this.createRadioAttribute('appearance', APPEARANCE.LINK)}
        </form>
        <br />
        <form>
          <strong>Left Icons</strong>
          <br />
          {
            this.props.icons.map(Icon => this.createRadioAttribute('before', Icon, <Icon />))
          }
        </form>
        <br />
        <form>
          <strong>Right Icons</strong>
          <br />
          {
            this.props.icons.map(Icon => this.createRadioAttribute('after', Icon, <Icon />))
          }
        </form>
        <br />
        <p>
          Baseline alignment check
          <AkButton
            {...props}
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

ButtonBuilderExample.displayName = 'ButtonBuilderExample';
ButtonBuilderExample.propTypes = {
  icons: React.PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default ButtonBuilderExample;
