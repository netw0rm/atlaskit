import * as React from 'react';
import { PureComponent } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { applyTheme } from './themes/themeBuilder';

export interface CodeProps {
  language?: string;
  text: string;
  theme?: object;
}

export default class Code extends PureComponent<CodeProps, {}> {

  static displayName = 'Code';

  static propTypes = {

    /** The language in which the code is written */
    language: 'string',

    /** The code to be formatted */
    text: 'string',

    /** A custom theme to be applied, implements the Theme interface */
    theme: 'object'
  };

  static defaultProps = {
    theme: {}
  };

  render() {
    const { inlineCodeStyle } = applyTheme(this.props.theme);
    return (
      <SyntaxHighlighter
        language={this.props.language}
        style={inlineCodeStyle}
        showLineNumbers={false}
      >
        {this.props.text}
      </SyntaxHighlighter>
    );
  }
}
