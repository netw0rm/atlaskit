import * as React from 'react';
import { PureComponent } from 'react';
import * as cx from 'classnames';
import * as styles from './styles';

export interface Props extends React.Props<Mention> {
  id: string;
  text: string;
  isHighlighted?: boolean;
}

export default class Mention extends PureComponent<Props, {}> {
  render() {
    const { props } = this;
    const classNames = cx(styles.mention, {
      [styles.highlighted]: props.isHighlighted
    });

    return (
      <span className={classNames}>{props.text}</span>
    );
  }
}
