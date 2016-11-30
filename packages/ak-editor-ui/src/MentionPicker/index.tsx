import React, { PureComponent } from 'react';
// import { MentionPicker as MentionPickerComponent, AbstractMentionResource } from 'pf-mention';
import MentionsPlugin, { MentionsPluginState } from 'ak-editor-plugin-mentions';

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
      const style = {
        display: 'block',
        position: 'absolute',
        left: rect.left - 17,
        top: rect.top,
      };
      const picker = (
        <p>Picker</p>
        // <MentionPicker
        //   resourceProvider={this.props.resourceProvider}
        //   onSelected={this.handleSelectedMention}
        //   query={query}
        //   ref='picker'
        // />
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

  private handleSelectedMention = (e: Event) => {
    this.props.pluginState.handleSelectedMention(e);
  }

  private handleSelectPrevious = () => {
    const { picker } = this.refs;
    if (picker) {
      (picker as any).selectPrevious();
    }
  }

  private handleSelectNext = () => {
    const { picker } = this.refs;
    if (picker) {
      (picker as any).selectNext();
    }
  }

  private handleSelectCurrent = () => {
    const { picker } = this.refs;
    if (picker) {
      (picker as any).chooseCurrentSelection();
    }
  }
}
