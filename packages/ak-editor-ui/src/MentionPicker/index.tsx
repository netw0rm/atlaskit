import React, { PureComponent } from 'react';
import MentionsPlugin, { MentionsPluginState } from 'ak-editor-plugin-mentions';
import { MentionPicker as PfMentionPicker } from 'ak-mention';

interface Props {
  pluginState: MentionsPluginState;
  resourceProvider: any;//AbstractMentionResource;
}

interface State {
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

    if (anchorElement && query) {
      const rect = anchorElement.getBoundingClientRect();
      const parentRect = anchorElement.offsetParent.getBoundingClientRect();
      const style = {
        display: 'block',
        position: 'absolute',
        left: (rect.left - parentRect.left),
        top: (rect.top - parentRect.top) + rect.height,
      };
      const picker = (
        <PfMentionPicker
          resourceProvider={this.props.resourceProvider}
          onSelection={this.handleSelectedMention}
          query={query}
          ref='picker'
        />
      );
      return (
        <div style={style}>
          {picker}
        </div>
      );

    } else {
      return null;
    }
  }

  private handleSelectedMention = (mention: any) => {
    this.props.pluginState.insertMention(mention);
  }

  private handleSelectPrevious = () => {
    const { picker } = this.refs;
    if (picker) {
      (picker as PfMentionPicker).selectPrevious();
    }
  }

  private handleSelectNext = () => {
    const { picker } = this.refs;
    if (picker) {
      (picker as PfMentionPicker).selectNext();
    }
  }

  private handleSelectCurrent = () => {
    const { picker } = this.refs;
    if (picker) {
      (picker as PfMentionPicker).chooseCurrentSelection();
    }
  }
}
