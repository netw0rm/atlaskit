import * as assert from 'assert';

import {
  AnalyticsHandler,
  analyticsService,
  analyticsDecorator as analytics,
  baseKeymap,
  Chrome,
  blockTypePlugins,
  clearFormattingPlugins,
  codeBlockPlugins,
  createJIRASchema,
  hyperlinkPlugins,
  mentionsPlugins,
  rulePlugins,
  textFormattingPlugins,
  textColorPlugins,
  listsPlugins,
  blockTypeStateKey,
  clearFormattingStateKey,
  codeBlockStateKey,
  hyperlinkStateKey,
  mentionsStateKey,
  textFormattingStateKey,
  textColorStateKey,
  listsStateKey,
  tablePlugins,
  tableStateKey,
  EditorState,
  EditorView,
  Schema,
  history,
  keymap,
  ProviderFactory,
  TextSelection,
  version as coreVersion,

  MediaProvider,
  MediaState,
  MediaPluginState,
  mediaPluginFactory,
  mediaStateKey,

  Plugin,

  // nodeviews
  nodeViewFactory,
  ReactMentionNode,
  ReactMediaNode,
  ReactMediaGroupNode,
  reactNodeViewPlugins,

  // error-reporting
  ErrorReporter,
  ErrorReportingHandler,

  // transformers
  JIRATransformer,
} from '@atlaskit/editor-core';

import { JSONSerializer } from '@atlaskit/editor-core/dist/es5/renderer';
import { MentionProvider } from '@atlaskit/mention';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';
import Spinner from '@atlaskit/spinner';
import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';

import {
  isSchemaWithCodeBlock,
  isSchemaWithLinks,
  isSchemaWithMentions,
  isSchemaWithMedia,
  isSchemaWithTextColor,
  getMediaContextInfo,
  isSchemaWithTables,
} from './util';

import { version, name } from './version';
export { version };

// tslint:disable-next-line:variable-name
const FooterWrapper = styled.div`
  display: flex;
  padding: 12px 0 0 0;
`;

// tslint:disable-next-line:variable-name
const FooterSlot = styled.div`
  flex-grow: 1;
`;

export interface FooterProps {
  saveDisabled: boolean;
}

export interface Props {
  isDisabled?: boolean;
  isExpandedByDefault?: boolean;
  defaultValue?: string;
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  onExpanded?: (editor?: Editor) => void;
  placeholder?: string;
  analyticsHandler?: AnalyticsHandler;
  allowLists?: boolean;
  allowLinks?: boolean;
  allowCodeBlock?: boolean;
  allowAdvancedTextFormatting?: boolean;
  allowBlockQuote?: boolean;
  allowSubSup?: boolean;
  allowTextColor?: boolean;
  allowTables?: boolean;
  mentionProvider?: Promise<MentionProvider>;
  mentionEncoder?: (userId: string) => string;
  mediaProvider?: Promise<MediaProvider>;
  uploadErrorHandler?: (state: MediaState) => void;
  errorReporter?: ErrorReportingHandler;
  popupsBoundariesElement?: HTMLElement;
  popupsMountPoint?: HTMLElement;
  renderFooter?: (props: FooterProps) => React.ReactElement<any>;
}

export interface State {
  editorView?: EditorView;
  editorState?: EditorState<any>;
  isMediaReady: boolean;
  isExpanded?: boolean;
  schema: Schema<any, any>;
}

export default class Editor extends PureComponent<Props, State> {
  private providerFactory: ProviderFactory;
  private mediaPlugins: Plugin[];

  // we don't need mediaContextInfo for HTML parsing (which must be synchronous)
  // but we need it for encoding (which is asynchronous)
  private transformer: JIRATransformer;
  private transformerWithMediaContext: JIRATransformer;

  state: State;
  version = `${version} (editor-core ${coreVersion})`;

  constructor(props: Props) {
    super(props);

    const {
      allowLists, allowLinks, allowAdvancedTextFormatting,
      allowCodeBlock, allowBlockQuote, allowSubSup, allowTextColor, allowTables,

      analyticsHandler,

      mentionProvider,
      mediaProvider, uploadErrorHandler,

      isExpandedByDefault: isExpanded
    } = props;

    const schema = createJIRASchema({
      allowLists: !!allowLists,
      allowMentions: !!mentionProvider,
      allowLinks: !!allowLinks,
      allowAdvancedTextFormatting: !!allowAdvancedTextFormatting,
      allowCodeBlock: !!allowCodeBlock,
      allowBlockQuote: !!allowBlockQuote,
      allowSubSup: !!allowSubSup,
      allowTextColor: !!allowTextColor,
      allowMedia: !!mediaProvider,
      allowTables: !!allowTables
    });

    this.state = { isExpanded, schema, isMediaReady: true };
    this.providerFactory = new ProviderFactory();
    this.transformer = new JIRATransformer(schema);

    if (mentionProvider) {
      this.providerFactory.setProvider('mentionProvider', mentionProvider);
    }

    if (mediaProvider) {
      this.providerFactory.setProvider('mediaProvider', mediaProvider);

      const errorReporter = new ErrorReporter();
      if (props.errorReporter) {
        errorReporter.handler = props.errorReporter;
      }

      this.mediaPlugins = mediaPluginFactory(schema, {
        uploadErrorHandler,
        errorReporter,
        providerFactory: this.providerFactory
      });
    }

    analyticsService.handler = analyticsHandler || ((name) => { });
  }

  async componentWillMount() {
    const mediaContextInfo = await getMediaContextInfo();
    const { mentionEncoder } = this.props;
    const { schema } = this.state;

    this.transformerWithMediaContext = new JIRATransformer(schema, { mention: mentionEncoder }, mediaContextInfo);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isDisabled !== this.props.isDisabled) {
      const { editorView } = this.state;
      if (editorView) {
        editorView.dom.contentEditable = String(!nextProps.isDisabled);

        if (!nextProps.isDisabled && !editorView.hasFocus()) {
          editorView.focus();
        }
      }
    }
  }

  componentWillUnmount() {
    const { editorView } = this.state;

    if (editorView) {
      if (editorView.state) {
        const mediaState = mediaStateKey.getState(editorView.state);
        if (mediaState) {
          mediaState.destroy();
        }
      }

      editorView.destroy();
    }

    this.providerFactory.destroy();
  }

  /**
   * Focus the content region of the editor.
   */
  focus(): void {
    const { editorView } = this.state;

    if (editorView && !editorView.hasFocus() && !this.props.isDisabled) {
      try {
        editorView.focus();
      } catch (err) {}
    }
  }

  /**
   * Expand the editor chrome
   */
  expand = () => {
    const { onExpanded } = this.props;
    const { schema } = this.state;

    this.setState({ isExpanded: true, schema });

    if (onExpanded) {
      onExpanded(this);
    }
  }

  /**
   * Collapse the editor chrome
   */
  collapse = () => {
    const { schema } = this.state;

    this.setState({ isExpanded: false, schema });
  }

  /**
   * Clear the content of the editor, making it an empty document.
   */
  clear(): void {
    const { editorView } = this.state;

    if (editorView) {
      const { state } = editorView;
      const tr = state.tr
        .setSelection(TextSelection.create(state.doc, 0, state.doc.nodeSize - 2))
        .deleteSelection();

      editorView.dispatch(tr);
    }
  }

  /**
   * Check if the user has entered any significant content.
   * (i.e. text)
   */
  isDirty(): boolean {
    const { editorView } = this.state;

    return editorView && editorView.state.doc
      ? !!editorView.state.doc.textContent
      : false;
  }

  /**
   * The current value of the editor, encoded as HTML.
   */
  get value(): Promise<string | undefined> {
    const { editorView } = this.state;
    const mediaPluginState = editorView && mediaStateKey.getState(editorView.state) as MediaPluginState;

    return (async () => {
      if (mediaPluginState) {
        await mediaPluginState.waitForPendingTasks();
      }

      return editorView && editorView.state.doc
        ? this.transformerWithMediaContext.encode(editorView.state.doc)
        : this.props.defaultValue;
    })();
  }

  render() {
    const { editorView, isExpanded, isMediaReady } = this.state;
    const {
      isDisabled = false,
      mentionProvider, mediaProvider,
      popupsBoundariesElement, popupsMountPoint,
      renderFooter,
      onSave, onCancel
    } = this.props;
    const editorState = editorView && editorView.state;

    const listsState = editorState && listsStateKey.getState(editorState);
    const blockTypeState = editorState && blockTypeStateKey.getState(editorState);
    const clearFormattingState = editorState && clearFormattingStateKey.getState(editorState);
    const codeBlockState = editorState && codeBlockStateKey.getState(editorState);
    const textFormattingState = editorState && textFormattingStateKey.getState(editorState);
    const textColorState = editorState && textColorStateKey.getState(editorState);
    const hyperlinkState = editorState && hyperlinkStateKey.getState(editorState);
    const mentionsState = editorState && mentionsStateKey.getState(editorState);
    const mediaState = editorState && mediaProvider && this.mediaPlugins && mediaStateKey.getState(editorState);
    const tableState = editorState && tableStateKey.getState(editorState);
    const iconAfter = !isMediaReady
      ? <Spinner isCompleting={false} />
      : undefined;
    const saveButtonAppearance = !isMediaReady
      ? 'default'
      : 'primary';

    return (
      <div>
        <Chrome
          disabled={isDisabled}
          children={<div ref={this.handleRef} />}
          editorView={editorView!}
          isExpanded={isExpanded}
          mentionProvider={mentionProvider}
          onCollapsedChromeFocus={this.expand}
          placeholder={this.props.placeholder}
          pluginStateBlockType={blockTypeState}
          pluginStateCodeBlock={codeBlockState}
          pluginStateLists={listsState}
          pluginStateTextFormatting={textFormattingState}
          pluginStateTextColor={textColorState}
          pluginStateClearFormatting={clearFormattingState}
          pluginStateMentions={mentionsState}
          pluginStateHyperlink={hyperlinkState}
          pluginStateMedia={mediaState}
          pluginStateTable={tableState}
          packageVersion={version}
          packageName={name}
          saveDisabled={!isMediaReady}
          popupsBoundariesElement={popupsBoundariesElement}
          popupsMountPoint={popupsMountPoint}
        />
        {
          isExpanded && (
            <FooterWrapper>
              {(onSave || onCancel) && (
                <ButtonGroup>
                  {onSave && <Button isDisabled={!isMediaReady} iconAfter={iconAfter} appearance={saveButtonAppearance} onClick={this.handleSave}>Save</Button>}
                  {onCancel && <Button appearance="subtle" onClick={this.handleCancel}>Cancel</Button>}
                </ButtonGroup>
              )}

              {renderFooter && (<FooterSlot>{renderFooter({ saveDisabled: !isMediaReady })}</FooterSlot>)}
            </FooterWrapper>
          )
        }
      </div>
    );
  }

  @analytics('atlassian.editor.stop.cancel')
  private handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel(this);
    }
    return true;
  }

  private handleChange = async () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(this);
    }


    const { editorView } = this.state;
    const mediaPluginState = mediaStateKey.getState(editorView!.state) as MediaPluginState;

    if (mediaPluginState) {
      this.setState({ isMediaReady: false });
      await mediaPluginState.waitForPendingTasks();
      this.setState({ isMediaReady: true });
    }
  }

  @analytics('atlassian.editor.stop.save')
  private handleSave = () => {
    const { onSave } = this.props;
    if (onSave) {
      onSave(this);
    }
    return true;
  }

  private handleRef = (place: Element | null) => {
    const { schema } = this.state;

    if (place) {
      const jiraKeymap = {
        'Mod-Enter': this.handleSave,
      };

      const editorState = EditorState.create({
        schema,
        doc: this.transformer.parse(this.props.defaultValue || ''),
        plugins: [
          ...(isSchemaWithLinks(schema) ? hyperlinkPlugins(schema as Schema<any, any>) : []),
          ...(isSchemaWithMentions(schema) ? mentionsPlugins(schema as Schema<any, any>, this.providerFactory) : []),
          ...clearFormattingPlugins(schema as Schema<any, any>),
          ...rulePlugins(schema as Schema<any, any>),
          ...(isSchemaWithMedia(schema) ? this.mediaPlugins : []),
          ...(isSchemaWithTextColor(schema) ? textColorPlugins(schema as Schema<any, any>) : []),
          // block type plugin needs to be after hyperlink plugin until we implement keymap priority
          // because when we hit shift+enter, we would like to convert the hyperlink text before we insert a new line
          // if converting is possible
          ...blockTypePlugins(schema as Schema<any, any>),
          // The following order of plugins blockTypePlugins -> listBlock
          // this is needed to ensure that all block types are supported inside lists
          // this is needed until we implement keymap proirity :(
          ...listsPlugins(schema as Schema<any, any>),
          ...textFormattingPlugins(schema as Schema<any, any>),
          ...(isSchemaWithCodeBlock(schema) ? codeBlockPlugins(schema as Schema<any, any>) : []),
          ...reactNodeViewPlugins(schema as Schema<any, any>),
          ...(isSchemaWithTables(schema as Schema<any, any>) ? tablePlugins() : []),
          history(),
          keymap(jiraKeymap),
          keymap(baseKeymap), // should be last :(
        ]
      });

      const editorView = new EditorView(place, {
        state: editorState,
        editable: (state: EditorState<any>) => !this.props.isDisabled,
        dispatchTransaction: (tr) => {
          const newState = editorView.state.apply(tr);
          editorView.updateState(newState);
          this.handleChange();
        },
        nodeViews: {
          mention: nodeViewFactory(this.providerFactory, { mention: ReactMentionNode }),
          mediaGroup: nodeViewFactory(this.providerFactory, {
            mediaGroup: ReactMediaGroupNode,
            media: ReactMediaNode,
          }, true),
        },
        handleDOMEvents: {
          paste(view: EditorView, event: ClipboardEvent) {
            analyticsService.trackEvent('atlassian.editor.paste');
            return false;
          }
        }
      });

      analyticsService.trackEvent('atlassian.editor.start');

      this.setState({ editorView }, this.focus);
    } else {
      this.setState({ editorView: undefined });
    }
  }
}

export const parseIntoAtlassianDocument = (html: string, schema: Schema<any, any>) => {
  assert.strictEqual(typeof html, 'string', 'First parseIntoAtlassianDocument() argument is not a string');

  const serializer = new JSONSerializer();
  const transformer = new JIRATransformer(schema);
  const doc = transformer.parse(html);

  return serializer.serializeFragment(doc.content) as any;
};
