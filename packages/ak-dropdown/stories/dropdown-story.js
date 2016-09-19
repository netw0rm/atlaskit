import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Dropdown from '../src/index';
import React from 'react';
const { Component } = React;
import { name } from '../package.json';
import 'ak-avatar';

const DropdownReactComponent = reactify(Dropdown);

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
      <DropdownReactComponent open>
        <ak-dropdown-trigger-button slot="trigger">Dropdown-button</ak-dropdown-trigger-button>
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
      <DropdownReactComponent open>
        <ak-dropdown-trigger-button slot="trigger">People list</ak-dropdown-trigger-button>
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
  .add('dropdown with grouping', () => (
    <div>
      <DropdownReactComponent open>
        <ak-dropdown-trigger slot="trigger">Dropdown-button</ak-dropdown-trigger>
        <ak-dropdown-item>some text here</ak-dropdown-item>
        <ak-dropdown-item>some text here</ak-dropdown-item>
        <ak-dropdown-group title="title one">
          <ak-dropdown-item>text1</ak-dropdown-item>
          <ak-dropdown-item selected>text2</ak-dropdown-item>
        </ak-dropdown-group>
        <ak-dropdown-group title="title two">
          <ak-dropdown-item disabled>some text here</ak-dropdown-item>
          <ak-dropdown-item>another text</ak-dropdown-item>
        </ak-dropdown-group>
        <ak-dropdown-group>
          <ak-dropdown-item>this is a group</ak-dropdown-item>
          <ak-dropdown-item>without any title</ak-dropdown-item>
        </ak-dropdown-group>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with grouping without headers', () => (
    <div>
      <DropdownReactComponent open>
        <ak-dropdown-trigger slot="trigger">Dropdown-button</ak-dropdown-trigger>
        <ak-dropdown-item>some text here</ak-dropdown-item>
        <ak-dropdown-item>some text here</ak-dropdown-item>
        <ak-dropdown-group>
          <ak-dropdown-item>text1</ak-dropdown-item>
          <ak-dropdown-item>text2</ak-dropdown-item>
        </ak-dropdown-group>
        <ak-dropdown-group>
          <ak-dropdown-item disabled>some text here</ak-dropdown-item>
          <ak-dropdown-item>another text</ak-dropdown-item>
        </ak-dropdown-group>
        <ak-dropdown-group>
          <ak-dropdown-item>this is a group</ak-dropdown-item>
          <ak-dropdown-item>without any title</ak-dropdown-item>
        </ak-dropdown-group>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with everything', () => (
    <div>
      <DropdownReactComponent open>
        <ak-dropdown-trigger-button slot="trigger">Dropdown-button</ak-dropdown-trigger-button>
        <ak-dropdown-group>
          <ak-dropdown-item>text1</ak-dropdown-item>
          <ak-dropdown-item selected>text2</ak-dropdown-item>
          <ak-dropdown-item disabled>some text here</ak-dropdown-item>
          <ak-dropdown-item>another text</ak-dropdown-item>
          <ak-dropdown-item>such long text for such small dropdown isn't it?</ak-dropdown-item>
          <ak-dropdown-item href="http://atlassian.com">This is a clickable link</ak-dropdown-item>
        </ak-dropdown-group>
        <ak-dropdown-group title="some group">
          <ak-dropdown-item>this is a group</ak-dropdown-item>
          <ak-dropdown-item>another text</ak-dropdown-item>
        </ak-dropdown-group>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with a buttonless trigger', () => (
    <div>
      <DropdownReactComponent>
        <ak-dropdown-trigger slot="trigger">
          <ak-avatar src={avatarUrl} size="small" />
        </ak-dropdown-trigger>
        <ak-dropdown-item>Joscha</ak-dropdown-item>
        <ak-dropdown-item>Wuz</ak-dropdown-item>
        <ak-dropdown-item>Here</ak-dropdown-item>
        <ak-dropdown-item>2016</ak-dropdown-item>
      </DropdownReactComponent>
    </div>
  ))
  .add('two dropdowns', () => (
    <div>
      <DropdownReactComponent>
        <ak-dropdown-trigger-button slot="trigger">A</ak-dropdown-trigger-button>
        <ak-dropdown-item>A</ak-dropdown-item>
      </DropdownReactComponent>
      <DropdownReactComponent>
        <ak-dropdown-trigger-button slot="trigger">B</ak-dropdown-trigger-button>
        <ak-dropdown-item>B</ak-dropdown-item>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with icon only button trigger', () => (
    <div>
      <DropdownReactComponent>
        <ak-dropdown-trigger-arrow slot="trigger"></ak-dropdown-trigger-arrow>
        <ak-dropdown-item>Joscha</ak-dropdown-item>
        <ak-dropdown-item>Wuz</ak-dropdown-item>
        <ak-dropdown-item>Here</ak-dropdown-item>
        <ak-dropdown-item>2016</ak-dropdown-item>
      </DropdownReactComponent>
    </div>
  ))
;
