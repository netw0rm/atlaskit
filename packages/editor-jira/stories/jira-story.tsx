import { action, storiesOf } from '@kadira/storybook';
import { storyDecorator } from '@atlaskit/editor-core/dist/es5/test-helper';
import InlineEdit from '@atlaskit/inline-edit';
import * as React from 'react';
import { PureComponent } from 'react';
import { name, version } from '../package.json';
import Editor, { Props } from '../src';
import MentionResource from './mentions/mention-resource';

const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();

type State = { html?: string };
class Demo extends PureComponent<Props, State> {
  state = {} as State;

  render() {
    return (
      <div>
        <Editor
          onCancel={CANCEL_ACTION}
          onChange={this.updateHTML}
          onSave={SAVE_ACTION}
          {...this.props}
        />
        <fieldset style={{ marginTop: 20 }}>
          <legend>HTML</legend>
          <pre>{this.state.html}</pre>
        </fieldset>
      </div>
    );
  }

  updateHTML = (editor: Editor) => {
    this.setState({ html: editor.value });
  }
}

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('Editor', () => <Demo />)
  .add('Editor (allowLists)', () => <Demo allowLists={true} />)
  .add('Editor (allowLinks)', () => <Demo allowLinks={true} />)
  .add('Editor (allowAdvancedTextFormatting)', () => <Demo allowAdvancedTextFormatting={true} />)
  .add('Editor (allowSubSup)', () => <Demo allowSubSup={true} />)
  .add('Editor (allowCodeBlock)', () => <Demo allowCodeBlock={true} />)
  .add('Editor (allowBlockQuote)', () => <Demo allowBlockQuote={true} />)
  .add('Editor (Mentions)', () =>
    <Demo
      mentionProvider={Promise.resolve(new MentionResource())}
      // tslint:disable-next-line:jsx-no-lambda
      mentionEncoder={(userId: string) => `/secure/ViewProfile?name=${userId}`}
    />
  )
  .add('Editor with InlineEdit', () => {
    const fabricEditor = (
      <Editor
        isExpandedByDefault={true}
        allowLists={true}
        allowLinks={true}
        allowCodeBlock={true}
        allowAdvancedTextFormatting={true}
        allowSubSup={true}
        allowBlockQuote={true}
        defaultValue="Text"
      />
    );

    return (
      <InlineEdit
        areActionButtonsHidden={true}
        label="@atlaskit/editor-jira + @atlaskit/inline-edit"
        onCancel={action('onCancel')}
        onConfirm={action('onConfirm')}
        editView={<div style={{ flexGrow: 1 }}>{fabricEditor}</div>}
        readView={<div>Click me!</div>}
      />
    );
  })
  .add('Editor (All flags)', () =>
    <Demo
      allowLists={true}
      allowLinks={true}
      allowCodeBlock={true}
      allowAdvancedTextFormatting={true}
      allowSubSup={true}
      allowBlockQuote={true}
      mentionProvider={Promise.resolve(new MentionResource())}
      // tslint:disable-next-line:jsx-no-lambda
      mentionEncoder={(userId: string) => `/secure/ViewProfile?name=${userId}`}
    />
  );
