import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import DropdownExample from './DropdownExample';

storiesOf(`${name} with different parents`, module)
  .add('dropdown with window scroll', () => (
    <div
      style={{
        padding: '40px',
        margin: '100px 0 0 0',
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
      ref={el => (setParent(el))}
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
        <DropdownExample position="right bottom" avatarTarget appearance="tall" />
      </div>
    </div>
  ))
;
