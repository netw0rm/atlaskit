import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/ContainerHeader.less';
import DefaultLinkComponent from './DefaultLinkComponent';

export default class ContainerHeader extends PureComponent {
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
    } = this.props;
    const Link = this.props.linkComponent;

    return (
      <div className={styles.containerHeaderWrapper}>
        <Link className={styles.link} href={href}>
          <div className={styles.containerHeader}>
            <div className={styles.icon}>
              {this.props.icon}
            </div>
            <div className={styles.text}> {text} </div>
          </div>
        </Link>
      </div>
    );
  }
}

