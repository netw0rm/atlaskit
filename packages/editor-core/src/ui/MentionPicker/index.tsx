import { MentionPicker as AkMentionPicker } from '@atlaskit/mention';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PureComponent } from 'react';
import { MentionsPluginState } from '../../plugins/mentions';

export interface Props {
  pluginState: MentionsPluginState;
  resourceProvider: any; // AbstractMentionResource
  presenceProvider?: any; // AbstractPresenceResource
  reversePosition?: boolean;
}

export interface State {
  query?: string;
  anchorElement?: HTMLElement;
}

export default class MentionPicker extends PureComponent<Props, State> {
  state: State = {};

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
  }

  render() {
    const { anchorElement, query } = this.state;

    let style: any = {
      display: 'none'
    };

    if (anchorElement && query) {
      const rect = anchorElement.getBoundingClientRect();
      const parentRect = anchorElement.offsetParent.getBoundingClientRect();
      style = {
        display: 'block',
        position: 'absolute',
        left: (rect.left - parentRect.left),
        top: !this.props.reversePosition ? (rect.top - parentRect.top) + rect.height : null,
        bottom: this.props.reversePosition ? (window.innerHeight - parentRect.bottom) + 20 : null,
        zIndex: 1
      };
    }

    const picker = (
      <AkMentionPicker
        resourceProvider={this.props.resourceProvider}
        presenceProvider={this.props.presenceProvider}
        onSelection={this.handleSelectedMention}
        query={query}
        ref="picker"
      />
    );

    return (
      <div style={style}>
        {picker}
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
