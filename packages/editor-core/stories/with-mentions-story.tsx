import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent } from 'react';
import Editor from './editor';
import * as styles from './styles';
import { base64fileconverter } from '../src/test-helper';
import { name } from '../package.json';
import { resourceProvider, resourceProvider2 } from './mentions/story-data';

const { Converter, dropHandler, pasteHandler } = base64fileconverter;
const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();
const converter = new Converter(['jpg', 'jpeg', 'png', 'gif', 'svg'], 10000000);

const imageUploadHandler = (e: any, fn: any) => {
  if (e instanceof ClipboardEvent) {
    pasteHandler(converter, e, fn);
  } else if (e instanceof DragEvent) {
    dropHandler(converter, e, fn);
  } else {
    // we cannot trigger a real file viewer from here
    // so we just simulate a succesful image upload and insert an image
    fn({
      src: 'https://design.atlassian.com/images/brand/logo-21.png'
    });
  }
};


const mentionProvider = new Promise<any>(resolve => {
  resolve(resourceProvider);
});

const mentionProvider2 = new Promise<any>(resolve => {
  resolve(resourceProvider2);
});

class DemoEditor extends PureComponent<{}, { provider: Promise<any> }> {

  constructor(props) {
    super(props);

    this.state = {
      provider: mentionProvider
    };
  }

  private toggleProvider = () => {
    const { provider } = this.state;
    if (provider === mentionProvider) {
      this.setState({
        provider: mentionProvider2
      });
    } else {
      this.setState({
        provider: mentionProvider
      });
    }
  }

  render() {
    const { provider } = this.state;
    return (
      <div>
        <Editor
          imageUploadHandler={imageUploadHandler}
          onCancel={CANCEL_ACTION}
          onSave={SAVE_ACTION}
          mentionProvider={provider}
          isExpandedByDefault
        />
        <div>
          <br />
          <button onClick={this.toggleProvider}>Toggle provider</button>
          {`Provider: ${provider === mentionProvider ? '1' : '2'}`}
        </div>
      </div>
    );
  }
}

storiesOf(name, module)
  .add('With mentions', () => (
    <div className={styles.content} >
      <DemoEditor />
    </div>
  ));
