import { storiesOf } from '@kadira/storybook';
import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';
import Checkbox, { CheckboxStateless, CheckboxGroup } from '../src';
import { name } from '../package.json';

const containerStyle = {
  padding: 20,
  backgroundColor: 'white',
  width: 500,
};

const formTestUrl = '//httpbin.org/get';

function checkboxGroupSubmitStory(content) {
  return (
    <div>
      <form
        action={formTestUrl}
        method="get"
        style={{ backgroundColor: 'white', padding: '40px', width: '500px' }}
        target="myFrame"
      >
        {content}
        <p>
          <Button type="submit" appearance="primary">Submit</Button>
        </p>
      </form>
      <p>The data submitted by the form will appear below:</p>
      <iframe src="" name="myFrame" style={{ width: '50%', height: '300px' }} />
    </div>
  );
}

export default class StatelessExample extends PureComponent {
  state = { isChecked: false }
  onChange = () => {
    console.log('onchange called for', this.props.value);
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    return (
      <CheckboxStateless
        isChecked={this.state.isChecked}
        onChange={this.onChange}
        label="With user managed state"
        value={this.props.value}
        name={this.props.value}
      />
    );
  }
}

storiesOf(name, module)
  .add('Default use', () => (
    <div style={containerStyle}>
      <Checkbox
        label="Default checkbox usage"
        onChange={checked => console.log('checkbox state changed: ', checked)}
        value="default"
        name="default"
      />
    </div>
  ))
  .add('When checkbox is checked by default', () => (
    <div style={containerStyle}>
      <Checkbox
        initiallyChecked
        label="Checkbox begins checked"
        onChange={(checked) => console.log('checkbox state changed: ', checked)}
        value="default"
        name="default"
      />
    </div>
  ))
  .add('Disabled checkbox', () => (
    <div style={containerStyle}>
      <Checkbox
        initiallyChecked
        isDisabled
        label="disabled checkbox"
        onChange={(checked) => console.log('the checkbox is checked: ', checked)}
        value="default"
        name="default"
      />
      <Checkbox
        isDisabled
        label="disabled checkbox"
        onChange={(checked) => console.log('the checkbox is checked: ', checked)}
        value="default"
        name="default"
      />
    </div>
  ))
  .add('Is full width', () => (
    <div>
      <div style={{ ...containerStyle, border: '1px solid steelblue' }}>
        <Checkbox
          label="Full width checkbox"
          isFullWidth
          onChange={() => {}}
          value="default"
          name="default"
        />
      </div>
      <div style={{ ...containerStyle, border: '1px solid steelblue' }}>
        <Checkbox
          label="Normal width checkbox"
          onChange={() => {}}
          value="default"
          name="default"
        />
      </div>
    </div>
  ))
  .add('stateless example', () => (
    <div style={containerStyle}>
      <StatelessExample value="stateless" />
    </div>
  ))
  .add('in a checkbox group', () => (
    checkboxGroupSubmitStory(
      <CheckboxGroup>
        <Checkbox
          label="One"
          onChange={checked => console.log('the checkbox is checked: ', checked)}
          value="One"
          name="one"
        />
        <Checkbox
          label="Two"
          onChange={checked => console.log('the checkbox is checked: ', checked)}
          value="Two"
          name="two"
        />
        <Checkbox
          label="Three"
          onChange={checked => console.log('the checkbox is checked: ', checked)}
          value="Three"
          name="three"
        />
      </CheckboxGroup>
    )
  ))
;
