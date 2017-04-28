import * as React from 'react';
import { PropTypes, PureComponent } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { supportedLanguages } from './supportedLanguages';
import { Theme, applyTheme } from './themes/themeBuilder';

export interface CodeBlockProps {
  text: string;
  language?: string;
  showLineNumbers?: boolean;
  theme?: Theme;
}

export default class CodeBlock extends PureComponent<CodeBlockProps, {}> {

  static displayName = 'CodeBlock';

  static propTypes = {

    /** The code to be formatted */
    text: PropTypes.string.isRequired,

    /** The language in which the code is written */
    language: PropTypes.oneOf(supportedLanguages),

    /** Indicates whether or not to show line numbers */
    showLineNumbers: PropTypes.bool,

    /** A custom theme to be applied, implements the Theme interface */
    theme: PropTypes.object
  };

  static defaultProps = {
    showLineNumbers: true,
    theme: {}
  };

  render() {
    const { language } = this.props;
    const { lineNumberContainerStyle, codeBlockStyle, codeContainerStyle } = applyTheme(this.props.theme);
    const props = {
      language,
      style: codeBlockStyle,
      showLineNumbers: this.props.showLineNumbers,
      codeTagProps: { style: codeContainerStyle },
      lineNumberContainerStyle
    };
    return (
      <SyntaxHighlighter {...props}>
        {this.props.text.toString()}
      </SyntaxHighlighter>
    );
  }
}
