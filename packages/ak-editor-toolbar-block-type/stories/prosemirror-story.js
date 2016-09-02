import { storiesOf } from '@kadira/storybook';
import ToolbarComponent from 'ak-editor-toolbar';
import BlockTypeComponent from '../src';
import ContentComponent from 'ak-editor-content';
import { vdom } from 'skatejs'; // eslint-disable-line no-unused-vars
const { React, ReactDOM } = window;
import reactify from 'akutil-react';
import invert from 'lodash.invert';

import { ProseMirror, schema } from 'ak-editor-prosemirror';
import BlockTypePlugin from 'ak-editor-plugin-block-type';

const Toolbar = reactify(ToolbarComponent, { React, ReactDOM });
const BlockType = reactify(BlockTypeComponent, { React, ReactDOM });
const Content = reactify(ContentComponent, { React, ReactDOM });

const prosemirrorBlockToToolbarMap = {
  paragraph: 'normalText',
  // heading 1 (displayed in the blockType button) is actually heading 2
  // heading 1 is reserved and not used in the editor
  heading2: 'heading1',
  heading3: 'heading2',
  heading4: 'heading3',
  code_block: 'monospace',
};

const toolbarToProsemirrorMap = invert(prosemirrorBlockToToolbarMap);

storiesOf('ak-editor-toolbar-block-type', module)
  .add('ProseMirror', () => {
    class Demo extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          selectedFont: 'normalText',
          canChangeBlockType: false,
        };
      }

      componentDidMount() {
        const doc = schema.node('doc', null,
          [schema.node('heading',
            { level: 2 },
            schema.text('Title')
          ),

          schema.node('paragraph',
            null,
            schema.text('Normal text')
          ),

          schema.node('code_block',
            null,
            schema.text('var a = 1;')
          )]
        );

        this.pm = new ProseMirror({ // eslint-disable-line
          place: this.editorElement,
          doc,
          plugins: [
            BlockTypePlugin,
          ],
        });

        BlockTypePlugin.get(this.pm).onChange(state => {
          const name = state.selectedBlockType;
          const blockType = prosemirrorBlockToToolbarMap[name];

          this.setState({
            selectedFont: blockType,
            canChangeBlockType: state.enabled,
          });
        });
      }

      render() {
        return (
          <div ref={(elem) => elem && (this.editorElement = elem.firstChild.nextSibling)}>
            <Toolbar>
              <BlockType
                disabled={!this.state.canChangeBlockType}
                selectedFont={this.state.selectedFont}
                onSelectFont={(event) => {
                  const font = event.detail.font;

                  const matches = toolbarToProsemirrorMap[font].match(/([a-zA-Z_]+)(\d*)/);
                  const blockType = matches[1];
                  const level = matches[2];

                  BlockTypePlugin.get(this.pm).changeBlockType(blockType, { level });
                }}
              />
            </Toolbar>
            <Content />
          </div>
        );
      }
    }

    return <Demo />;
  });
