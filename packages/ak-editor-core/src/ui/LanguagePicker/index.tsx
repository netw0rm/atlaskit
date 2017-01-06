import * as React from 'react';
import { PureComponent } from 'react';

import { CodeBlockState } from '../../plugins/code-block';
import { Node } from '../../prosemirror';

export interface Props {
  pluginState: CodeBlockState;
}

export interface State {
  target?: Node | null;
}

export default class HyperlinkEdit extends PureComponent<Props, State> {
  state: State = { target: null };

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  private handlePluginStateChange() {
    (pluginState: CodeBlockState) => {
      this.setState({
        target: pluginState.target,
      });
    };
  }
}
