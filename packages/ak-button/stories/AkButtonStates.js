import { action } from '@kadira/storybook';

export default function buttonStatesExample(dependencies) {
  const { React, AkButton, buttonClass, APPEARANCE, Icon, GLYPHS } = dependencies;

  class Example extends React.Component {
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

    createRadioIconOption(glyph, side) {
      return (
        <label>
          <input
            type="radio"
            onChange={() => this.setState({ [side]: glyph })}
            checked={this.state[side] === glyph}
          />
          {glyph || 'no icon'}
        </label>
      );
    }

    createIcon(side) {
      if (this.state[side]) {
        return (<Icon slot={side} key={`${side}-${this.state[side]}`} glyph={this.state[side]} />);
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
            <label><strong>Left Icons</strong></label>
            <br />
            {
              GLYPHS.map(glyph => this.createRadioIconOption(glyph, 'before'))
            }
          </form>
          <br />
          <form>
            <label><strong>Right Icons</strong></label>
            <br />
            {
              GLYPHS.map(glyph => this.createRadioIconOption(glyph, 'after'))
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
              className={buttonClass}
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
  return Example;
}
