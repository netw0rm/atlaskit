import * as React from 'react';
import { PureComponent } from 'react';
import DropdownMenu from 'ak-dropdown-menu';

import { CodeBlockState } from '../../plugins/code-block';
import { Node } from '../../prosemirror';
import Panel from '../Panel';
import languageList from './languageList';
import * as styles from './styles';

export interface Props {
  pluginState: CodeBlockState;
}

export interface State {
  targetNode?: Node;
  targetElement?: HTMLElement;
  language: string;
}

const items = [{
  'items': languageList.map((language) => {
      return {content: language};
    })
}];

const DEFAULT_LANGUAGE = languageList[0];

export default class LanguagePicker extends PureComponent<Props, State> {
  state: State = { language: DEFAULT_LANGUAGE};

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { targetNode, language, targetElement } = this.state;

    if(targetNode) {
      return (
        <Panel target={targetElement} align="left" autoPosition>
          <div className={styles.container}>
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
    const {targetNode, targetElement} = pluginState;
    let language;

    if(targetNode) {
      language = targetNode.attrs.language || DEFAULT_LANGUAGE;
    }

    this.setState({
      targetNode: targetNode,
      language: language,
      targetElement: targetElement
    });
  }

  private handleLanguageChange = (activedItem: any) => {
    this.props.pluginState.updateLanguage(activedItem.item.content);
  }
}
