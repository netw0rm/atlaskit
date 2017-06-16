import { MentionPicker as AkMentionPicker, MentionProvider, MentionDescription } from '@atlaskit/mention';
import * as React from 'react';
import { PureComponent } from 'react';
import { MentionsState } from '../../plugins/mentions';
import Popup from '../Popup';

export interface Props {
  pluginState: MentionsState;
  presenceProvider?: any;
  resourceProvider: Promise<MentionProvider>;
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

const isMentionPicker = (picker): picker is AkMentionPicker => !!(picker.mentionsCount);

export default class MentionPicker extends PureComponent<Props, State> {
  state: State = {};
  picker?: AkMentionPicker;
  content?: HTMLElement;

  private refreshProvider(providerPromise: Promise<any>) {
    if (providerPromise) {
      providerPromise.then(mentionsProvider => {
        this.setState({ mentionsProvider });
      });
    } else {
      this.setState({ mentionsProvider: undefined });
    }
  }

  componentWillMount() {
    if (!this.state.mentionsProvider) {
      this.refreshProvider(this.props.resourceProvider);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.resourceProvider !== this.props.resourceProvider) {
      this.refreshProvider(nextProps.resourceProvider);
    }
  }

  componentDidMount() {
    const { pluginState } = this.props;
    pluginState.subscribe(this.handlePluginStateChange);
    pluginState.onSelectPrevious = this.handleSelectPrevious;
    pluginState.onSelectNext = this.handleSelectNext;
    pluginState.onSelectCurrent = this.handleSelectCurrent;
    pluginState.onTrySelectCurrent = this.handleTrySelectCurrent;
  }

  componentWillUmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  private handlePluginStateChange = (state: MentionsState) => {
    const { anchorElement, query } = state;
    this.setState({ anchorElement, query });
  }

  render() {
    const { anchorElement, query, mentionsProvider } = this.state;
    const { popupsBoundariesElement, popupsMountPoint, presenceProvider } = this.props;

    if (!anchorElement || query === undefined) {
      return null;
    }

    if (!mentionsProvider) {
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
    this.props.pluginState.insertMention(mention);
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
    if (this.getMentionsCount() > 0) {
      (this.picker as AkMentionPicker).chooseCurrentSelection();
    } else {
      this.props.pluginState.dismiss();
    }

    return true;
  }

  private handleTrySelectCurrent = (): boolean => {
    const mentionsCount = this.getMentionsCount();
    const { query } = this.state;

    if (mentionsCount === 1) {
      (this.picker as AkMentionPicker).chooseCurrentSelection();
      return true;
    } else if (mentionsCount === 0 || !query) {
      this.props.pluginState.dismiss();
    }

    return false;
  }

  private getMentionsCount(): number {
    return isMentionPicker(this.picker) && this.picker.mentionsCount() || 0;
  }
}
