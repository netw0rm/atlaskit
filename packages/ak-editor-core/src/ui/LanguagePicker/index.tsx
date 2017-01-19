import DropdownMenu from 'ak-dropdown-menu';
import * as React from 'react';
import { PureComponent } from 'react';

import { CodeBlockState } from '../../plugins/code-block';
import Panel from '../Panel';
import languageList, { findMatchedLanguage, NO_LANGUAGE } from './languageList';
import * as styles from './styles';

export interface Props {
  pluginState: CodeBlockState;
}

export interface State {
  active?: boolean;
  element?: HTMLElement;
  language: string;
}

const items = [{
  'items': languageList.map((language) => {
    return { content: language };
  })
}];

export default class LanguagePicker extends PureComponent<Props, State> {
  state: State = { language: NO_LANGUAGE };

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { active, language, element } = this.state;

    if (active) {
      return (
        <Panel target={element} align="left" autoPosition>
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
    const {active, element, language} = pluginState;

    this.setState({
      active: active,
      language: findMatchedLanguage(language),
      element: element
    });
  }

  private handleLanguageChange = (activeItem: any) => {
    const selectedLanguage = activeItem.item.content;
    const language = selectedLanguage.toLowerCase() === NO_LANGUAGE.toLowerCase() ? null : selectedLanguage;
    this.props.pluginState.updateLanguage(language);
  }
}
