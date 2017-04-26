import React, { PureComponent, PropTypes } from 'react';
import GlobalItemInner from '../styled/GlobalItemInner';
import DefaultLinkComponent from './DefaultLinkComponent';

export default class GlobalItem extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    href: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    linkComponent: PropTypes.func,
  };
  static defaultProps = {
    appearance: 'global',
    size: 'small',
    linkComponent: DefaultLinkComponent,
  };

  render() {
    const {
      href,
      linkComponent: Link,
      size,
    } = this.props;
    return (
      <Link href={href}>
        <GlobalItemInner size={size}>
          {this.props.children}
        </GlobalItemInner>
      </Link>
    );
  }
}
