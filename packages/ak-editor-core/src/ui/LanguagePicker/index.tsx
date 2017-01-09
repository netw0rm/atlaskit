import * as React from 'react';
import { PureComponent } from 'react';
import DropdownMenu from 'ak-dropdown-menu';

import { CodeBlockState } from '../../plugins/code-block';
import { Node } from '../../prosemirror';
import languageList from './languageList';

export interface Props {
  pluginState: CodeBlockState;
}

export interface State {
  target?: Node | null;
}

const items = [{
  'heading': '',
  'items': languageList.map((language) => {
      return {content: language};
    })
}];

export default class LanguagePicker extends PureComponent<Props, State> {
  state: State = { target: null };

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { target } = this.state;

    if(target) {
      return (
        <div style={{'padding': '20px 0'}}>
          <DropdownMenu triggerType="button" items={items}>
            Bash
          </DropdownMenu>
        </div>
      );
    }

    return null;

  }

  private handlePluginStateChange = (pluginState: CodeBlockState) => {
    this.setState({
      target: pluginState.target,
    });
  }
}
