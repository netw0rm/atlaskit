import DropdownMenu from 'ak-dropdown-menu';
import * as React from 'react';
import { PureComponent } from 'react';

import { CodeBlockState } from '../../plugins/code-block';
import FloatingToolbar from '../FloatingToolbar';
import languageList, { findMatchedLanguage, NO_LANGUAGE } from './languageList';
import * as styles from './styles';

export interface Props {
  pluginState: CodeBlockState;
}

export interface State {
  active?: boolean;
  element?: HTMLElement;
  language: string;
  showToolbar?: boolean;
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
    const { language, element, showToolbar } = this.state;

    if (showToolbar) {
      return (
        <FloatingToolbar target={element} align="left" autoPosition>
          <div className={styles.container}>
            <DropdownMenu triggerType="button" items={items} onItemActivated={this.handleLanguageChange}>
              {language}
            </DropdownMenu>
          </div>
        </FloatingToolbar>
      );
    }

    return null;
  }

  private handlePluginStateChange = (pluginState: CodeBlockState) => {
    const { element, language, clicked} = pluginState;
    const showToolbar = !!element && (clicked || this.state.element !== element);

    this.setState({
      language: findMatchedLanguage(language),
      element: element,
      showToolbar: showToolbar
    });
  }

  private handleLanguageChange = (activeItem: any) => {
    const selectedLanguage = activeItem.item.content;
    const language = selectedLanguage.toLowerCase() === NO_LANGUAGE.toLowerCase() ? undefined : selectedLanguage;
    this.props.pluginState.updateLanguage(language);
  }
}
