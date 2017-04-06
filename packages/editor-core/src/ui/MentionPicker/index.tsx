import { MentionPicker as AkMentionPicker, MentionProvider } from '@atlaskit/mention';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PureComponent } from 'react';
import Popper, { IPopper } from './../../popper';
import { akEditorFloatingPanelZIndex } from '../../styles';
import { MentionsState } from '../../plugins/mentions';

export interface Props {
  pluginState: MentionsState;
  presenceProvider?: any;
  resourceProvider: Promise<MentionProvider>;
  reversePosition?: boolean;
  target?: HTMLElement;
}

export interface State {
  query?: string;
  anchorElement?: HTMLElement;
  position?: string;
  transform?: string;
  mentionsProvider?: MentionProvider;
}

export default class MentionPicker extends PureComponent<Props, State> {
  state: State = {};
  popper?: IPopper;
  subscriberKey?: string;

  constructor(props) {
    super(props);
    this.subscriberKey = 'editor-' + Math.floor(Math.random() * 100000);
  }

  private refreshProvider(providerPromise: Promise<any>) {
    if (providerPromise) {
      providerPromise.then(mentionsProvider => {
        this.subscribeResourceProvider(mentionsProvider);
        this.setState({ mentionsProvider });
      });
    } else {
      this.unsubscribeResourceProvider(this.state.mentionsProvider);
      this.setState({ mentionsProvider: undefined });
    }
  }

  private subscribeResourceProvider(mentionsProvider) {
    if (mentionsProvider) {
      mentionsProvider.subscribe(
        this.subscriberKey,
        this.updatePopupPosition.bind(this),
        () => {},
        () => {}
      );
    }
  }

  private unsubscribeResourceProvider(mentionsProvider) {
    if (mentionsProvider) {
      mentionsProvider.unsubscribe(this.subscriberKey);
    }
  }

  private updatePopupPosition() {
    this.popper && this.popper.update();
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

  componentDidUpdate() {
    document.removeEventListener('click', this.handleClickOutside);
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUmount() {
    this.unsubscribeResourceProvider(this.state.mentionsProvider);
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
    document.removeEventListener('click', this.handleClickOutside);
    this.popper && this.popper.destroy();
  }

  extractStyles = (state: any) => {
    if (state) {
      const left = Math.round(state.offsets.popper.left);
      const top = Math.round(state.offsets.popper.top);

      this.setState({
        position: state.offsets.popper.position,
        transform: `translate3d(${left}px, ${top}px, 0px)`,
      });
    }
  }

  private applyPopper(): void {
    const { content } = this.refs;
    const target = this.state.anchorElement;

    if (this.popper) {
      this.popper.destroy();
    }

    if (target && content instanceof HTMLElement) {

      this.popper = new Popper(target, content, {
        onCreate: this.extractStyles,
        onUpdate: this.extractStyles,
        placement: this.props.reversePosition ? 'top-start' : 'bottom-start',
        modifiers: {
          applyStyle: {
            enabled: false,
          },
          hide: {
            enabled: false
          },
          offset: {
            enabled: true,
            offset: '0 3px',
          },
          flip: {
            enabled: false,
          },
          preventOverflow: {
            enabled: true,
            escapeWithReference: true,
            boundariesElement: document.body
          },
        },
      });
    }
  }

  private handleClickOutside = (e) => {
    if (!this.state.query) {
      return;
    }

    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || (e.target instanceof Node && !domNode.contains(e.target))) {
      this.props.pluginState.dismiss();
    }
  }

  private handlePluginStateChange = (state: MentionsState) => {
    const { anchorElement, query } = state;
    this.setState({ anchorElement, query });
    this.applyPopper();
  }

  render() {
    const { anchorElement, query, position, transform, mentionsProvider } = this.state;

    if (!anchorElement || query === undefined) {
      return null;
    }

    if (!mentionsProvider) {
      return null;
    }

    return (
      <div
        ref="content"
        style={{ top: 0, left: 0, position, transform, zIndex: akEditorFloatingPanelZIndex }}
      >
        <AkMentionPicker
          resourceProvider={mentionsProvider}
          presenceProvider={this.props.presenceProvider}
          onSelection={this.handleSelectedMention}
          query={query}
          ref="picker"
        />
      </div>
    );
  }

  private handleSelectedMention = (mention: any) => {
    this.props.pluginState.insertMention(mention);
  }

  private handleSelectPrevious = (): boolean => {
    const { picker } = this.refs;
    if (picker) {
      (picker as AkMentionPicker).selectPrevious();
    }

    return true;
  }

  private handleSelectNext = (): boolean => {
    const { picker } = this.refs;
    if (picker) {
      (picker as AkMentionPicker).selectNext();
    }

    return true;
  }

  private handleSelectCurrent = (): boolean => {
    const { picker } = this.refs;
    if (picker && (picker as AkMentionPicker).mentionsCount() > 0) {
      (picker as AkMentionPicker).chooseCurrentSelection();
    } else {
      this.props.pluginState.dismiss();
    }

    return true;
  }

  private handleTrySelectCurrent = (): boolean => {
    const { picker } = this.refs;
    if (picker && (picker as AkMentionPicker).mentionsCount() === 1) {
      (picker as AkMentionPicker).chooseCurrentSelection();
      return true;
    }

    return false;
  }
}
