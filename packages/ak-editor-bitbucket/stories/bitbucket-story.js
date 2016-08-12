import { storiesOf, action } from '@kadira/storybook';
import BitbucketComponent from '../src';
import reactify from 'akutil-react';
import { vdom } from 'skatejs';
const { React, ReactDOM } = window;

const Bitbucket = reactify(BitbucketComponent, { React, ReactDOM });

storiesOf('ak-editor-bitbucket', module)
  .add('Empty', () => (
    <Bitbucket />
  ))
  .add('With default value', () => (
    <Bitbucket defaultValue="What do you want to say?" />
  ))
  .add('Events', () => (
    <Bitbucket
      onChange={action('change')}
      onReady={action('ready')}
      onSave={action('save')}
      onCancel={action('cancel')}
    />
  ))
  .add('Markdown preview', () => {
    class Demo extends React.Component {
      constructor() {
        super();
        this.state = { markdown: '' };
        this.updateMarkdown = this.updateMarkdown.bind(this);
      }

      updateMarkdown(e) {
        this.setState({ markdown: e.target.value });
      }

      render() {
        return (
          <div ref="root">
            <Bitbucket
              defaultValue="What do you want to say?"
              onChange={this.updateMarkdown}
              onReady={this.updateMarkdown}
            />
            <fieldset style={{ marginTop: 20 }}>
              <legend>Markdown</legend>
              <pre>{this.state.markdown}</pre>
            </fieldset>
          </div>
        );
      }
    }

    return <Demo />;
  });
