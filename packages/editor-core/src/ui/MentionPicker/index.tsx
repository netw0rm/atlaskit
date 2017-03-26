import { MentionPicker as AkMentionPicker } from '@atlaskit/mention';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PureComponent } from 'react';
import { MentionsPluginState } from '../../plugins/mentions';
import Popper, { IPopper } from './../../popper';
import { akEditorFloatingPanelZIndex } from '../../styles';

export interface Props {
  pluginState: MentionsPluginState;
  resourceProvider: any; // AbstractMentionResource
  presenceProvider?: any; // AbstractPresenceResource
  reversePosition?: boolean;
  target?: HTMLElement;
}

export interface State {
  query?: string;
  anchorElement?: HTMLElement;
  position?: string;
  transform?: string;
}

export default class MentionPicker extends PureComponent<Props, State> {
  state: State = {};
  popper?: IPopper;

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
    this.props.pluginState.onSelectPrevious = this.handleSelectPrevious;
    this.props.pluginState.onSelectNext = this.handleSelectNext;
    this.props.pluginState.onSelectCurrent = this.handleSelectCurrent;
    this.props.pluginState.onTrySelectCurrent = this.handleTrySelectCurrent;
  }

  componentDidUpdate() {
    document.removeEventListener('click', this.handleClickOutside);
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUmount() {
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

  private handlePluginStateChange = (state: MentionsPluginState) => {
    const { anchorElement, query } = state;
    this.setState({ anchorElement, query });
    this.applyPopper();
  }

  render() {
    const { anchorElement, query, position, transform } = this.state;

    if (!anchorElement || query === undefined) {
      return null;
    }

    return (
      <div
        ref="content"
        style={{ top: 0, left: 0, position, transform, zIndex: akEditorFloatingPanelZIndex }}
      >
        <AkMentionPicker
          resourceProvider={this.props.resourceProvider}
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

  private handleSelectPrevious = () => {
    const { picker } = this.refs;
    if (picker) {
      (picker as AkMentionPicker).selectPrevious();
    }
  }

  private handleSelectNext = () => {
    const { picker } = this.refs;
    if (picker) {
      (picker as AkMentionPicker).selectNext();
    }
  }

  private handleSelectCurrent = () => {
    const { picker } = this.refs;
    if (picker && (picker as AkMentionPicker).mentionsCount() > 0) {
      (picker as AkMentionPicker).chooseCurrentSelection();
    } else {
      this.props.pluginState.dismiss();
    }
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
