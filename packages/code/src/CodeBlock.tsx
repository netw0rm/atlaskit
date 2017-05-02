import * as React from 'react';
import { PureComponent } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { applyTheme } from './themes/themeBuilder';

export interface CodeBlockProps {
  language?: string;
  showLineNumbers?: boolean;
  text: string;
  theme?: object;
}

export default class CodeBlock extends PureComponent<CodeBlockProps, {}> {

  static displayName = 'CodeBlock';

  static propTypes = {

    /** The language in which the code is written */
    language: 'string',

    /** Whether or not to show line numbers */
    showLineNumbers: 'bool',

    /** The code to be formatted */
    text: 'string',

    /** A custom theme to be applied, implements the Theme interface */
    theme: 'object'
  };

  static defaultProps = {
    showLineNumbers: true,
    theme: {}
  };

  render() {
    const { lineNumberContainerStyle, codeBlockStyle, codeContainerStyle } = applyTheme(this.props.theme);
    return (
      <SyntaxHighlighter
        language={this.props.language}
        style={codeBlockStyle}
        lineNumberContainerStyle={lineNumberContainerStyle}
        showLineNumbers={this.props.showLineNumbers}
        codeTagProps={{style: codeContainerStyle}}
      >
        {this.props.text.toString()}
      </SyntaxHighlighter>
    );
  }
}
