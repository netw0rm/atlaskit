import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/ContainerTitle.less';
import DefaultLinkComponent from './DefaultLinkComponent';

export default class ContainerTitle extends PureComponent {
  static propTypes = {
    icon: PropTypes.node,
    text: PropTypes.string,
    subText: PropTypes.string,
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
      subText,
      linkComponent: Link,
    } = this.props;

    return (
      <Link className={styles.link} href={href}>
        <div className={styles.containerTitle}>
          <div className={styles.icon}>
            {this.props.icon}
          </div>
          <div className={styles.textContainer}>
            <div className={styles.text}>{text}</div>
            {subText ? <div className={styles.subText}>{subText}</div> : null}
          </div>
        </div>
      </Link>
    );
  }
}
