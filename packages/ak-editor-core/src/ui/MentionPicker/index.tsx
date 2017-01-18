import { MentionPicker as AkMentionPicker } from 'ak-mention';
import * as React from 'react';
import { PureComponent } from 'react';
import { MentionsPluginState } from '../../../src/plugins/mentions';

export interface Props {
  pluginState: MentionsPluginState;
  resourceProvider: any; // AbstractMentionResource;
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
  }

  componentWillUmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
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
        bottom: this.props.reversePosition ? (window.innerHeight - parentRect.bottom) + 20 : null
      };
    }

    const picker = (
      <AkMentionPicker
        resourceProvider={this.props.resourceProvider}
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
    if (picker) {
      (picker as AkMentionPicker).chooseCurrentSelection();
    }
  }
}
