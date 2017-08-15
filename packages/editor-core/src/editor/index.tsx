import * as React from 'react';
import { PureComponent } from 'react';
import { createEditor, getUiComponent } from './create-editor';
import { createPluginsList } from './create-editor';

import ProviderFactory from '../providerFactory';

import { EditorProps, EditorInstance } from './types';
export * from './types';

export interface State {
  editor?: EditorInstance;
  component?: React.ComponentClass<any>;
}

export default class Editor extends PureComponent<EditorProps, State> {
  static defaultProps: EditorProps = {
    appearance: 'message'
  };

  private providerFactory: ProviderFactory;

  constructor(props: EditorProps) {
    super(props);
    this.providerFactory = new ProviderFactory();
    this.state = {};
  }

  componentDidMount() {
    this.initUi();
    this.handleProviders(this.props);
  }

  componentWillReceiveProps(nextProps: EditorProps) {
    this.handleProviders(nextProps);
  }

  componentWillUnmount() {
    if (this.state.editor && this.state.editor.eventDispatcher) {
      this.state.editor.eventDispatcher.destroy();
    }
  }

  private initUi() {
    const component = getUiComponent(this.props.appearance);
    this.setState({ component });
  }

  private initEditor = place => {
    const plugins = createPluginsList(this.props);
    const editor = createEditor(place, plugins, this.props, this.providerFactory);
    this.setState({ editor });
  }

  private handleProviders(props: EditorProps) {
    const { emojiProvider, mentionProvider, mediaProvider } = props;
    this.providerFactory.setProvider('emojiProvider', emojiProvider);
    this.providerFactory.setProvider('mentionProvider', mentionProvider);
    this.providerFactory.setProvider('mediaProvider', mediaProvider);
  }

  render() {
    // tslint:disable-next-line:variable-name
    const { component: Component, editor = {} } = this.state;

    if (!Component) {
      return null;
    }

    const {
      editorView,
      contentComponents,
      primaryToolbarComponents,
      secondaryToolbarComponents,
      eventDispatcher
    } = editor as EditorInstance;

    return (
      <Component
        onUiReady={this.initEditor}

        editorView={editorView}
        providerFactory={this.providerFactory}

        eventDispatcher={eventDispatcher}

        contentComponents={contentComponents}
        primaryToolbarComponents={primaryToolbarComponents}
        secondaryToolbarComponents={secondaryToolbarComponents}
      />
    );
  }
}
