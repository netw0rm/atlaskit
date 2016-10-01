import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Dropdown from '../src/index';
import React from 'react';
import { name } from '../package.json';
import 'ak-avatar';
import hostStyles from 'style!./../src/less/host.less';
const { Component } = React;

const dropdownClass = hostStyles.akDropdown;
const DropdownReactComponent = reactify(Dropdown);

const avatarUrl = require('url!./doge.jpg');

class DropdownExample extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <DropdownReactComponent
        open
        className={dropdownClass}
        boundariesElement={this.props.parent}
        stepOutside={this.props.stepOutside}
        position={this.props.position}
      >
        {this.props.avatarTarget ?
          <ak-dropdown-trigger slot="trigger" tab-index="1">
            <ak-avatar
              src={avatarUrl}
              size="small"
            />
          </ak-dropdown-trigger> :
          <ak-dropdown-trigger-button slot="trigger" tab-index="1">
            Dropdown
          </ak-dropdown-trigger-button>
        }
        <ak-dropdown-group heading="Australia">
          <ak-dropdown-item>Sydney</ak-dropdown-item>
          <ak-dropdown-item hidden>Melbourne</ak-dropdown-item>
          <ak-dropdown-item>Adelaide</ak-dropdown-item>
          <ak-dropdown-item>Perth</ak-dropdown-item>
          <ak-dropdown-item>Canberra</ak-dropdown-item>
        </ak-dropdown-group>
      </DropdownReactComponent>
    );
  }
}

DropdownExample.propTypes = {
  parent: React.PropTypes.object,
  stepOutside: React.PropTypes.bool,
  position: React.PropTypes.string,
  avatarTarget: React.PropTypes.bool,
};

storiesOf(`${name} with different parents`, module)
  .add('dropdown with window scroll', () => (
    <div
      style={{
        padding: '40px',
        margin: '100px 0',
        border: '1px solid black',
      }}
    >
      <DropdownExample />
    </div>
  ))
  .add('dropdown inside relative parent', () => (
    <div
      style={{
        padding: '40px',
        margin: '40px',
        border: '1px solid black',
        position: 'relative',
      }}
    >
      <DropdownExample />
    </div>
  ))
  .add('dropdown inside absolute parent', () => (
    <div
      style={{
        padding: '40px',
        margin: '40px',
        border: '1px solid black',
        position: 'absolute',
        top: '40px',
        right: '60px',
      }}
    >
      <DropdownExample />
    </div>
  ))
  .add('dropdown inside parent with translate', () => (
    <div
      style={{
        padding: '40px',
        margin: '40px',
        border: '1px solid black',
        position: 'absolute',
        top: '0px',
        left: '0px',
        transform: 'translate(60px, 60px)',
      }}
    >
      <DropdownExample />
    </div>
  ))
  .add('dropdown inside fixed parent (doesn`t work so far)', () => (
    <div
      style={{
        padding: '0px',
        margin: '0px',
        border: '1px solid black',
        position: 'fixed',
        top: '0px',
        left: '50px',
        width: '300px',
        height: '300px',
      }}
    >
      <DropdownExample />
    </div>
  ))
  .add('dropdown inside relative parent floated to the right', () => (
    <div
      style={{
        padding: '40px',
        margin: '40px',
        border: '1px solid black',
        position: 'relative',
      }}
    >
      <div style={{ float: 'right' }}>
        <DropdownExample />
      </div>
    </div>
  ))
  .add('dropdown inside scrollable parent', () => (
    <div
      style={{
        border: '1px solid black',
        overflow: 'scroll',
        width: '400px',
        height: '400px',
      }}
    >
      <div
        style={{
          width: '300%',
          height: '300%',
          display: 'flex',
          padding: '300px',
        }}
      >
        <DropdownExample stepOutside />
      </div>
    </div>
  ))
  .add('dropdown inside parent with overflow:hidden', () => (
    <div
      style={{
        border: '1px solid black',
        overflow: 'hidden',
        width: '400px',
        height: '50px',
        padding: '10px',
      }}
    >
      <DropdownExample stepOutside />
    </div>
  ))
  .add('dropdown is bounded by the scrollable parent, not the viewport', () => {
    function setParent(el) {
      if (el && el.children && el.children[0] && el.children[0].children) {
        const dropdown = el.children[0].children[0];
        dropdown.boundariesElement = el;
      }
    }

    return (<div
      style={{
        border: '1px solid black',
        overflow: 'scroll',
        width: '400px',
        height: '400px',
      }}
      ref={(el) => (setParent(el))}
    >
      <div
        style={{
          width: '300%',
          height: '300%',
          display: 'flex',
          padding: '300px',
        }}
      >
        <DropdownExample parent={parent} />
      </div>
    </div>);
  })
  .add('dropdown positioned to the side (like in the navigation)', () => (
    <div
      style={{
        border: '1px solid black',
        height: '400px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
        }}
      >
        <DropdownExample position="right bottom" avatarTarget />
      </div>
    </div>
  ))
;
