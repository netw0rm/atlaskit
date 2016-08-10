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
              onclick={() => window.alert('clicking the WebComponent')}
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
  ))
  .add('an ak-button selected', () => {
    class SelectButton extends React.Component { // eslint-disable-line react/no-multi-comp
      constructor(props) {
        super(props);
        this.state = {
          selected: true,
        };
      }

      handleClick() {
        this.setState({ selected: !this.state.selected });
      }

      render() {
        return (
          <AkButton
            appearence={this.state.selected ? 'selected' : 'standard'}
            onClick={this.handleClick.bind(this)} // eslint-disable-line react/jsx-no-bind
            leftIcon="add"
          >
            Button
          </AkButton>
        );
      }
    }
    return <SelectButton />;
  })
  .add('ak-button with only icons', () => {
    const buttonStyle = {
      display: 'inline-block',
      margin: '10px',
    };
    const iconNames = [
      'add',
      'align-center',
      'align-left',
      'align-right',
      'attachment',
      'bold',
      'bullet-list',
      'code',
      'date',
      'decision',
      'emoji',
      'expand',
      'help',
      'image',
      'indent',
      'italic',
      'link',
      'mention',
      'more',
      'number-list',
      'open',
      'outdent',
      'redo',
      'task',
      'text-color',
      'underline',
      'undo',
      'unlink',
    ];
    return (
      <div>
        {
          iconNames.map(
            iconName =>
              <div>
                <AkButton style={buttonStyle} leftIcon={iconName} />
                <AkButton style={buttonStyle} disabled leftIcon={iconName} />
                <AkButton style={buttonStyle} appearence="subtle" leftIcon={iconName} />
                <AkButton style={buttonStyle} appearence="selected" leftIcon={iconName} />
              </div>
          )
        }
      </div>
    );
  })
  .add('ak-button with icons and text', () => {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
    };


    return (
      <div style={containerStyle}>
        <AkButton onclick={action('clicking the WebComponent')} leftIcon="add">
          button
        </AkButton>
        <br />
        <AkButton onclick={action('clicking the WebComponent')} disabled leftIcon="add">
          button
        </AkButton>

        <br />
        <AkButton rightIcon="expand">
          button
        </AkButton>
        <br />
        <AkButton disabled rightIcon="expand">
          button
        </AkButton>
        <br />

        <AkButton leftIcon="add" rightIcon="expand">
          button
        </AkButton>
        <br />

        <AkButton disabled leftIcon="add" rightIcon="expand">
          button
        </AkButton>
        <br />

        <AkButton appearence="subtle" leftIcon="add">
          button
        </AkButton>
        <br />
        <AkButton appearence="subtle" disabled leftIcon="add">
          button
        </AkButton>
        <br />

        <AkButton appearence="selected" leftIcon="bullet-list">
          button
        </AkButton>
        <br />
        <AkButton appearence="selected" disabled leftIcon="bullet-list">
          button
        </AkButton>

      </div>
    );
  });
