/*
 *
 *
 * PLEASE DO NOT REMOVE THIS STORY
 * IT'S USED FOR developer.atlassian.com documentation playground
 *
 *
 * */
import { storiesOf } from '@kadira/storybook';
import { storyData as emojiStoryData } from '@atlaskit/emoji/dist/es5/support';
import * as Ajv from 'ajv';
import * as React from 'react';
import { ChangeEvent, PureComponent } from 'react';

import * as v1schema from '../dist/json-schema/v1/full.json';
import ProviderFactory from '../src/providerFactory';
import Renderer from '../src/ui/Renderer';
import { name } from '../package.json';

interface State {
  value: string;
}

interface Props {
  document?: object
}

const defaultDocument = {
  type: 'doc',
  version: 1,
  content: [{
    type: 'paragraph',
    content: [{
      type: 'text',
      text: 'Hello world',
    }],
  }],
};

const providerFactory = new ProviderFactory();
providerFactory.setProvider('emojiProvider', emojiStoryData.getEmojiResource());

const ajv = new Ajv();
const validate = ajv.compile(v1schema);

class DACRenderer extends PureComponent<Props, State> {
  static defaultProps: Props = {
    document: defaultDocument
  };

  state: State = { value: JSON.stringify(this.props.document, null, 2) };

  private onChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ value: evt.target.value });
  }

  private getRendererContent() {
    const { value } = this.state;
    let json;

    try {
      json = JSON.parse(value);
    } catch (ex) {
      return (
        <span>This is invalid JSON.</span>
      );
    }

    if (!validate(json)) {
      return (
        <span>
          This JSON doesn't comply with Atlassian Document format.
          You can get the latest JSON schema <a href="https://unpkg.com/@atlaskit/editor-core@latest/dist/json-schema/v1/full.json">here</a>.
        </span>
      );
    }

    return (
      <Renderer
        document={json}
        dataProviders={providerFactory}
      />
    );
  }

  render() {
    const renderedContent = this.getRendererContent();

    return (
      <div>
        <textarea
          style={{
            boxSizing: 'border-box',
            border: '1px solid lightgray',
            fontFamily: 'monospace',
            fontSize: 16,
            padding: 10,
            width: '100%',
            height: 320
          }}
          ref="input"
          onChange={this.onChange}
          value={this.state.value}
        />
        <div style={{margin: '6px 0', maxHeight: '300px', overflow: 'auto'}}>
          {renderedContent}
        </div>
      </div>
    );
  }
}

storiesOf(name, module)
  .add('DAC renderer example', () => <DACRenderer/>)
  .add('Confluence macros example', () => {
    const columnMacroCss = require('css!./confluence-macros/column-macro.css');
    const infoMacroCss = require('css!./confluence-macros/info-macro.css');
    const statusMacroCss = require('css!./confluence-macros/status-macro.css');

    const confluenceDocument = {
      "type": "doc",
      "version": 1,
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "rawHtmlBlob",
              "attrs": {
                "html": "<p>Confluence <strong>macros</strong> <i>examples</i></p>"
              }
            },
            {
              "type": "macro",
              "attrs": {
                "macroId": "1906f672-d997-40ff-9896-a10fac62575f",
                "name": "status",
                "placeholderUrl": "",
                "params": {
                    "colour": "Yellow",
                    "title": "In Progress"
                },
                "macroBodyHtml": "<span class=\"status-macro aui-lozenge aui-lozenge-current conf-macro output-inline\" data-hasbody=\"false\" data-macro-name=\"status\">IN PROGRESS</span>"
              }
            },
            {
              "type": "macro",
              "attrs": {
                "macroId": "d0e309d2-a4bb-4a06-ad6b-584027779d29",
                "name": "info",
                "placeholderUrl": "",
                "params": {},
                "macroBodyHtml": "<div class=\"confluence-information-macro confluence-information-macro-information conf-macro output-block\" data-hasbody=\"true\" data-macro-name=\"info\"><span class=\"aui-icon aui-icon-small aui-iconfont-info confluence-information-macro-icon\"> </span><div class=\"confluence-information-macro-body\"><p>Info macro</p></div></div>"
              }
            },
            {
              "type": "macro",
              "attrs": {
                "macroId": "d0e309d2-a4bb-4a06-ad6b-584027779d29",
                "name": "warning",
                "placeholderUrl": "",
                "params": {},
                "macroBodyHtml": "<div class=\"confluence-information-macro confluence-information-macro-warning conf-macro output-block\" data-hasbody=\"true\" data-macro-name=\"info\"><span class=\"aui-icon aui-icon-small aui-iconfont-info confluence-information-macro-icon\"> </span><div class=\"confluence-information-macro-body\"><p>Warning macro</p></div></div>"
              }
            },
            {
              "type": "macro",
              "attrs": {
                "macroId": "04147f42-a985-4873-8af5-67b74c5cc7bd",
                "name": "column",
                "placeholderUrl": "",
                "params": {},
                "macroBodyHtml": "<div class=\"columnMacro conf-macro output-block\" style=\"width:200px;min-width:200px;max-width:200px;\" data-hasbody=\"true\" data-macro-name=\"column\"><p>This is a column macro with 200px</p></div>"
              }
            },
            {
              "type": "macro",
              "attrs": {
                "macroId": "0280e6e4-46ef-49e9-b9f3-4286aa176eb0",
                "name": "column",
                "placeholderUrl": "",
                "params": {},
                "macroBodyHtml": "<div class=\"columnMacro conf-macro output-block\" style=\"width:200px;min-width:200px;max-width:200px;\" data-hasbody=\"true\" data-macro-name=\"column\"><p>This is another column macro with 200px</p></div>"
              }
            }
          ]
        }
      ]
    };

    return (
      <div>
        <DACRenderer document={confluenceDocument} />
        <style>
          {infoMacroCss.toString()}
          {columnMacroCss.toString()}
          {statusMacroCss.toString()}
        </style>
      </div>
      );
  });
