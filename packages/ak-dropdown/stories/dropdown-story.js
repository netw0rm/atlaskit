import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Dropdown from '../src/index';
const { React, ReactDOM } = window;
const { Component } = React;
import { name } from '../package.json';

const DropdownReactComponent = reactify(Dropdown, {
  React,
  ReactDOM,
});

const avatarUrl = require('url!./doge.jpg');

class DropdownWithOutsideTrigger extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // Bind callback methods to make `this` the correct context.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ open: true });
  }

  render() {
    return (
      <div>
        <ak-avatar
          src={avatarUrl}
          size="small"
          ref={(el) => {
            if (el && !this.state.target) {
              this.setState({ target: el });
            }
          }}
          onClick={this.handleClick}
        />
        <DropdownReactComponent target={this.state.target} open={this.state.open}>
          <ak-dropdown-item>text1</ak-dropdown-item>
          <ak-dropdown-item>text2</ak-dropdown-item>
          <ak-dropdown-item>some text here</ak-dropdown-item>
          <ak-dropdown-item>another text</ak-dropdown-item>
        </DropdownReactComponent>
      </div>
    );
  }
}

storiesOf(`${name} component`, module)
  .add('simple dropdown', () => (
    <div>
      <DropdownReactComponent>
        <ak-dropdown-trigger slot="trigger">Dropdown-button</ak-dropdown-trigger>
        <ak-dropdown-item>text1</ak-dropdown-item>
        <ak-dropdown-item>text2</ak-dropdown-item>
        <ak-dropdown-item>some text here</ak-dropdown-item>
        <ak-dropdown-item>another text</ak-dropdown-item>
      </DropdownReactComponent>
    </div>
  ))
  .add('simple dropdown with outside trigger', () => (
    <DropdownWithOutsideTrigger />
  ))
  .add('dropdown with avatars', () => (
    <div>
      <DropdownReactComponent>
        <ak-dropdown-trigger slot="trigger">People list</ak-dropdown-trigger>
        <ak-dropdown-item>
          <ak-avatar slot="left" src={avatarUrl} size="small" />
          Adam Smith
        </ak-dropdown-item>
        <ak-dropdown-item>
          <ak-avatar slot="left" src={avatarUrl} size="small" />
          Eva Smith
        </ak-dropdown-item>
        <ak-dropdown-item>
          <ak-avatar slot="left" src={avatarUrl} size="small" />
          Ivan Ivanov
        </ak-dropdown-item>
        <ak-dropdown-item>
          <ak-avatar slot="left" src={avatarUrl} size="small" />
          Jane Black
        </ak-dropdown-item>
        <ak-dropdown-item>
          <ak-avatar slot="left" src={avatarUrl} size="small" />
          Mike Cannon-Brookes
        </ak-dropdown-item>
        <ak-dropdown-item>
          <ak-avatar slot="left" src={avatarUrl} size="small" />
          Some very long name very long name very long
          name very long name very long name very long name
        </ak-dropdown-item>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with everything', () => (
    <div>
      <DropdownReactComponent>
        <ak-dropdown-trigger slot="trigger">Dropdown-button</ak-dropdown-trigger>
        <ak-dropdown-item>text1</ak-dropdown-item>
        <ak-dropdown-item selected>text2</ak-dropdown-item>
        <ak-dropdown-item disabled>some text here</ak-dropdown-item>
        <ak-dropdown-item>another text</ak-dropdown-item>
        <ak-dropdown-item>such long text for such small dropdown isn't it?</ak-dropdown-item>
        <ak-dropdown-item href="http://atlassian.com">This is a clickable link</ak-dropdown-item>
      </DropdownReactComponent>
    </div>
  ))
;
