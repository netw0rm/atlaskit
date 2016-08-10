import { storiesOf } from '@kadira/storybook';
import ToolbarComponent from 'ak-editor-toolbar';
import BlockTypeComponent from '../src';
import ContentComponent from 'ak-editor-content';
import { vdom } from 'skatejs'; // eslint-disable-line no-unused-vars
const { React, ReactDOM } = window;
import reactify from 'akutil-react';

import { ProseMirror, commands } from 'prosemirror/dist/edit';
import { schema } from 'prosemirror/dist/schema-basic';

const Toolbar = reactify(ToolbarComponent, { React, ReactDOM });
const BlockType = reactify(BlockTypeComponent, { React, ReactDOM });
const Content = reactify(ContentComponent, { React, ReactDOM });

function getSelectionNodes({ from, to }, content) {
  let count = 0;
  const nodes = [];

  for (let index = 0; index < content.length; index++) {
    const node = content[index];
    const size = node.content.size;

    // first position is 1, another 1 for eof, hense +2
    count += size + 2;

    if (from < count) {
      nodes.push(node);
    }

    if (to < count) {
      break;
    }
  }

  return nodes;
}

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

        const pm = this.pm = new ProseMirror({
          place: this.editorElement,
          doc,
          plugins: [],
        });

        pm.updateScheduler([
          pm.on.selectionChange,
          pm.on.change,
        ], () => {
          const nodes = getSelectionNodes(pm.selection, pm.doc.content.content);
          const node = nodes[0];
          const name = node.type.name;
          let blockType;

          if (name === 'paragraph') {
            blockType = 'normalText';
          } else if (name === 'code_block') {
            blockType = 'monospace';
          } else {
            // heading 1 (displayed in the blockType button) is actually heading 2
            // heading 1 is reserved and not used in the editor
            blockType = name + (node.attrs.level - 1);
          }

          // we can get away by not checking all the types since the dropdown get
          // enabled as a group intead of per option
          const canChangeBlockType = [
            'code_block',
            'paragraph',
          ].some((type) => commands.setBlockType(schema.nodes[type])(pm, false));

          this.setState({
            selectedFont: blockType,
            canChangeBlockType,
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
                  this.pm.on.interaction.dispatch();
                  const font = event.detail.font;
                  if (font === 'normalText') {
                    commands.setBlockType(schema.nodes.paragraph)(this.pm);
                  } else if (font === 'monospace') {
                    commands.setBlockType(schema.nodes.code_block)(this.pm);
                  } else {
                    // heading 1 (displayed in the blockType button) is actually heading 2
                    // heading 1 is reserved and not used in the editor
                    const level = Number(font[font.length - 1]) + 1;
                    commands.setBlockType(
                      schema.nodes[font.substring(0, font.length - 1)],
                      { level }
                    )(this.pm);
                  }
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
