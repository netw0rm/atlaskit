import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';

import ContentComponent from '../src';


const Content = reactify(ContentComponent);

/* eslint-disable react/no-danger */
storiesOf('ak-editor-content', module)
  .add('Empty', () => (
    <Content />
  ))
  .add('div', () => (
    <Content>
      <div
        contentEditable
        dangerouslySetInnerHTML={{
          __html: 'Hello world!',
        }}
      />
    </Content>
  ))
  .add('p', () => (
    <Content>
      <p
        contentEditable
        dangerouslySetInnerHTML={{
          __html: 'Hello world!',
        }}
      />
    </Content>
  ))
  .add('div > p', () => (
    <Content>
      <div
        contentEditable
        dangerouslySetInnerHTML={{
          __html: '<p>Hello world!</p>',
        }}
      />
    </Content>
  ))
  .add('div > p + p', () => (
    <Content>
      <div
        contentEditable
        dangerouslySetInnerHTML={{
          __html: '<p>Hello world!</p><p>Hello world!</p>',
        }}
      />
    </Content>
  ))
  .add('div > p + div', () => (
    <Content>
      <div
        contentEditable
        dangerouslySetInnerHTML={{
          __html: '<p>Hello world!</p><div>Hello world!</div>',
        }}
      />
    </Content>
  ))
  .add('div > p + div + p', () => (
    <Content>
      <div
        contentEditable
        dangerouslySetInnerHTML={{
          __html: '<p>Hello world!</p><div>Hello world!</div><p>Hello world!</p>',
        }}
      />
    </Content>
  ))
  .add('div (open top)', () => (
    <Content openTop>
      <div
        contentEditable
        dangerouslySetInnerHTML={{
          __html: 'Hello world!',
        }}
      />
    </Content>
  ))
  .add('p (open top)', () => (
    <Content openTop>
      <p
        contentEditable
        dangerouslySetInnerHTML={{
          __html: 'Hello world!',
        }}
      />
    </Content>
  ))
  .add('div > p (open top)', () => (
    <Content openTop>
      <div
        contentEditable
        dangerouslySetInnerHTML={{
          __html: '<p>Hello world!</p>',
        }}
      />
    </Content>
  ))
  .add('div > p + p (open top)', () => (
    <Content openTop>
      <div
        contentEditable
        dangerouslySetInnerHTML={{
          __html: '<p>Hello world!</p><p>Hello world!</p>',
        }}
      />
    </Content>
  ))
  .add('div > p + div (open top)', () => (
    <Content openTop>
      <div
        contentEditable
        dangerouslySetInnerHTML={{
          __html: '<p>Hello world!</p><div>Hello world!</div>',
        }}
      />
    </Content>
  ))
  .add('div > p + div + p (open top)', () => (
    <Content openTop>
      <div
        contentEditable
        dangerouslySetInnerHTML={{
          __html: '<p>Hello world!</p><div>Hello world!</div><p>Hello world!</p>',
        }}
      />
    </Content>
  ))
  .add('div (open bottom)', () => (
    <Content openBottom>
      <div
        contentEditable
        dangerouslySetInnerHTML={{
          __html: 'Hello world!',
        }}
      />
    </Content>
  ))
  .add('p (open bottom)', () => (
    <Content openBottom>
      <p
        contentEditable
        dangerouslySetInnerHTML={{
          __html: 'Hello world!',
        }}
      />
    </Content>
  ))
  .add('div > p (open bottom)', () => (
    <Content openBottom>
      <div
        contentEditable
        dangerouslySetInnerHTML={{
          __html: '<p>Hello world!</p>',
        }}
      />
    </Content>
  ))
  .add('div > p + p (open bottom)', () => (
    <Content openBottom>
      <div
        contentEditable
        dangerouslySetInnerHTML={{
          __html: '<p>Hello world!</p><p>Hello world!</p>',
        }}
      />
    </Content>
  ))
  .add('div > p + div (open bottom)', () => (
    <Content openBottom>
      <div
        contentEditable
        dangerouslySetInnerHTML={{
          __html: '<p>Hello world!</p><div>Hello world!</div>',
        }}
      />
    </Content>
  ))
  .add('div > p + div + p (open bottom)', () => (
    <Content openBottom>
      <div
        contentEditable
        dangerouslySetInnerHTML={{
          __html: '<p>Hello world!</p><div>Hello world!</div><p>Hello world!</p>',
        }}
      />
    </Content>
  ));
