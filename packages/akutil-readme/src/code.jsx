import React, { PropTypes, PureComponent } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import docco from 'react-syntax-highlighter/dist/styles/docco';

const style = {
  code: {
    backgroundColor: '#f5f6f6',
    boxShadow: '0 3px 4px 0 rgba(0, 0, 0, 0.09)',
    padding: 10,
  },
  codeExample: {
    backgroundColor: '#fff',
  },
};

function getIndent(lines) {
  for (let a = 0; a < lines.length; a++) {
    const matches = lines[a].match(/^(\s*).+/);
    if (matches) {
      return matches[1].length;
    }
  }
  return 0;
}

function formatCode(code) {
  const lines = code.split('\n');
  const indent = getIndent(lines);
  return lines.map(line => line.substring(indent)).join('\n').trim();
}

export default class extends PureComponent {
  static displayName = 'AkutilReadmeCode'
  static propTypes = {
    children: PropTypes.node.isRequired,
    code: PropTypes.string,
    language: PropTypes.string,
  }
  render() {
    const { children, code, language } = this.props;
    const { code: customStyle, codeExample } = style;
    return (
      <div>
        <SyntaxHighlighter
          customStyle={customStyle}
          language={language || 'jsx'}
          style={docco}
        >{formatCode(code || children)}</SyntaxHighlighter>
        {code ? <div style={{ ...customStyle, ...codeExample }}><h6 style={{ marginBottom: 5 }}>Code example: result</h6>{children}</div> : ''}
      </div>
    );
  }
}
