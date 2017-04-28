import * as React from 'react';
import { PropTypes, PureComponent } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { supportedLanguages } from './supportedLanguages';
import { Theme, applyTheme } from './themes/themeBuilder';

export interface CodeProps {
  text: string;
  language?: string;
  theme?: Theme;
}

export default class Code extends PureComponent<CodeProps, {}> {

  static propTypes = {

    /** The code to be formatted */
    text: PropTypes.string.isRequired,

    /** The language in which the code is written */
    language: PropTypes.oneOf(supportedLanguages),

    /** A custom theme to be applied, implements the Theme interface */
    theme: PropTypes.object
  };

  static defaultProps = {
    language: '',
    theme: {}
  };

  render() {
    const { language } = this.props;
    const { inlineCodeStyle } = applyTheme(this.props.theme);
    const props = {
      language,
      style: inlineCodeStyle,
      showLineNumbers: false
    };
    return (
      <SyntaxHighlighter {...props}>
        {this.props.text}
      </SyntaxHighlighter>
    );
  }
}
