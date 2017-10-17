import * as React from 'react';
import { PropTypes } from 'react';
import { withAnalytics } from '@atlaskit/analytics';

import { createEditor, getUiComponent } from './create-editor';
import { createPluginsList } from './create-editor';
import EditorActions from './actions';
import ProviderFactory from '../providerFactory';
import { EditorProps, EditorInstance, EditorAppearanceComponentProps } from './types';
import { moveCursorToTheEnd } from '../utils';
export * from './types';

export interface State {
  editor?: EditorInstance;
  component?: React.ComponentClass<EditorAppearanceComponentProps>;
}

export class InternalEditor extends React.Component<EditorProps, State> {
  static defaultProps: EditorProps = {
    appearance: 'message'
  };

  static contextTypes = {
    editorActions: PropTypes.object
  };

  context: {
    editorActions?: EditorActions;
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
    if (!this.state.editor) {
      return;
    }

    this.unregisterEditorFromActions();
    this.state.editor.editorView.destroy();

    if (this.state.editor.eventDispatcher) {
      this.state.editor.eventDispatcher.destroy();
    }
  }

  private registerEditorForActions(editor: EditorInstance) {
    if (this.context && this.context.editorActions) {
      this.context.editorActions._privateRegisterEditor(editor.editorView, editor.contentTransformer);
    }
  }

  private unregisterEditorFromActions() {
    if (this.context && this.context.editorActions) {
      this.context.editorActions._privateUnregisterEditor();
    }
  }

  private initUi() {
    const component = getUiComponent(this.props.appearance);
    this.setState({ component });
  }

  private initEditor = place => {
    if (!place) {
      return;
    }
    const plugins = createPluginsList(this.props);
    const editor = createEditor(place, plugins, this.props, this.providerFactory);
    this.registerEditorForActions(editor);
    this.setState({ editor });

    // Focus editor first time we create it if shouldFocus prop is set to true.
    if (this.props.shouldFocus) {
      if (!editor.editorView.hasFocus()) {
        editor.editorView.focus();
      }

      moveCursorToTheEnd(editor.editorView);
    }
  }

  private handleProviders(props: EditorProps) {
    const {
      emojiProvider,
      mentionProvider,
      mediaProvider,
      collabEditProvider,
      activityProvider,
      presenceProvider,
      macroProvider,
      legacyImageUploadProvider
    } = props;
    this.providerFactory.setProvider('emojiProvider', emojiProvider);
    this.providerFactory.setProvider('mentionProvider', mentionProvider);
    this.providerFactory.setProvider('mediaProvider', mediaProvider);
    this.providerFactory.setProvider('imageUploadProvider', legacyImageUploadProvider);
    this.providerFactory.setProvider('collabEditProvider', collabEditProvider);
    this.providerFactory.setProvider('activityProvider', activityProvider);
    this.providerFactory.setProvider('presenceProvider', presenceProvider);
    this.providerFactory.setProvider('macroProvider', macroProvider);
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

        maxHeight={this.props.maxHeight}
        onSave={this.props.onSave}
        onCancel={this.props.onCancel}

        popupsMountPoint={this.props.popupsMountPoint}
        popupsBoundariesElement={this.props.popupsBoundariesElement}

        contentComponents={contentComponents}
        primaryToolbarComponents={primaryToolbarComponents}
        secondaryToolbarComponents={secondaryToolbarComponents}

        customContentComponents={this.props.contentComponents}
        customPrimaryToolbarComponents={this.props.primaryToolbarComponents}
        customSecondaryToolbarComponents={this.props.secondaryToolbarComponents}

        addonToolbarComponents={this.props.addonToolbarComponents}
      />
    );
  }
}

// This is to ensure that the "type" is exported, as it gets lost and not exported along with TaskItem after
// going through the high order component.
// tslint:disable-next-line:variable-name
const Editor = withAnalytics<typeof InternalEditor>(InternalEditor, {}, {}, true);
type Editor = InternalEditor;

export default Editor;
