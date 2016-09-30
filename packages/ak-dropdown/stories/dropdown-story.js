import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Dropdown from '../src/index';
import React from 'react';
const { Component } = React;
import { name } from '../package.json';
import 'ak-avatar';
import hostStyles from 'style!./../src/less/host.less';

const dropdownClass = hostStyles.akDropdown;
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
        <DropdownReactComponent
          target={this.state.target}
          open={this.state.open}
          className={dropdownClass}
        >
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
      <DropdownReactComponent open className={dropdownClass}>
        <ak-dropdown-trigger-button slot="trigger" tab-index="1">
          Dropdown-button
        </ak-dropdown-trigger-button>
        <ak-dropdown-item>text1</ak-dropdown-item>
        <ak-dropdown-item>text2</ak-dropdown-item>
        <ak-dropdown-item>some text here</ak-dropdown-item>
        <ak-dropdown-item>another text</ak-dropdown-item>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with checkbox items', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent open className={dropdownClass}>
        <ak-dropdown-trigger-button slot="trigger">Dropdown-button</ak-dropdown-trigger-button>
        <ak-dropdown-group heading="Checkboxes title">
          <ak-dropdown-item-checkbox>text1</ak-dropdown-item-checkbox>
          <ak-dropdown-item-checkbox disabled>text2</ak-dropdown-item-checkbox>
          <ak-dropdown-item-checkbox>some text here</ak-dropdown-item-checkbox>
          <ak-dropdown-item-checkbox>another text</ak-dropdown-item-checkbox>
        </ak-dropdown-group>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with radio items', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent open className={dropdownClass}>
        <ak-dropdown-trigger-button slot="trigger" tab-index="1">
          Dropdown
        </ak-dropdown-trigger-button>
        <ak-dropdown-group heading="Radio title">
          <ak-dropdown-item-radio>text1</ak-dropdown-item-radio>
          <ak-dropdown-item-radio disabled>text2</ak-dropdown-item-radio>
          <ak-dropdown-item-radio>some text here</ak-dropdown-item-radio>
          <ak-dropdown-item-radio>another text</ak-dropdown-item-radio>
        </ak-dropdown-group>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with radio items inside different groups', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent open className={dropdownClass}>
        <ak-dropdown-trigger-button slot="trigger" tab-index="1">
          Dropdown
        </ak-dropdown-trigger-button>
        <ak-dropdown-group heading="One title">
          <ak-dropdown-item-radio>one</ak-dropdown-item-radio>
          <ak-dropdown-item-radio>two</ak-dropdown-item-radio>
        </ak-dropdown-group>
        <ak-dropdown-group heading="Two title">
          <ak-dropdown-item-radio>three</ak-dropdown-item-radio>
          <ak-dropdown-item-radio>four</ak-dropdown-item-radio>
        </ak-dropdown-group>
        <ak-dropdown-group>
          <ak-dropdown-item-radio>this is a titleless group</ak-dropdown-item-radio>
          <ak-dropdown-item-radio>separate group</ak-dropdown-item-radio>
        </ak-dropdown-group>
      </DropdownReactComponent>
    </div>
  ))
  .add('simple dropdown with outside trigger', () => (
    <DropdownWithOutsideTrigger />
  ))
  .add('dropdown with avatars', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent open className={dropdownClass}>
        <ak-dropdown-trigger-button slot="trigger" tab-index="1">
          People list
        </ak-dropdown-trigger-button>
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
      <DropdownReactComponent open className={dropdownClass}>
        <ak-dropdown-trigger slot="trigger" tab-index="1">Dropdown-button</ak-dropdown-trigger>
        <ak-dropdown-item>some text here</ak-dropdown-item>
        <ak-dropdown-item>some text here</ak-dropdown-item>
        <ak-dropdown-group heading="title one">
          <ak-dropdown-item>text1</ak-dropdown-item>
          <ak-dropdown-item selected>text2</ak-dropdown-item>
        </ak-dropdown-group>
        <ak-dropdown-group heading="title two">
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
      <DropdownReactComponent open className={dropdownClass}>
        <ak-dropdown-trigger slot="trigger" tab-index="1">Dropdown-button</ak-dropdown-trigger>
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
  .add('dropdown with a buttonless trigger', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent className={dropdownClass}>
        <ak-dropdown-trigger slot="trigger" tab-index="1">
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
      <DropdownReactComponent className={dropdownClass}>
        <ak-dropdown-trigger-button slot="trigger" tab-index="1">A</ak-dropdown-trigger-button>
        <ak-dropdown-item>A</ak-dropdown-item>
      </DropdownReactComponent>
      <DropdownReactComponent className={dropdownClass}>
        <ak-dropdown-trigger-button slot="trigger" tab-index="1">B</ak-dropdown-trigger-button>
        <ak-dropdown-item>B</ak-dropdown-item>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with a link that opens in a new tab', () => (
    <div>
      <DropdownReactComponent className={dropdownClass}>
        <ak-dropdown-trigger-button slot="trigger" tab-index="1">
          Dropdown-button
        </ak-dropdown-trigger-button>
        <ak-dropdown-item href="http://atlassian.design" target="_blank">New tab</ak-dropdown-item>
        <ak-dropdown-item href="http://atlassian.design">Same tab</ak-dropdown-item>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with icon only button trigger', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent className={dropdownClass}>
        <ak-dropdown-trigger-arrow slot="trigger" tab-index="1"></ak-dropdown-trigger-arrow>
        <ak-dropdown-item>Joscha</ak-dropdown-item>
        <ak-dropdown-item>Wuz</ak-dropdown-item>
        <ak-dropdown-item>Here</ak-dropdown-item>
        <ak-dropdown-item>2016</ak-dropdown-item>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with everything for the screenreaders test', () => (
    <div style={{ padding: '40px' }}>
      <input type="text" placeholder="item before" />
      <DropdownReactComponent className={dropdownClass}>
        <ak-dropdown-trigger-button slot="trigger" tab-index="1">Text</ak-dropdown-trigger-button>
        <ak-dropdown-group heading="People">
          <ak-dropdown-item href="http://atlassian.com" target="_blank">Joscha</ak-dropdown-item>
          <ak-dropdown-item href="http://google.com" target="_blank">Jennifer</ak-dropdown-item>
        </ak-dropdown-group>
        <ak-dropdown-group heading="Gender">
          <ak-dropdown-item-checkbox selected>Female</ak-dropdown-item-checkbox>
          <ak-dropdown-item-checkbox>Male</ak-dropdown-item-checkbox>
        </ak-dropdown-group>
        <ak-dropdown-group heading="Favourites">
          <ak-dropdown-item-radio>jQuery</ak-dropdown-item-radio>
          <ak-dropdown-item-radio selected>React</ak-dropdown-item-radio>
          <ak-dropdown-item-radio selected>Web components</ak-dropdown-item-radio>
          <ak-dropdown-item-radio>Vanilla JS</ak-dropdown-item-radio>
        </ak-dropdown-group>
      </DropdownReactComponent>
      <a href="#">link after</a>
    </div>
  ))
  .add('dropdown with lots of items', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent className={dropdownClass}>
        <ak-dropdown-trigger-arrow slot="trigger" tab-index="1"></ak-dropdown-trigger-arrow>
        <ak-dropdown-item>Joscha</ak-dropdown-item>
        <ak-dropdown-item>Wuz</ak-dropdown-item>
        <ak-dropdown-item>Here</ak-dropdown-item>
        <ak-dropdown-item>2016</ak-dropdown-item>
        <ak-dropdown-item>text1</ak-dropdown-item>
        <ak-dropdown-item disabled>text2</ak-dropdown-item>
        <ak-dropdown-item>some text here</ak-dropdown-item>
        <ak-dropdown-item>another text</ak-dropdown-item>
        <ak-dropdown-item>text1</ak-dropdown-item>
        <ak-dropdown-item>text2</ak-dropdown-item>
        <ak-dropdown-item>some text here</ak-dropdown-item>
        <ak-dropdown-item>another text</ak-dropdown-item>
        <ak-dropdown-item>text1</ak-dropdown-item>
        <ak-dropdown-item disabled>text2</ak-dropdown-item>
        <ak-dropdown-item>some text here</ak-dropdown-item>
        <ak-dropdown-item>another text</ak-dropdown-item>
        <ak-dropdown-item>text1</ak-dropdown-item>
        <ak-dropdown-item disabled>text2</ak-dropdown-item>
        <ak-dropdown-item>some text here</ak-dropdown-item>
        <ak-dropdown-item>another text</ak-dropdown-item>
      </DropdownReactComponent>
    </div>
  ));
