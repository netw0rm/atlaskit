import { storiesOf, action } from '@kadira/storybook';
import FacadeInput from '../src';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

storiesOf('ak-editor-facade-input', module)
  .add('facade input attached', () => {
    type Props = {};
    type State = {};
    class FacadeInputField extends Component<Props, State> {
      constructor() {
        super();
      }

      render() {
        return (
          <div>Hello</div>
        )
      }

      componentDidMount() {
        const elem = ReactDOM.findDOMNode(this);
        const facadeInput = new FacadeInput(elem, {
          initialValue: elem.innerText,
          classList: []
        });

        facadeInput.onSync = (val) => {
          action('value sycned ${val}');
        };
      }
    }

    return <FacadeInputField />;
  });
