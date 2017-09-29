import * as React from 'react';
import { PureComponent } from 'react';
import Editor from '../../editor';
import EditorContext from '../../editor/ui/EditorContext';

export interface Props {
  onSubmit: (content: string) => void;
}

export default class InlineComment extends PureComponent<Props, {}> {
  render() {
    return (
      <EditorContext>
        <Editor appearance="message" saveOnEnter={true} placeholder="Add a comment..." />
      </EditorContext>
    );
  }
}
