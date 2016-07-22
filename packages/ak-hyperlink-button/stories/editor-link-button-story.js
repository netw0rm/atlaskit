import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import EditorkitLinkButton from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import 'style!./../src/host.less';

const Component = reactify(EditorkitLinkButton, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('a simple ak-hyperlink-button', () => (
    <Component />
  ));
