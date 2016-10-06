import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Popup from '../src/index';
import React from 'react';
import { name } from '../package.json';
import 'style!./../src/host.less';
import EditorButtonComponent from 'ak-editor-button';
import IconComponent from 'ak-editor-icon';
import ToolbarComponent from 'ak-editor-toolbar';

const Component = reactify(Popup);

const EditorButton = reactify(EditorButtonComponent);

const Icon = reactify(IconComponent);

const Toolbar = reactify(ToolbarComponent);

const marginLeft = 5;

storiesOf(name, module)
  .add('a simple ak-editor-popup', () => (
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
  .add('a "real" editor popup', () => (
    <Component open>
      <EditorButton><Icon glyph="unlink" fill="white" style={{ marginLeft }} /></EditorButton>
      <EditorButton><Icon glyph="open" fill="white" style={{ marginLeft }} /></EditorButton>
      <div style={{ height: '100%', width: 1, background: 'lightgrey', marginLeft }} />
      <input style={{ marginLeft }} />
    </Component>
  ))
  .add('a "real" editor popup targeting to link button', () => {
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
          <div onClick={this.handleClick}>
            <Toolbar>
              <EditorButton
                className="link-button"
                style={{ position: 'absolute', left: 200 }}
              ><Icon glyph="link" /></EditorButton>
            </Toolbar>
            <Component
              target=".link-button"
              open={this.state.open}
              className="ak-editor-popup"
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
