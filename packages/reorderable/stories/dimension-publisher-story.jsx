// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { storiesOf, action } from '@kadira/storybook';
import { DimensionPublisher } from '../src/view/dimension-publisher/';

const publishDimensions = action('publish');

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
        shouldPublish: boolean
      |}

      state = {
        shouldPublish: false,
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

      render() {
        return (
          <div>
            <DimensionPublisher
              itemId="10"
              shouldPublish={this.state.shouldPublish}
              publish={publishDimensions}
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
