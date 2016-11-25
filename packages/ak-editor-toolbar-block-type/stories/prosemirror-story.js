import { storiesOf } from '@kadira/storybook';
import ToolbarComponent from 'ak-editor-toolbar';
import ContentComponent from 'ak-editor-content';
import React from 'react';
import reactify from 'akutil-react';
import invert from 'lodash.invert';
import { ProseMirror, schema } from 'ak-editor-prosemirror';
import BlockTypePlugin from 'ak-editor-plugin-block-type';

import BlockTypeComponent from '../src';

const Toolbar = reactify(ToolbarComponent);
const BlockType = reactify(BlockTypeComponent);
const Content = reactify(ContentComponent);

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
    class Demo extends React.PureComponent {
      constructor(props) {
        super(props);
        this.state = {
          selectedBlockType: 'normalText',
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

        BlockTypePlugin.get(this.pm).onChange((state) => {
          const name = state.selectedBlockType;
          const blockType = prosemirrorBlockToToolbarMap[name];

          this.setState({
            selectedBlockType: blockType,
            canChangeBlockType: state.enabled,
          });
        });
      }

      render() {
        return (
          <div ref={elem => elem && (this.editorElement = elem.firstChild.nextSibling)}>
            <Toolbar>
              <BlockType
                disabled={!this.state.canChangeBlockType}
                selectedBlockType={this.state.selectedBlockType}
                onSelectBlockType={(event) => {
                  const selected = event.detail.blockType;

                  const matches = toolbarToProsemirrorMap[selected].match(/([a-zA-Z_]+)(\d*)/);
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
