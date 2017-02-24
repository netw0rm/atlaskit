import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/ContainerTitle.less';
import DefaultLinkComponent from './DefaultLinkComponent';

export default class ContainerTitle extends PureComponent {
  static propTypes = {
    icon: PropTypes.node,
    text: PropTypes.string,
    href: PropTypes.string,
    linkComponent: PropTypes.func,
  }

  static defaultProps = {
    linkComponent: DefaultLinkComponent,
  }

  render() {
    const {
      href,
      text,
      linkComponent: Link,
    } = this.props;

    return (
      <Link className={styles.link} href={href}>
        <div className={styles.containerTitle}>
          <div className={styles.icon}>
            {this.props.icon}
          </div>
          <div className={styles.text}> {text} </div>
        </div>
      </Link>
    );
  }
}
