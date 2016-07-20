import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkButtonTemplate from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';
// import styles from 'style!./../src/host.less'; // eslint-disable-line import/no-unresolved

const AkButton = reactify(AkButtonTemplate, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('a default ak-button', () => (
    <AkButton label="Button" />
  ))
  .add('a primary ak-button', () => (
    <AkButton label="Primary Button" primary />
  ))
  .add('a disabled ak-button', () =>
    <AkButton
      disabled
      label="Button"
      onclick={action('clicking the WebComponent')}
    />
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
              label="Button"
              onclick={action('clicking the WebComponent')}
            />
          </div>
        );
      }
    }

    return <MyComponent />;
  })
  .add('an ak-button that emits an action when it is clicked', () => (
    <AkButton id="myComponent" label="Button" onClick={action('clicking the WebComponent')} />
  ));
