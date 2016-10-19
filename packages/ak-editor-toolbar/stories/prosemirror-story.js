import { storiesOf } from '@kadira/storybook';
import TextFormattingComponent from 'ak-editor-toolbar-text-formatting';
import ContentComponent from 'ak-editor-content';
import React from 'react';
import reactify from 'akutil-react';
import { ProseMirror, commands, schema } from 'ak-editor-prosemirror';

import ToolbarComponent from '../src';


const Toolbar = reactify(ToolbarComponent);
const TextFormatting = reactify(TextFormattingComponent);
const Content = reactify(ContentComponent);

storiesOf('ak-editor-toolbar', module)
  .add('ProseMirror', () => {
    const markActive = (pm, type) => {
      const { from, to, empty } = pm.selection;
      if (empty) return type.isInSet(pm.activeMarks());
      return pm.doc.rangeHasMark(from, to, type);
    };

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
        ], () => this.setState({
          boldActive: !!markActive(pm, schema.marks.strong),
          italicActive: !!markActive(pm, schema.marks.em),
        }));
      }

      toggleMark(name) {
        this.pm.on.interaction.dispatch();
        commands.toggleMark(schema.marks[name])(this.pm);
      }

      render() {
        return (
          <div ref={elem => elem && (this.editorElement = elem.firstChild.nextSibling)}>
            <Toolbar>
              <TextFormatting
                boldActive={this.state.boldActive}
                italicActive={this.state.italicActive}
                underlineDisabled
                ontoggle-bold={() => this.toggleMark('strong')}
                ontoggle-italic={() => this.toggleMark('em')}
              />
            </Toolbar>
            <Content openTop />
          </div>
        );
      }
    }

    return <Demo />;
  });
