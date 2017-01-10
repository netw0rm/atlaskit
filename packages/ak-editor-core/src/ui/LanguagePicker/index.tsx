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
  target?: Node;
  element?: HTMLElement;
  language: string;
}

const items = [{
  'items': languageList.map((language) => {
      return {content: language};
    })
}];

const DEFAULT_LANGUAGE = 'bash';

export default class LanguagePicker extends PureComponent<Props, State> {
  state: State = { language: DEFAULT_LANGUAGE};

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
    const {target, element} = pluginState;
    let language;

    if(target) {
      language = target.attrs.language || DEFAULT_LANGUAGE;
    }

    this.setState({
      target: target,
      language: language,
      element: element
    });
  }

  private handleLanguageChange = (activedItem: any) => {
    const {target} = this.state;

    if(target) {
      target.attrs.language = activedItem.item.content;
      this.setState({
        target: target,
        language: activedItem.item.content
      });
    }
  }
}
