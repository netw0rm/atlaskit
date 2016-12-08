import Highlight from 'react-highlight';
import React, { Component } from 'react';
import jsxToString from 'jsx-to-string';
import SplitPane from '@kadira/react-split-pane';

import { locals as styles } from './styles.less';

const transformScripts = scripts => scripts.map(scr => scr.toString()).join('\n\n');

// eslint-disable-next-line prefer-template
const transformImports = imports => imports.map(imp => `import ${imp[0]} from ${imp[1]};`).join('\n') + '\n\n';

// eslint-disable-next-line react/prefer-stateless-function
export default class CodeExampleStory extends Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    scripts: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
    imports: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
    overrides: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    language: 'HTML',
    scripts: [],
    imports: [],
  }

  render() {
    return (
      <div>
        <SplitPane split="vertical" defaultSize={'50%'} primary="second">
          <div>
            {this.props.children}
          </div>
          <div className={styles.storiesWithCodeExamples}>
            <SplitPane split="horizontal" defaultSize={'80%'} primary="first">
              <div className={styles.jsx}>
                <Highlight className="HTML">
                  {jsxToString(this.props.children, {
                    detectFunctions: !this.props.overrides,
                    keyValueOverride: { ...this.props.overrides },
                  })}
                </Highlight>
              </div>
              {this.props.scripts || this.props.imports ? <div className={styles.js}>
                <Highlight className="JavaScript">
                  {transformImports(this.props.imports)}
                  {transformScripts(this.props.scripts)}
                </Highlight>
              </div> : null}
            </SplitPane>
          </div>
        </SplitPane>
      </div>
    );
  }
}
