import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';

import Editor from './../src/editor';
import EditorContext from './../src/editor/ui/EditorContext';
import getPropsPreset from './../src/editor/create-editor/get-props-preset';
import ToolsDrawer from './ToolsDrawer';
import { name, version } from '../package.json';
import { storyDecorator } from '../src/test-helper';
import { Addon, AddonConfiguration } from '../src/editor/ui/Addon';
import DocumentIcon from '@atlaskit/icon/glyph/document';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import styled from 'styled-components';

const SAVE_ACTION = () => action('Save')();
const analyticsHandler = (actionName, props) => action(actionName)(props);

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('Message Editor', () =>
    <ToolsDrawer
      // tslint:disable-next-line:jsx-no-lambda
      renderEditor={({mentionProvider, emojiProvider, mediaProvider, onChange}) =>
        <Editor
          {...getPropsPreset('message')}

          analyticsHandler={analyticsHandler}
          maxHeight={305}

          mentionProvider={mentionProvider}
          emojiProvider={emojiProvider}
          mediaProvider={mediaProvider}

          onChange={onChange}
          onSave={SAVE_ACTION}
        />}
    />)
  .add('Message Editor with Addons', () => {
    // tslint:disable-next-line:variable-name
    const AddonComponentExample = styled.div`
      background: #ff0088;
      border-radius: 5px;
      padding: 20px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      color: white;

      > button {
        padding: 6px 10px;
        margin: 8px auto 0;
        width: 50%;
      }
    `;

    /**
     * List of addon configuration objects
     */
    const addonConfigs: AddonConfiguration[] = [
      {
        text: 'Item one',
        icon: <DocumentIcon label="Item 1" />,
        renderOnClick: (editorActions, closePopup) => (
          <AddonComponentExample>
            Rendered on click
            <button onClick={closePopup}>close</button>
          </AddonComponentExample>
        )
      },
      {
        text: 'Item two',
        icon: <AtlassianIcon label="Item 2" />,
        actionOnClick: editorActions => editorActions.clear()
      }
    ];

    const addons = addonConfigs.map(({ text, icon, actionOnClick, renderOnClick }, i) => (
      <Addon key={i} icon={icon} actionOnClick={actionOnClick} renderOnClick={renderOnClick}>
        {text}
      </Addon>
    ));

    return (
      <EditorContext>
        <ToolsDrawer
          // tslint:disable-next-line:jsx-no-lambda
          renderEditor={({mentionProvider, emojiProvider, mediaProvider, onChange}) =>
            <Editor
              appearance="message"
              analyticsHandler={analyticsHandler}

              allowTextFormatting={true}
              allowTasksAndDecisions={true}
              allowHyperlinks={true}
              allowCodeBlocks={true}

              saveOnEnter={true}

              mentionProvider={mentionProvider}
              emojiProvider={emojiProvider}
              mediaProvider={mediaProvider}

              onChange={onChange}
              onSave={SAVE_ACTION}

              addonToolbarComponents={addons}
            />}
        />
      </EditorContext>
    );
  })
  .add('Tray Editor with Max Length', () =>
    <Editor
      appearance="message"
      saveOnEnter={true}
      maxContentSize={10}
    />);
