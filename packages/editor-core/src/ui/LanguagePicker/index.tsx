import DropdownMenu from '@atlaskit/dropdown-menu';
import * as React from 'react';
import { PureComponent } from 'react';

import { CodeBlockState } from '../../plugins/code-block';
import { EditorView } from '../../prosemirror';
import FloatingToolbar from '../FloatingToolbar';
import {
  createLanguageList,
  filterSupportedLanguages,
  findMatchedLanguage,
  NO_LANGUAGE
} from './languageList';
import * as styles from './styles';

export interface Props {
  editorView: EditorView;
  pluginState: CodeBlockState;
}

export interface State {
  active?: boolean;
  element?: HTMLElement;
  language: string;
  supportedLanguages: object[];
  toolbarVisible?: boolean;
}

export default class LanguagePicker extends PureComponent<Props, State> {
  items: object[];

  constructor (props) {
    super(props);

    this.state = {
      language: NO_LANGUAGE,
      toolbarVisible: false,
      supportedLanguages: filterSupportedLanguages(props.pluginState.supportedLanguages)
    } as State;
  }

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
    const { supportedLanguages } = this.state;

    this.items = [{
      'items': createLanguageList(supportedLanguages).map((language) => ({ content: language }))
    }];
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { language, element, toolbarVisible } = this.state;

    if (toolbarVisible) {
      return (
        <FloatingToolbar target={element} align="left" autoPosition>
          <div className={styles.container}>
            <DropdownMenu triggerType="button" items={this.items} onItemActivated={this.handleLanguageChange}>
              {language}
            </DropdownMenu>
          </div>
        </FloatingToolbar>
      );
    }

    return null;
  }

  private handlePluginStateChange = (pluginState: CodeBlockState) => {
    const { element, language, toolbarVisible } = pluginState;
    const { supportedLanguages } = this.state;

    const matchedLanguage = findMatchedLanguage(supportedLanguages, language);
    const updatedLanguage = this.optionToLanguage(matchedLanguage);

    this.setState({
      language: matchedLanguage,
      element,
      toolbarVisible
    });

    if (language !== updatedLanguage) {
      this.props.pluginState.updateLanguage(updatedLanguage, this.props.editorView);
    }
  }

  private handleLanguageChange = (activeItem: any) => {
    const language = this.optionToLanguage(activeItem.item.content);
    this.props.pluginState.updateLanguage(language, this.props.editorView);
  }

  private optionToLanguage(languageOption: string): string | undefined {
    return languageOption.toLowerCase() === NO_LANGUAGE.toLowerCase() ? undefined : languageOption;
  }
}
