import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import HyperlinkPopup from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import 'style!./../src/host.less';
import EditorButtonComponent from 'ak-editor-button';
import IconComponent from 'ak-editor-icon';
import ToolbarComponent from 'ak-editor-toolbar';

const Component = reactify(HyperlinkPopup, {
  React,
  ReactDOM,
});

const EditorButton = reactify(EditorButtonComponent, {
  React,
  ReactDOM,
});

const Icon = reactify(IconComponent, {
  React,
  ReactDOM,
});

const Toolbar = reactify(ToolbarComponent, {
  React,
  ReactDOM,
});

const marginLeft = 5;

storiesOf(name, module)
  .add('a simple ak-hyperlink-popup', () => (
    <Component open />
  ))
  .add('with one button', () => (
    <Component open>
      <EditorButton><Icon glyph="unlink" fill="white" /></EditorButton>
    </Component>
  ))
  .add('with two buttons', () => (
    <Component open>
      <EditorButton><Icon glyph="unlink" fill="white" /></EditorButton>
      <EditorButton><Icon glyph="open" fill="white" /></EditorButton>
    </Component>
  ))
  .add('with two buttons and a input', () => (
    <Component open>
      <EditorButton><Icon glyph="unlink" fill="white" /></EditorButton>
      <EditorButton><Icon glyph="open" fill="white" /></EditorButton>
      <input />
    </Component>
  ))
  .add('a "real" hyperlink popup', () => (
    <Component open>
      <EditorButton><Icon glyph="unlink" fill="white" style={{ marginLeft }} /></EditorButton>
      <EditorButton><Icon glyph="open" fill="white" style={{ marginLeft }} /></EditorButton>
      <div style={{ height: '100%', width: 1, background: 'lightgrey', marginLeft }} />
      <input style={{ marginLeft }} />
    </Component>
  ))
  .add('a "real" hyperlink popup targeting to link button', () => {
    class LinkButtonInToolbar extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          open: false,
        };

        // Bind callback methods to make `this` the correct context.
        this.handleClick = this.handleClick.bind(this);
      }

      handleClick() {
        this.setState({ open: true });
      }

      render() {
        return (
          <div>
            <Toolbar>
              <EditorButton
                className="link-button"
                onClick={this.handleClick}
                style={{ position: 'absolute', left: 200 }}
              ><Icon glyph="link" /></EditorButton>
            </Toolbar>
            <Component
              target=".link-button"
              open={this.state.open}
              className="ak-editor-hyperlink-popup"
            >
              <EditorButton>
                <Icon glyph="unlink" fill="white" style={{ marginLeft }} />
              </EditorButton>
              <EditorButton>
                <Icon glyph="open" fill="white" style={{ marginLeft }} />
              </EditorButton>
              <div style={{ height: '100%', width: 1, background: 'lightgrey', marginLeft }} />
              <input style={{ marginLeft }} />
            </Component>
          </div>
        );
      }
    }

    LinkButtonInToolbar.propTypes = {
      event: React.PropTypes.string,
    };

    return <LinkButtonInToolbar />;
  });
