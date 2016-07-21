import { storiesOf } from '@kadira/storybook';
import ToolbarComponent from '../src';
import TextFormattingComponent from 'ak-editor-toolbar-text-formatting';
import ContentComponent from 'ak-editor-content';
import { vdom } from 'skatejs'; // eslint-disable-line no-unused-vars
const { React, ReactDOM } = window;
import reactify from 'akutil-react';

import { ProseMirror, commands } from 'prosemirror/dist/edit';
import { schema } from 'prosemirror/dist/schema-basic';

const Toolbar = reactify(ToolbarComponent, { React, ReactDOM });
const TextFormatting = reactify(TextFormattingComponent, { React, ReactDOM });
const Content = reactify(ContentComponent, { React, ReactDOM });

storiesOf('ak-editor-toolbar', module)
  .add('ProseMirror', () => {
    class Demo extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          boldActive: false,
          italicActive: false,
        };
      }

      componentDidMount() {
        const doc = schema.node('doc', null,
          schema.node('paragraph', null,
            schema.text('Hello world!')
          )
        );

        const pm = this.pm = new ProseMirror({
          place: this.editorElement,
          doc,
          plugins: [],
        });

        pm.updateScheduler([
          pm.on.selectionChange,
          pm.on.change,
          pm.on.activeMarkChange,
        ], () => this.syncStateFromEditor());
      }

      syncStateFromEditor() {
        const markActive = (pm, type) => {
          const { from, to, empty } = pm.selection;
          if (empty) return type.isInSet(pm.activeMarks());
          return pm.doc.rangeHasMark(from, to, type);
        };

        this.setState({
          boldActive: !!markActive(this.pm, schema.marks.strong),
          italicActive: !!markActive(this.pm, schema.marks.em),
        });
      }

      render() {
        return (
          <div ref={(elem) => elem && (this.editorElement = elem.firstChild.nextSibling)}>
            <Toolbar>
              <TextFormatting
                boldActive={this.state.boldActive}
                italicActive={this.state.italicActive}
                boldDisabled={this.state.boldDisabled}
                italicDisabled={this.state.italicDisabled}
                underlineDisabled
                ontoggle-bold={() => this.toggleMark('strong')}
                ontoggle-italic={() => this.toggleMark('em')}
              />
            </Toolbar>
            <Content openTop />
          </div>
        );
      }

      toggleMark(name) {
        this.pm.on.interaction.dispatch();
        commands.toggleMark(schema.marks[name])(this.pm);
      }
    }

    return <Demo />;
  });
