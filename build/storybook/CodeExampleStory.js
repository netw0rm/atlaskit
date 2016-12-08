import Highlight from 'react-highlight';
import React, { Component } from 'react';
import jsxToString from 'jsx-to-string';
import SplitPane from 'react-split-pane';

import { locals as styles } from './styles.less';

const transformScripts = scripts => scripts.map(scr => scr.toString()).join('\n\n');

// eslint-disable-next-line react/prefer-stateless-function
export default class CodeExampleStory extends Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    scripts: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    language: 'HTML',
    scripts: [],
    overrides: {},
  }

  render() {
    return (
      <div>
        <SplitPane split="vertical" defaultSize={'50%'} primary="second">
          <div>
            {this.props.children}
          </div>
          <div className={styles.storiesWithCodeExamples}>
            <SplitPane split="horizontal" defaultSize={'90%'} primary="first">
              <div className={styles.jsx}>
                <Highlight className="HTML">
                  {jsxToString(this.props.children, {
                    detectFunctions: true,
                  })}
                </Highlight>
              </div>
              <div className={styles.js}>
                <Highlight className="JavaScript">
                  {transformScripts(this.props.scripts)}
                </Highlight>
              </div>
            </SplitPane>
          </div>
        </SplitPane>
      </div>
    );
  }
}
