import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import React from 'react';
import LinkEditorIcon from 'ak-icon/glyph/editor/link';
import UnlinkEditorIcon from 'ak-icon/glyph/editor/unlink';
import OpenEditorIcon from 'ak-icon/glyph/editor/open';
import EditorButtonComponent from '../src/Button';
import PopupComponent from '../src/Popup';
import ToolbarComponent from '../src/Toolbar';

const Popup = reactify(PopupComponent);
const EditorButton = reactify(EditorButtonComponent);
const LinkIcon = reactify(LinkEditorIcon);
const UnlinkIcon = reactify(UnlinkEditorIcon);
const OpenIcon = reactify(OpenEditorIcon);
const Toolbar = reactify(ToolbarComponent);

const marginLeft = 5;

storiesOf('ak-editor-ui Popup', module)
  .add('a simple ak-editor-popup', () => (
    <Popup open />
  ))
  .add('with one button', () => (
    <Popup open>
      <EditorButton><LinkIcon style={{ color: 'white' }} /></EditorButton>
    </Popup>
  ))
  .add('with two buttons', () => (
    <Popup open>
      <EditorButton><UnlinkIcon style={{ color: 'white' }} /></EditorButton>
      <EditorButton><OpenIcon style={{ color: 'white' }} /></EditorButton>
    </Popup>
  ))
  .add('with two buttons and a input', () => (
    <Popup open>
      <EditorButton><UnlinkIcon style={{ color: 'white' }} /></EditorButton>
      <EditorButton><OpenIcon style={{ color: 'white' }} /></EditorButton>
      <input />
    </Popup>
  ))
  .add('a "real" editor popup', () => (
    <Popup open>
      <EditorButton><UnlinkIcon style={{ marginLeft, color: 'white' }} /></EditorButton>
      <EditorButton><OpenIcon style={{ marginLeft, color: 'white' }} /></EditorButton>
      <div style={{ height: '100%', width: 1, background: 'lightgrey', marginLeft }} />
      <input style={{ marginLeft }} />
    </Popup>
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
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div onClick={this.handleClick}>
            <Toolbar>
              <EditorButton
                className="link-button"
                style={{ position: 'absolute', left: 200 }}
              ><LinkIcon /></EditorButton>
            </Toolbar>
            <Popup
              target=".link-button"
              open={this.state.open}
              className="ak-editor-popup"
            >
              <EditorButton>
                <UnlinkIcon fill="white" style={{ marginLeft, color: 'white' }} />
              </EditorButton>
              <EditorButton>
                <OpenIcon fill="white" style={{ marginLeft }} />
              </EditorButton>
              <div style={{ height: '100%', width: 1, background: 'lightgrey', marginLeft }} />
              <input style={{ marginLeft }} />
            </Popup>
          </div>
        );
      }
    }

    LinkButtonInToolbar.propTypes = {
      event: React.PropTypes.string,
    };

    return <LinkButtonInToolbar />;
  });
