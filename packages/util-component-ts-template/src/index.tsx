import * as React from 'react';
import { PureComponent } from 'react';
import * as styles from './styles';

interface Props {
  audienceName?: string;
  onTextClicked?: () => void;
}

interface State {}

export default class ComponentTemplate extends PureComponent<Props, State> {
  static defaultProps = {
    audienceName: 'world',
    onTextClicked: () => {},
  };

  render() {
    return (
      <button
        className={styles.root}
        onClick={this.props.onTextClicked}
      >
        Hello {this.props.audienceName}!
      </button>
    );
  }
}
