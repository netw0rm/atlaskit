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
          selectedFont: 'paragraph',
        };
      }

      componentDidMount() {
        const doc = schema.node('doc', null,
          [schema.node('heading',
            { level: 2 },
            schema.text('1')
          ),

          schema.node('paragraph',
            null,
            schema.text('4')
          ),

          schema.node('code_block',
            null,
            schema.text('7')
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

          if (name === 'paragraph') {
            this.setState({
              selectedFont: name,
            });
          } else if (name === 'code_block') {
            this.setState({
              selectedFont: 'monospace',
            });
          } else {
            this.setState({
              selectedFont: name + (node.attrs.level - 1),
            });
          }
        });
      }

      render() {
        return (
          <div ref={(elem) => elem && (this.editorElement = elem.firstChild.nextSibling)}>
            <Toolbar>
              <BlockType
                selectedFont={this.state.selectedFont}
                onSelectFont={(event) => {
                  this.pm.on.interaction.dispatch();
                  const font = event.detail.font;
                  if (font === 'paragraph') {
                    commands.setBlockType(schema.nodes.paragraph)(this.pm);
                  } else if (font === 'monospace') {
                    commands.setBlockType(schema.nodes.code_block)(this.pm);
                  } else {
                    const level = Number(font[font.length - 1]) + 1;
                    commands.setBlockType(
                      schema.nodes[font.substring(0, font.length - 1)],
                      { level }
                    )(this.pm);
                  }
                  // todo: put cursor back to the position?
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
