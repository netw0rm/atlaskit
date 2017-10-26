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
import { bindExpanderHandler } from './confluence-macros/expand-macro';

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

  componentDidMount() {
    bindExpanderHandler();
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
    const expandMacroCss = require('css!./confluence-macros/expand-macro.css');

    const confluenceDocument = require('./confluence-macros/document').document;

    return (
      <div className="wiki-content">
        <DACRenderer document={confluenceDocument} />
        <style>
          {infoMacroCss.toString()}
          {columnMacroCss.toString()}
          {statusMacroCss.toString()}
          {expandMacroCss.toString()}
        </style>
      </div>
      );
  });
