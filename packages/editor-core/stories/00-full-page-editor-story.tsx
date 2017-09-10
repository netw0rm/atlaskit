import styled from 'styled-components';
import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';
import { akColorN80 } from '@atlaskit/util-shared-styles';

import Editor from './../src/editor';
import EditorContext from './../src/editor/ui/EditorContext';
import WithEditorActions from './../src/editor/ui/WithEditorActions';
import { name } from '../package.json';
import { storyMediaProviderFactory } from '../src/test-helper';
import { defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers/dist/es5/contextProvider';
import { defaultCollectionName } from '@atlaskit/media-test-helpers/dist/es5/collectionNames';
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers/dist/es5/tokenProvider';
import { storyData as mentionStoryData } from '@atlaskit/mention/dist/es5/support';
import { storyData as emojiStoryData } from '@atlaskit/emoji/dist/es5/support';
import { MockActivityResource } from '@atlaskit/activity/dist/es5/support';
import { ConfluenceTransformer } from '../';

import {
  akEditorCodeBackground,
  akEditorCodeBlockPadding,
  akEditorCodeFontFamily,
} from '../src/styles';

import { akBorderRadius } from 'akutil-shared-styles';

const mediaTestHelpers = {
  defaultClientId,
  defaultServiceHost,
  defaultCollectionName,
  StoryBookTokenProvider,
};

// tslint:disable-next-line:variable-name
export const TitleInput = styled.input`
  border: none;
  outline: none;
  font-size: 2.07142857em;
  margin: 0 0 21px;
  padding: 0;

  &::placeholder {
    color: ${akColorN80};
  }
`;
TitleInput.displayName = 'TitleInput';

// tslint:disable-next-line:variable-name
export const Content = styled.div`
  padding: 0 20px;
  height: 100%;
  background: #fff;
  box-sizing: border-box;

  & .ProseMirror {
    & pre {
      font-family: ${akEditorCodeFontFamily};
      background: ${akEditorCodeBackground};
      padding: ${akEditorCodeBlockPadding};
      border-radius: ${akBorderRadius};
    }
  }
}`;
Content.displayName = 'Content';

const analyticsHandler = (actionName, props) => action(actionName)(props);

// tslint:disable-next-line:variable-name
const SaveAndCancelButtons = props => (
  <ButtonGroup>
    <Button
      appearance="primary"
      // tslint:disable-next-line:jsx-no-lambda no-console
      onClick={() => props.editorActions.getValue().then(value => console.log(value.toJSON()))}
    >
      Publish
    </Button>
    <Button
      appearance="subtle"
      // tslint:disable-next-line:jsx-no-lambda
      onClick={() => props.editorActions.clear()}
    >
      Close
    </Button>
  </ButtonGroup>
);

storiesOf(name, module)
  .add('Full Page Editor', () =>
    <Content>
      <EditorContext>
        <Editor
          appearance="full-page"
          analyticsHandler={analyticsHandler}

          allowTextFormatting={true}
          allowTasksAndDecisions={true}
          allowHyperlinks={true}
          allowCodeBlocks={true}
          allowLists={true}
          allowTextColor={true}
          allowTables={true}
          allowJiraIssue={true}
          allowUnsupportedContent={true}

          mediaProvider={storyMediaProviderFactory(mediaTestHelpers)}
          emojiProvider={emojiStoryData.getEmojiResource({ uploadSupported: true })}
          mentionProvider={Promise.resolve(mentionStoryData.resourceProvider)}
          activityProvider={Promise.resolve(new MockActivityResource())}
          // tslint:disable-next-line:jsx-no-lambda
          contentTransformerProvider={(schema) => new ConfluenceTransformer(schema)}

          placeholder="Write something..."
          shouldFocus={false}

          contentComponents={
            <TitleInput
              placeholder="Give this page a title..."
              // tslint:disable-next-line:jsx-no-lambda
              innerRef={ref => ref && ref.focus()}
            />
          }

          primaryToolbarComponents={
            <WithEditorActions
              // tslint:disable-next-line:jsx-no-lambda
              render={actions => <SaveAndCancelButtons editorActions={actions}/>}
            />
          }
        />
      </EditorContext>
    </Content>);
