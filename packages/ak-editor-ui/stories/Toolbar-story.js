import { storiesOf } from '@kadira/storybook';
import BoldIconComponent from 'ak-icon/glyph/editor/bold';
import AtlassianIconComponent from 'ak-icon/glyph/atlassian';
import ArrowLeftIconComponent from 'ak-icon/glyph/arrowleft';
import ArrowRightIconComponent from 'ak-icon/glyph/arrowright';
import React from 'react';
import reactify from 'akutil-react';
import { ProseMirror, commands, schema } from 'ak-editor-prosemirror';
import ButtonComponent from '../src/Button';
import ContentComponent from '../src/Content';
import ToolbarComponent from '../src/Toolbar';
import TextFormattingComponent from '../src/ToolbarTextFormatting';

const Toolbar = reactify(ToolbarComponent);
const Button = reactify(ButtonComponent);
const BoldIcon = reactify(BoldIconComponent);
const ArrowLeftIcon = reactify(ArrowLeftIconComponent);
const ArrowRightIcon = reactify(ArrowRightIconComponent);
const AtlassianIcon = reactify(AtlassianIconComponent);
const TextFormatting = reactify(TextFormattingComponent);
const Content = reactify(ContentComponent);

storiesOf('ak-editor-ui Toolbar', module)
  .add('Button alignment', () => (
    <div style={{ 'max-width': '500px' }}>
      <style>{' p { text-align: center} '}</style>
      <p>Left (default)</p>
      <Toolbar>
        <Button><AtlassianIcon /></Button>
        <Button><ArrowLeftIcon /></Button>
        <Button><ArrowLeftIcon /></Button>
      </Toolbar>
      <p>Right (&lt;spacer&gt; at the beginning)</p>
      <Toolbar>
        <spacer />
        <Button><ArrowRightIcon /></Button>
        <Button><ArrowRightIcon /></Button>
        <Button><AtlassianIcon /></Button>
      </Toolbar>
      <p>Center (&lt;spacer&gt; on each side)</p>
      <Toolbar>
        <spacer />
        <Button><ArrowRightIcon /></Button>
        <Button><AtlassianIcon /></Button>
        <Button><ArrowLeftIcon /></Button>
        <spacer />
      </Toolbar>
      <p>Left and right (&lt;spacer&gt; between)</p>
      <Toolbar>
        <Button><AtlassianIcon /></Button>
        <Button><ArrowLeftIcon /></Button>
        <Button><ArrowLeftIcon /></Button>
        <spacer />
        <Button><ArrowRightIcon /></Button>
        <Button><ArrowRightIcon /></Button>
        <Button><AtlassianIcon /></Button>
      </Toolbar>
      <p>Left, right and center (2 spacers)</p>
      <Toolbar>
        <Button><AtlassianIcon /></Button>
        <Button><ArrowLeftIcon /></Button>
        <Button><ArrowLeftIcon /></Button>
        <spacer />
        <Button><ArrowRightIcon /></Button>
        <Button><AtlassianIcon /></Button>
        <Button><ArrowLeftIcon /></Button>
        <spacer />
        <Button><ArrowRightIcon /></Button>
        <Button><ArrowRightIcon /></Button>
        <Button><AtlassianIcon /></Button>
      </Toolbar>
    </div>
  ))
  .add('ProseMirror', () => {
    const markActive = (pm, type) => {
      const { from, to, empty } = pm.selection;
      if (empty) return type.isInSet(pm.activeMarks());
      return pm.doc.rangeHasMark(from, to, type);
    };

    class Demo extends React.PureComponent {
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
  })
  .add('Text formatting buttons', () => (
    <Toolbar>
      <TextFormatting />
    </Toolbar>
  ))
  .add('Empty toolbar', () => (
    <Toolbar />
  ))
  .add('Single button', () => (
    <Toolbar>
      <Button><BoldIcon /></Button>
    </Toolbar>
  ))
;
