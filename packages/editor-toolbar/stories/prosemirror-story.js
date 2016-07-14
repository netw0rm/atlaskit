import { storiesOf } from '@kadira/storybook';
import ToolbarComponent from '../src/index';
import ToolbarButtonComponent from 'editor-button';
import IconBoldComponent from 'editor-icons/dist/bold';
import IconItalicComponent from 'editor-icons/dist/italic';
import IconUnderlineComponent from 'editor-icons/dist/underline';
import { define, vdom } from 'skatejs'; // eslint-disable-line no-unused-vars
const { React, ReactDOM } = window;
import reactify from 'akutil-react';

const Toolbar = reactify(ToolbarComponent, { React, ReactDOM, });
const ToolbarButton = reactify(ToolbarButtonComponent, { React, ReactDOM, });
const IconBold = reactify(IconBoldComponent, { React, ReactDOM, });
const IconItalic = reactify(IconItalicComponent, { React, ReactDOM, });
const IconUnderline = reactify(IconUnderlineComponent, { React, ReactDOM, });

storiesOf('editor-toolbar', module)
  .add('Empty', () => (
    <Toolbar />
  ))
  .add('Single button', () => (
    <Toolbar>
      <ToolbarButton><IconBold /></ToolbarButton>
    </Toolbar>
  ))
  .add('Update state remotely', () => {
    class Demo extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          boldActive: false,
          boldDisabled: false,
          italicActive: false,
          italicDisabled: false,
          underlineActive: false,
          underlineDisabled: false
        };
      }

      render() {
        return (
          <div>
            <Toolbar>
              <ToolbarButton
                active={this.state.boldActive}
                disabled={this.state.boldDisabled}><IconBold /></ToolbarButton>
              <ToolbarButton
                active={this.state.italicActive}
                disabled={this.state.italicDisabled}><IconItalic /></ToolbarButton>
              <ToolbarButton
                active={this.state.underlineActive}
                disabled={this.state.underlineDisabled}><IconUnderline /></ToolbarButton>
            </Toolbar>
            <p>
              <input type="checkbox" checked={!this.state.boldDisabled} onChange={(e) => this.setState({ boldDisabled: !e.target.checked })}/>
              <b
                tabIndex="-1"
                onFocus={() => this.setState({ boldActive: true })}
                onBlur={() => this.setState({ boldActive: false })}>bold text</b></p>
            <p>
              <input type="checkbox" checked={!this.state.italicDisabled} onChange={(e) => this.setState({ italicDisabled: !e.target.checked })}/>
              <i
                tabIndex="-1"
                onFocus={() => this.setState({ italicActive: true })}
                onBlur={() => this.setState({ italicActive: false })}>italic text</i></p>
            <p>
              <input type="checkbox" checked={!this.state.underlineDisabled} onChange={(e) => this.setState({ underlineDisabled: !e.target.checked })}/>
              <u
                tabIndex="-1"
                onFocus={() => this.setState({ underlineActive: true })}
                onBlur={() => this.setState({ underlineActive: false })}>underline text</u></p>
          </div>
        );
      }
    }

    return <Demo />
  })
  .add('ProseMirror', () => (
    <Toolbar>
      <ToolbarButton><IconBold /></ToolbarButton>
    </Toolbar>
  ));
