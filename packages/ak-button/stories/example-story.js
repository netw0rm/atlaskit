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
  .add('a button that can be disabled and enabled', () => {
    class MyComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          disable: false,
        };
      }

      handleClick() {
        this.setState({ disable: !this.state.disable });
      }

      render() {
        return (
          <div>
            Disable
            <input
              type="checkbox"
              onChange={this.handleClick.bind(this)}  // eslint-disable-line react/jsx-no-bind
              defaultChecked={this.state.disable}
            />
            <AkButton
              disabled={this.state.disable}
              onclick={action('clicking the WebComponent')}
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
