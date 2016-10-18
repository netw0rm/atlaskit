import { storiesOf, action } from '@kadira/storybook';
import BitbucketComponent from '../src';
import reactify from 'akutil-react';
import { base64fileconverter } from 'ak-editor-test';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AkTabs from 'ak-tabs';
import { Tab as AkTab} from 'ak-tabs';

const Tabs = reactify(AkTabs);
const Tab = reactify(AkTab);
const Bitbucket = reactify(BitbucketComponent);
const { Converter, dropHandler, pasteHandler } = base64fileconverter;
const converter = new Converter(['jpg', 'jpeg', 'png', 'gif', 'svg'], 10000000);

const imageUploader = (e: any, fn: any) => {
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

storiesOf('ak-editor-bitbucket', module)
  .add('Empty', () => (
    <Bitbucket />
  ))
  .add('With default value', () => (
    <Bitbucket defaultValue="What do you want to say?" />
  ))
  .add('with imageUploader', () => (
    <Bitbucket
      imageUploader={imageUploader}
    />
  ))
  .add('Mentions (insert dummy when typed @)', () => {
    type Props = {};
    type State = {};
    class EditorWithMentions extends Component<Props, State> {
      constructor() {
        super();
        this.renderer = this.renderer.bind(this);
        this.autocompleter = this.autocompleter.bind(this);
      }

      renderer(e: any) {
        const { pm, el } = e.detail;

        el.innerText = el.getAttribute('editor-entity-id');
        el.style.border = "1px solid #000";
        el.style.backgroundColor = "#ccc";
        el.style.padding = "2px";
      }

      autocompleter(e: any) {
        const { pm, el } = e.detail;

        const m = pm.schema.nodes.mention.create({ id: '@foo' });
        const cursor = pm.selection.to;
        pm.tr.replaceWith(cursor-1, cursor, m).apply();
      }

      render() {
        return (
          <Bitbucket
            onMentionRender={this.renderer}
            onMentionAutocomplete={this.autocompleter}
          />
        )
      }
    }

    return <EditorWithMentions />;
  })
  .add('Events', () => (
    <Bitbucket
      onChange={action('change')}
      onReady={action('ready')}
      onSave={action('save')}
      onCancel={action('cancel')}
    />
  ))
  .add('Event Bubbling', () => {
    type Props = {};
    type State = {};
    class EditorInContainers extends Component<Props, State> {
      componentDidMount() {
        const outerContainer = ReactDOM.findDOMNode(this);
        const innerContainer = outerContainer.lastChild;

        [
          'ready', 'keydown', 'keyup', 'keypress', 'click', 'touchstart', 'touchend'
        ].forEach(eventName => {
          outerContainer.addEventListener(eventName, (e: any) => {
            action(`Outer container received "${eventName}" event`)(e);
            console.log('outer container event', e);
          });

          innerContainer.addEventListener(eventName, (e: any) => {
            action(`Inner container received "${eventName}" event`)(e);
            console.log('inner container event', e);
          });
        });
      }

      render() {
        const outerStyle = { padding: 25, background: '#6C64A6' };
        const innerStyle = { padding: 25, background: '#48CC8C' };
        const pStyle = { color: 'white', fontWeight: 600 };
        const taStyle = { width: '100%', height: 30, fontSize: 15, padding: 10 };

        action('⚠ Try clicking inside editor container and using your keyboard.')();

        return (
          <div style={ outerStyle }>
            <p style={ pStyle }>Outer container</p>
            <div style={ innerStyle }>
              <p style={ pStyle }>Inner container</p>
              <Bitbucket expanded />
              <hr />
              <textarea style={ taStyle } placeholder="ordinary textarea"></textarea>
            </div>
          </div>
        )
      }
    }

    return <EditorInContainers />;
  })
  .add('Markdown preview', () => {
    type Props = {};
    type State = { markdown: string };
    class Demo extends Component<Props, State> {
      constructor() {
        super();
        this.state = { markdown: '' };
        this.updateMarkdown = this.updateMarkdown.bind(this);
      }

      updateMarkdown(e: any) {
        this.setState({ markdown: e.target.value });
      }

      render() {
        return (
          <div ref="root">
            <Bitbucket
              placeholder="What do you want to say?"
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
  })
  .add('Contexts', () => {
    type Props = {};
    type State = {};
    class Demo extends Component<Props, State> {
      render() {
        return (
          <div ref="root">
            <Tabs>
              <Tab selected label="(default)">
                <Bitbucket expanded/>
              </Tab>
              <Tab selected label="comment">
                <Bitbucket expanded context="comment"/>
              </Tab>
              <Tab selected label="pr">
                <Bitbucket expanded context="pr"/>
              </Tab>
            </Tabs>
          </div>
        );
      }
    }

    return <Demo />;
  });

;

