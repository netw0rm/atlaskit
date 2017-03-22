import '!style!css!less!./cq-styles.less';
import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent } from 'react';
import Editor from '../src';
import { name, version } from '../package.json';
import { storyDecorator } from '@atlaskit/editor-core/dist/es5/test-helper';

const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('Empty', () =>
    <Editor
      isExpandedByDefault
      onCancel={CANCEL_ACTION}
      onSave={SAVE_ACTION}
    />
  )
  .add('CXHTML preview', () => {
    type Props = {};
    type State = { cxhtml?: string };
    class Demo extends PureComponent<Props, State> {
      state = { cxhtml: '' };

      handleChange = (editor: Editor) => {
        this.setState({ cxhtml: editor.value });
      }

      render() {
        return (
          <div ref="root">
            <Editor
              isExpandedByDefault
              onCancel={CANCEL_ACTION}
              onChange={this.handleChange}
              onSave={SAVE_ACTION}
            />
            <fieldset style={{ marginTop: 20 }}>
              <legend>CXHTML</legend>
              <pre>{this.state.cxhtml || ''}</pre>
            </fieldset>
          </div>
        );
      }
    }

    return <Demo />;
  });
