import * as React from 'react';
import { PureComponent } from 'react';
import Editor from '../../editor';
import EditorContext from '../../editor/ui/EditorContext';
import WithEditorActions from '../../editor/ui/WithEditorActions';

export interface Props {
  onSubmit: (content: string) => void;
}

export default class InlineComment extends PureComponent<Props, {}> {

  private onSave = (actions) => () => this.props.onSubmit(actions);

  private renderEditorWithActions = (actions) => (
    <Editor
      appearance="message"
      saveOnEnter={true}
      onSave={this.onSave(actions)}
      placeholder="Add a comment..."
    />
  )

  render() {
    return (
      <EditorContext>
        <WithEditorActions render={this.renderEditorWithActions} />
      </EditorContext>
    );
  }
}
