import { storiesOf } from '@kadira/storybook';
import ListsComponent from '../src';
import React from 'react';
import reactify from 'akutil-react';

const Lists = reactify(ListsComponent);

storiesOf('ak-editor-toolbar-lists', module)
  .add('Basic', () => (
    <Lists />
  ))
  .add('Basic (interactive)', () => {
    class Demo extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          bulletlistActive: false,
          numberlistActive: false,
          bulletlistDisabled: false,
          numberlistDisabled: false,
        };
      }

      render() {
        return (
          <div>
            <Lists
              bulletlistActive={this.state.bulletlistActive}
              numberlistActive={this.state.numberlistActive}
              bulletlistDisabled={this.state.bulletlistDisabled}
              numberlistDisabled={this.state.numberlistDisabled}
              ontoggle-bulletlist={() => this.setState({
                bulletlistActive: !this.state.bulletlistActive,
              })}
              ontoggle-numberlist={() => this.setState({
                numberlistActive: !this.state.numberlistActive,
              })}
            />
            <p>
              <input
                type="checkbox"
                checked={!this.state.bulletlistDisabled}
                onChange={(e) => this.setState({ bulletlistDisabled: !e.target.checked })}
              />
              <ul><li
                tabIndex="-1"
                onFocus={() => this.setState({ bulletlistActive: true })}
                onBlur={() => this.setState({ bulletlistActive: false })}
              >bulletlist text</li></ul></p>
            <p>
              <input
                type="checkbox"
                checked={!this.state.numberlistDisabled}
                onChange={(e) => this.setState({ numberlistDisabled: !e.target.checked })}
              />
              <ol><li
                tabIndex="-1"
                onFocus={() => this.setState({ numberlistActive: true })}
                onBlur={() => this.setState({ numberlistActive: false })}
              >numberlist text</li></ol></p>
          </div>
        );
      }
    }

    return <Demo />;
  });
