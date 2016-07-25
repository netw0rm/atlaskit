import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Tag from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';

const Component = reactify(Tag, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('text: simple', () => (
    <Component text="watersports" />
  ))
  .add('text: special characters (must not alert)', () => (
    <Component text="<script>alert('must not alert');</script>" />
  ))
  .add('text: special characters, programmatically (must not alert)', () => {
    const attachTag = (e) => {
      if (!e) {
        return;
      }
      e.innerHTML = '';
      const tag = new Tag();
      tag.text = '<script>alert(\'must not alert either!\');</script>';
      e.appendChild(tag);
    };

    return (<div ref={attachTag}></div>);
  });
