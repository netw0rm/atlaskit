/* eslint-disable react/prop-types */
import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';

import TextInputComponent from '../src';


const TextInput = reactify(TextInputComponent);
const Container = props => (
  <div style={{ backgroundColor: '#545454', padding: '5px 10px' }}>
    {props.children}
  </div>
);

storiesOf('ak-editor-popup-text-input', module)
  .add('Empty', () => (
    <Container>
      <TextInput />
    </Container>
  ))
  .add('Empty (with placeholder)', () => (
    <Container>
      <TextInput placeholder="Type here…" />
    </Container>
  ))
  .add('Initial value', () => (
    <Container>
      <TextInput value="An initial value." />
    </Container>
  ))
  .add(':focus', () => {
    class Demo extends React.Component {
      componentDidMount() {
        if (this.component) {
          this.container.focus();
        }
      }

      render() {
        return (
          <Container ref={(container) => { this.container = container; }}>
            <TextInput value="An initial value." />
          </Container>
        );
      }
    }

    return <Demo />;
  })
  .add('focus()', () => (
    <Container>
      <button
        onClick={() => {
          document.getElementById('focus()').focus();
        }}
      />
      <TextInput id="focus()" />
    </Container>
  ));
