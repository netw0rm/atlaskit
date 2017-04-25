import Select from '@atlaskit/single-select';
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
  language?: string;
  supportedLanguages?: object[];
  toolbarVisible?: boolean;
  isLanguageSelectOpen?: boolean;
  languageSelectFocused?: boolean;
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
      'items': createLanguageList(supportedLanguages).map((language) => ({ content: language, value: language }))
    }];
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  setLanguageSelectFocused = (event) => {
    this.setState({
      languageSelectFocused: true,
    });
  }

  render() {
    const {
      language,
      element,
      toolbarVisible,
      languageSelectFocused
    } = this.state;

    if (toolbarVisible || languageSelectFocused) {
      return (
        <FloatingToolbar target={element} align="left" autoPosition className={styles.floatingToolbar}>
          <div
            tabIndex={0}
            className={styles.container}
            onMouseDown={this.setLanguageSelectFocused}
          >
            <Select
              id="test"
              hasAutocomplete
              items={this.items}
              onSelected={this.handleLanguageChange}
              defaultSelected={{ content: language, value: language }}
              placeholder="Select language"
            />
          </div>
        </FloatingToolbar>
      );
    }

    return null;
  }

  private handlePluginStateChange = (pluginState: CodeBlockState) => {
    const { element, language, toolbarVisible } = pluginState;
    const { supportedLanguages } = this.state;

    const matchedLanguage = findMatchedLanguage(supportedLanguages!, language);
    const updatedLanguage = this.optionToLanguage(matchedLanguage);

    const languageSelectFocused = !this.state.toolbarVisible && toolbarVisible ? false : this.state.languageSelectFocused;

    this.setState({
      language: matchedLanguage,
      element,
      toolbarVisible,
      languageSelectFocused,
    });

    if (language !== updatedLanguage) {
      this.props.pluginState.updateLanguage(updatedLanguage, this.props.editorView);
    }
  }

  private handleLanguageChange = (language: any) => {
    this.props.pluginState.updateLanguage(language.item.value, this.props.editorView);
    this.props.editorView.focus();
    this.setState({
      toolbarVisible: true,
      languageSelectFocused: false,
    });
  }

  private optionToLanguage(languageOption: string): string | undefined {
    return languageOption.toLowerCase() === NO_LANGUAGE.toLowerCase() ? undefined : languageOption;
  }
}
