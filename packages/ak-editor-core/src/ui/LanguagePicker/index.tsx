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
  language: string;
}

const items = [{
  'heading': '',
  'items': languageList.map((language) => {
      return {content: language};
    })
}];

export default class LanguagePicker extends PureComponent<Props, State> {
  state: State = { target: null, language: 'bash' };

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { target, language } = this.state;

    if(target) {
      return (
        <div>
          <DropdownMenu triggerType="button" items={items} onItemActivated={this.handleLanguageChange}>
            {language}
          </DropdownMenu>
        </div>
      );
    }

    return null;

  }

  private handlePluginStateChange = (pluginState: CodeBlockState) => {
    this.setState({
      target: pluginState.target,
      language: this.state.language
    });
  }

  private handleLanguageChange = (activedItem: any) => {
    const target = this.state.target;
    if(target) {
      target.attrs.language = activedItem.item.content;
      this.setState({
        target: this.state.target,
        language: activedItem.item.content
      });

      console.log(target.attrs.language);
    }
  }
}
