import { MentionPicker as AkMentionPicker, MentionProvider, MentionDescription } from '@atlaskit/mention';
import * as React from 'react';
import { PureComponent } from 'react';
import { EditorView, PluginKey } from '../../prosemirror';
import { MentionsState } from '../../plugins/mentions';
import Popup from '../Popup';

export interface Props {
  editorView?: EditorView;
  pluginKey: PluginKey;
  presenceProvider?: any;
  reversePosition?: boolean;
  target?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsMountPoint?: HTMLElement;
}

export interface State {
  query?: string;
  anchorElement?: HTMLElement;
  mentionsProvider?: MentionProvider;
}

export default class MentionPicker extends PureComponent<Props, State> {
  state: State = {};
  content?: HTMLElement;
  private pluginState?: any;
  private picker?: AkMentionPicker;

  constructor(props: Props) {
    super(props);
    this.pluginState = props.editorView && props.pluginKey.getState(props.editorView.state);
  }

  private refreshProvider = mentionsProvider => {
    if (mentionsProvider) {
      this.setState({ mentionsProvider });
    } else {
      this.setState({ mentionsProvider: undefined });
    }
  }

  componentWillMount() {
    this.pluginState.subscribeToProviderUpdates(this.refreshProvider);
  }

  componentDidMount() {
    const pluginState = this.pluginState;
    pluginState.subscribe(this.handlePluginStateChange);
    pluginState.onSelectPrevious = this.handleSelectPrevious;
    pluginState.onSelectNext = this.handleSelectNext;
    pluginState.onSelectCurrent = this.handleSelectCurrent;
    pluginState.onTrySelectCurrent = this.handleTrySelectCurrent;
  }

  componentWillUmount() {
    this.pluginState.unsubscribe(this.handlePluginStateChange);
    this.pluginState.unsubscribeFromProviderUpdates(this.refreshProvider);
  }

  private handlePluginStateChange = (state: MentionsState) => {
    const { anchorElement, query } = state;
    this.setState({ anchorElement, query });
  }

  render() {
    const { anchorElement, query, mentionsProvider } = this.state;
    const { popupsBoundariesElement, popupsMountPoint, presenceProvider } = this.props;

    if (!anchorElement || query === undefined || !mentionsProvider) {
      return null;
    }

    return (
      <Popup
        target={anchorElement}
        fitHeight={300}
        fitWidth={340}
        boundariesElement={popupsBoundariesElement}
        mountTo={popupsMountPoint}
        offset={[0, 3]}
      >
        <AkMentionPicker
          resourceProvider={mentionsProvider}
          presenceProvider={presenceProvider}
          onSelection={this.handleSelectedMention}
          query={query}
          ref={this.handleMentionPickerRef}
        />
      </Popup>
    );
  }

  private handleMentionPickerRef = (ref) => {
    this.picker = ref;
  }

  private handleSelectedMention = (mention: MentionDescription) => {
    this.pluginState.insertMention(mention);
  }

  private handleSelectPrevious = (): boolean => {
    if (this.picker) {
      (this.picker as AkMentionPicker).selectPrevious();
    }

    return true;
  }

  private handleSelectNext = (): boolean => {
    if (this.picker) {
      (this.picker as AkMentionPicker).selectNext();
    }

    return true;
  }

  private handleSelectCurrent = (): boolean => {
    if (this.getMentionsCount() > 0 && this.picker) {
      (this.picker as AkMentionPicker).chooseCurrentSelection();
    } else {
      this.pluginState.dismiss();
    }

    return true;
  }

  private handleTrySelectCurrent = (): boolean => {
    const mentionsCount = this.getMentionsCount();
    const { query } = this.state;

    if (mentionsCount === 1 && this.picker) {
      (this.picker as AkMentionPicker).chooseCurrentSelection();
      return true;
    } else if (mentionsCount === 0) {
      this.props.pluginState.disableActiveQuery();
    } else if (!query) {
      this.pluginState.dismiss();
    }

    return false;
  }

  private getMentionsCount(): number {
    return (this.picker && this.picker.mentionsCount()) || 0;
  }
}
