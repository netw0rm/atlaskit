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
    this.state = {
      open: false,
    };

    // Bind callback methods to make `this` the correct context.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ open: true });
  }

  render() {
    return (
      <div style={{ padding: '40px' }}>
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
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent open>
        <ak-dropdown-trigger-button slot="trigger">Dropdown-button</ak-dropdown-trigger-button>
        <ak-dropdown-item>text1</ak-dropdown-item>
        <ak-dropdown-item>text2</ak-dropdown-item>
        <ak-dropdown-item>some text here</ak-dropdown-item>
        <ak-dropdown-item>another text</ak-dropdown-item>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with checkbox items', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent open>
        <ak-dropdown-trigger-button slot="trigger">Dropdown-button</ak-dropdown-trigger-button>
        <ak-dropdown-group title="Checkboxes title">
          <ak-dropdown-item checkbox>text1</ak-dropdown-item>
          <ak-dropdown-item checkbox disabled>text2</ak-dropdown-item>
          <ak-dropdown-item checkbox>some text here</ak-dropdown-item>
          <ak-dropdown-item checkbox>another text</ak-dropdown-item>
        </ak-dropdown-group>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with radio items', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent open>
        <ak-dropdown-trigger-button slot="trigger">Dropdown</ak-dropdown-trigger-button>
        <ak-dropdown-group title="Radio title">
          <ak-dropdown-item radio>text1</ak-dropdown-item>
          <ak-dropdown-item radio disabled>text2</ak-dropdown-item>
          <ak-dropdown-item radio>some text here</ak-dropdown-item>
          <ak-dropdown-item radio>another text</ak-dropdown-item>
        </ak-dropdown-group>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with radio items inside different groups', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent open>
        <ak-dropdown-trigger-button slot="trigger">Dropdown</ak-dropdown-trigger-button>
        <ak-dropdown-group title="One title">
          <ak-dropdown-item radio>one</ak-dropdown-item>
          <ak-dropdown-item radio>two</ak-dropdown-item>
        </ak-dropdown-group>
        <ak-dropdown-group title="Two title">
          <ak-dropdown-item radio>three</ak-dropdown-item>
          <ak-dropdown-item radio>four</ak-dropdown-item>
        </ak-dropdown-group>
        <ak-dropdown-group>
          <ak-dropdown-item radio>this is a titleless group</ak-dropdown-item>
          <ak-dropdown-item radio>separate group</ak-dropdown-item>
        </ak-dropdown-group>
      </DropdownReactComponent>
    </div>
  ))
  .add('simple dropdown with outside trigger', () => (
    <DropdownWithOutsideTrigger />
  ))
  .add('dropdown with avatars', () => (
    <div style={{ padding: '40px' }}>
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
    <div style={{ padding: '40px' }}>
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
    <div style={{ padding: '40px' }}>
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
    <div style={{ padding: '40px' }}>
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
    <div style={{ padding: '40px' }}>
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
  .add('dropdown with a link that opens in a new tab', () => (
    <div>
      <DropdownReactComponent>
        <ak-dropdown-trigger-button slot="trigger">Dropdown-button</ak-dropdown-trigger-button>
        <ak-dropdown-item href="http://atlassian.design" target="_blank">New tab</ak-dropdown-item>
        <ak-dropdown-item href="http://atlassian.design">Same tab</ak-dropdown-item>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with icon only button trigger', () => (
    <div style={{ padding: '40px' }}>
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
