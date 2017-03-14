import React, { PureComponent } from 'react';
import { storiesOf } from '@kadira/storybook';
import createDragHandle from '../src/view/drag-handle';

const handle = createDragHandle(() => {});

storiesOf('drag handle', module)
  .add('basic', () => {
    class Child extends PureComponent {
      render() {
        console.warn('child rendered :(');
        return (
          <div>child component</div>
        );
      }
    }

    class App extends PureComponent {
      state = {
        count: 0,
      }

      onClick = () => {
        this.setState({
          count: this.state.count + 1,
        });
      }

      render() {
        return (
          <div>
            <h3>outer</h3>
            <button onClick={this.onClick}>count: {this.state.count}</button>
            {handle(
              <div>
                <Child />
              </div>
            )}
          </div>
        );
      }
    }

    return <App />;
  });
