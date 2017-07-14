import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import { defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers/dist/es5/contextProvider';
import { defaultCollectionName } from '@atlaskit/media-test-helpers/dist/es5/collectionNames';
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers/dist/es5/tokenProvider';

import Editor from './editor';
import { name, version } from '../package.json';
import { storyMediaProviderFactory, storyDecorator } from '../src/test-helper';

const mediaTestHelpers = {
  defaultClientId,
  defaultServiceHost,
  defaultCollectionName,
  StoryBookTokenProvider,
};

type State = { dropzoneRef?: HTMLElement };

class DemoEditor extends React.PureComponent<any, State> {
  state: State = {};

  private handleDropzoneRef = (ref) => {
    this.setState({ dropzoneRef: ref });
  }

  render() {
    const { dropzoneRef } = this.state;
    const editor = !dropzoneRef ? null : <Editor
      mediaProvider={storyMediaProviderFactory(mediaTestHelpers, undefined, undefined, undefined, dropzoneRef)}
      isExpandedByDefault={true}
      devTools={true}
    />;

    return (
      <div>
        <div ref={this.handleDropzoneRef} style={{ background: '#172B4D', height: 80, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '10px', borderRadius: '25px' }}>
          <h4 style={{ textAlign: 'center', color: '#FFF' }}>Drag and Drop files here</h4>
        </div>
        {editor}
      </div>
    );
  }
}

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('Editors w/ custom dropzone', () => (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '10px' }}>
        <DemoEditor />
      </div>
      <div style={{  }}>
        <DemoEditor />
      </div>
    </div>
  ))
;
