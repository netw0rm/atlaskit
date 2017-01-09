import * as React from 'react';
import { PureComponent } from 'react';
import DropdownMenu from 'ak-dropdown-menu';

import { CodeBlockState } from '../../plugins/code-block';
import { Node } from '../../prosemirror';
import Panel from '../Panel';
import languageList from './languageList';

export interface Props {
  pluginState: CodeBlockState;
}

export interface State {
  target?: Node | null;
  element?: HTMLElement;
  language: string;
}

const items = [{
  'heading': '',
  'items': languageList.map((language) => {
      return {content: language};
    })
}];

export default class LanguagePicker extends PureComponent<Props, State> {
  state: State = { target: null, language: 'bash'};

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { target, language, element } = this.state;

    if(target) {
      return (
        <Panel target={element} align="left" autoPosition>
          <div>
            <DropdownMenu triggerType="button" items={items} onItemActivated={this.handleLanguageChange}>
              {language}
            </DropdownMenu>
          </div>
        </Panel>
      );
    }

    return null;

  }

  private handlePluginStateChange = (pluginState: CodeBlockState) => {
    this.setState({
      target: pluginState.target,
      language: this.state.language,
      element: pluginState.element
    });
  }

  private handleLanguageChange = (activedItem: any) => {
    const target = this.state.target;
    if(target) {
      target.attrs.language = activedItem.item.content;
      this.setState({
        target: this.state.target,
        language: activedItem.item.content,
        element: this.state.element
      });
    }
  }
}
