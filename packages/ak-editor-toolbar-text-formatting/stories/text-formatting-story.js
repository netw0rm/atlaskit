import { storiesOf } from '@kadira/storybook';
import TextFormattingComponent from '../src';
import React from 'React';
import reactify from 'akutil-react';

const TextFormatting = reactify(TextFormattingComponent);

storiesOf('ak-editor-toolbar-text-formatting', module)
  .add('Basic', () => (
    <TextFormatting />
  ))
  .add('Basic (interactive)', () => {
    class Demo extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          boldActive: false,
          italicActive: false,
          underlineActive: false,
          boldDisabled: false,
          italicDisabled: false,
          underlineDisabled: false,
        };
      }

      render() {
        return (
          <div>
            <TextFormatting
              boldActive={this.state.boldActive}
              italicActive={this.state.italicActive}
              underlineActive={this.state.underlineActive}
              boldDisabled={this.state.boldDisabled}
              italicDisabled={this.state.italicDisabled}
              underlineDisabled={this.state.underlineDisabled}
              ontoggle-bold={() => this.setState({
                boldActive: !this.state.boldActive,
              })}
              ontoggle-italic={() => this.setState({
                italicActive: !this.state.italicActive,
              })}
              ontoggle-underline={() => this.setState({
                underlineActive: !this.state.underlineActive,
              })}
            />
            <p>
              <input
                type="checkbox"
                checked={!this.state.boldDisabled}
                onChange={(e) => this.setState({ boldDisabled: !e.target.checked })}
              />
              <b
                tabIndex="-1"
                onFocus={() => this.setState({ boldActive: true })}
                onBlur={() => this.setState({ boldActive: false })}
              >bold text</b></p>
            <p>
              <input
                type="checkbox"
                checked={!this.state.italicDisabled}
                onChange={(e) => this.setState({ italicDisabled: !e.target.checked })}
              />
              <i
                tabIndex="-1"
                onFocus={() => this.setState({ italicActive: true })}
                onBlur={() => this.setState({ italicActive: false })}
              >italic text</i></p>
            <p>
              <input
                type="checkbox"
                checked={!this.state.underlineDisabled}
                onChange={(e) => this.setState({ underlineDisabled: !e.target.checked })}
              />
              <u
                tabIndex="-1"
                onFocus={() => this.setState({ underlineActive: true })}
                onBlur={() => this.setState({ underlineActive: false })}
              >underline text</u></p>
          </div>
        );
      }
    }

    return <Demo />;
  });
