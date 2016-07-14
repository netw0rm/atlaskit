import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkButtonTemplate from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';

const AkButton = reactify(AkButtonTemplate, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('a default ak-button', () => (
    <AkButton>Button</AkButton>
  ))
  .add('a primary ak-button', () => (
    <AkButton appearence="primary">Primary Button</AkButton>
  ))
  .add('a disabled ak-button', () =>
    <AkButton disabled onclick={action('clicking the WebComponent')}>
      Button
    </AkButton>
  )
  .add('a subtle ak-button', () =>
    <AkButton appearence="subtle" >
      Button
    </AkButton>
  )
  .add('a button disabled/selected', () => {
    class MyComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          disable: false,
          appearence: 'standard',
        };
      }

      disable() {
        this.setState({ disable: !this.state.disable });
      }
      select() {
        this.setState({
          appearence: this.state.appearence === 'standard' ? 'selected' : 'standard',
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
                defaultChecked={this.state.appearence === 'selected'}
              />
            </label>
            <AkButton
              disabled={this.state.disable}
              appearence={this.state.appearence}
              onclick={
                () => window.alert('clicking the WebComponent') // eslint-disable-line no-alert
              }
            >
              Button
            </AkButton>
          </div>
        );
      }
    }

    return <MyComponent />;
  })
  .add('an ak-button that emits an action when it is clicked', () => (
    <AkButton id="myComponent" onClick={action('clicking the WebComponent')}>Button</AkButton>
  ));
