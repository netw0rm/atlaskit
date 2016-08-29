import { action } from '@kadira/storybook';

export default function buttonStatesExample(dependencies) {
  const { React, AkButton, APPEARANCE, Icon, GLYPHS } = dependencies;

  class Example extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        disabled: false,
        selected: false,
        compact: false,
        appearance: APPEARANCE.STANDARD,
        label: 'Button',
        glyph: false,
      };
    }

    createCheckboxBooleanAttribute(attribute) {
      return (
        <label>
          <input
            type="checkbox"
            onChange={() => this.setState({ [attribute]: !this.state[attribute] })}
            checked={this.state[attribute]}
          />
          {attribute}
        </label>
      );
    }

    createRadioAppearanceAttribute(attribute) {
      return (
        <label>
          <input
            type="radio"
            onChange={() => this.setState({ appearance: attribute })}
            checked={this.state.appearance === attribute}
          />
          {attribute}
        </label>
      );
    }

    createRadioIconOption(glyph) {
      return (
        <label>
          <input
            type="radio"
            onChange={() => this.setState({ glyph })}
            checked={this.state.glyph === glyph}
          />
          {glyph || 'no icon'}
        </label>
      );
    }

    createIcon() {
      if (this.state.glyph) {
        return (<Icon slot="before" key={this.state.glyph} glyph={this.state.glyph} />);
      }
      return false;
    }

    render() {
      return (
        <div>
          <style>{"label {margin-right: 10px;}"}</style>
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
            {this.createRadioAppearanceAttribute(APPEARANCE.LINK)}
          </form>
          <br />
          <form>
            <label><strong>Icons</strong></label>
            <br />
            {
              GLYPHS.map(glyph => this.createRadioIconOption(glyph))
            }
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
            {this.createIcon()}
            {this.state.label}
          </AkButton>
        </div>
      );
    }
  }
  return Example;
}
