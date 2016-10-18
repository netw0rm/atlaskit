import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import React from 'react';
import EditorButtonComponent from 'ak-editor-button';
import LinkEditorIcon from 'ak-icon/glyph/editor/link';
import UnlinkEditorIcon from 'ak-icon/glyph/editor/unlink';
import OpenEditorIcon from 'ak-icon/glyph/editor/open';
import ToolbarComponent from 'ak-editor-toolbar';

import 'style!./../src/host.less';

import Popup from '../src';
import { name } from '../package.json';


const Component = reactify(Popup);

const EditorButton = reactify(EditorButtonComponent);

const LinkIcon = reactify(LinkEditorIcon);
const UnlinkIcon = reactify(UnlinkEditorIcon);
const OpenIcon = reactify(OpenEditorIcon);

const Toolbar = reactify(ToolbarComponent);

const marginLeft = 5;

storiesOf(name, module)
  .add('a simple ak-editor-popup', () => (
    <Component open />
  ))
  .add('with one button', () => (
    <Component open>
      <EditorButton><LinkIcon style={{ color: 'white' }} /></EditorButton>
    </Component>
  ))
  .add('with two buttons', () => (
    <Component open>
      <EditorButton><UnlinkIcon style={{ color: 'white' }} /></EditorButton>
      <EditorButton><OpenIcon style={{ color: 'white' }} /></EditorButton>
    </Component>
  ))
  .add('with two buttons and a input', () => (
    <Component open>
      <EditorButton><UnlinkIcon style={{ color: 'white' }} /></EditorButton>
      <EditorButton><OpenIcon style={{ color: 'white' }} /></EditorButton>
      <input />
    </Component>
  ))
  .add('a "real" editor popup', () => (
    <Component open>
      <EditorButton><UnlinkIcon style={{ marginLeft, color: 'white' }} /></EditorButton>
      <EditorButton><OpenIcon style={{ marginLeft, color: 'white' }} /></EditorButton>
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
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div onClick={this.handleClick}>
            <Toolbar>
              <EditorButton
                className="link-button"
                style={{ position: 'absolute', left: 200 }}
              ><LinkIcon /></EditorButton>
            </Toolbar>
            <Component
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
