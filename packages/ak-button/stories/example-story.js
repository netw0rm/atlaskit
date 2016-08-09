import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkButtonTemplate from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import IconComponent from 'ak-editor-icon';

const AkButton = reactify(AkButtonTemplate, {
  React,
  ReactDOM,
});

const Icon = reactify(IconComponent, { React, ReactDOM });

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
            <label>
              Disabled
              <input
                type="checkbox"
                id="disable-checkbox"
                onChange={this.handleClick.bind(this)}  // eslint-disable-line react/jsx-no-bind
                defaultChecked={this.state.disable}
              />
            </label>
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
          >
            <Icon glyph="add" />
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
      'table',
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
                <AkButton style={buttonStyle}><Icon glyph={iconName} /></AkButton>
                <AkButton style={buttonStyle} disabled><Icon glyph={iconName} /></AkButton>
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
        <AkButton onclick={action('clicking the WebComponent')}>
          <Icon glyph="add" />
          button
        </AkButton>
        <br />
        <AkButton onclick={action('clicking the WebComponent')} disabled>
          <Icon glyph="add" />
          button
        </AkButton>

        <br />
        <AkButton >
          button
          <Icon glyph="expand" />
        </AkButton>
        <br />
        <AkButton disabled>
          button
          <Icon glyph="expand" />
        </AkButton>
        <br />

        <AkButton>
          <Icon glyph="add" />
          button
          <Icon glyph="expand" />
        </AkButton>
        <br />

        <AkButton disabled>
          <Icon glyph="add" />
          button
          <Icon glyph="expand" />
        </AkButton>
        <br />

        <AkButton appearence="subtle" >
          <Icon glyph="add" />
          button
        </AkButton>
        <br />
        <AkButton appearence="subtle" disabled>
          <Icon glyph="add" />
          button
        </AkButton>

      </div>
    );
  });
