// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { storiesOf, action } from '@kadira/storybook';
import makePublisher from '../src/view/dimension-publisher/make-dimension-publisher';

const publishDimensions = action('publish');

const DimensionPublisher = makePublisher(publishDimensions);

const Child = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px;
  background: lightblue;
`;

storiesOf('dimension publisher', module)
  .add('basic', () => {
    class Playground extends PureComponent {
      state: {|
        shouldPublish: boolean,
        ref: ?Element,
      |}

      state = {
        shouldPublish: false,
        ref: null,
      }

      forcePublish = () => {
        // needs to be toggle to force a publish
        this.setState({
          shouldPublish: false,
        }, () => {
          this.setState({
            shouldPublish: true,
          });
        });
      }

      setRef = (ref: ?Element) => {
        this.setState({
          ref,
        });
      }

      render() {
        return (
          <div ref={this.setRef}>
            <DimensionPublisher
              itemId="10"
              shouldPublish={this.state.shouldPublish}
              publish={publishDimensions}
              outerRef={this.state.ref}
            >
              <Child>hello there</Child>
            </DimensionPublisher>
            <button onClick={this.forcePublish}>force publish</button>
          </div>
        );
      }
    }

    return <Playground />;
  });
