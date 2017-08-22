// @flow
import React, { PureComponent } from 'react';
import GlobalItemInner from '../styled/GlobalItemInner';
import DefaultLinkComponent from './DefaultLinkComponent';
import type { ReactElement, ReactClass } from '../../types';

type Props = {|
  /** Element to be rendered inside the item. Should be an atlaskit icon. */
  children?: ReactElement,
  /** href to pass to linkComponent.  */
  href?: string,
  /** Set the size of the item's content.  */
  size?: 'small' | 'medium' | 'large',
  /** Component to be used to create the link in the global item. A default
  component is used if none is provided. */
  linkComponent?: ReactClass,
  /** ARIA role to apply to the global item. */
  role?: string,
  /** Standard aria-haspopup prop */
  'aria-haspopup'?: string, // eslint-disable-line react/no-unused-prop-types
  /** Standard onClick event */
  onClick?: (event: MouseEvent) => {},
  onMouseDown?: (event: MouseEvent) => {},
|}

export default class GlobalItem extends PureComponent {
  static defaultProps = {
    size: 'small',
    linkComponent: DefaultLinkComponent,
  };

  props: Props

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && this.props.onClick) {
      this.props.onClick(event);
    }
  }

  render() {
    const {
      href,
      linkComponent: Link,
      size,
      'aria-haspopup': ariaHasPopup, // eslint-disable-line react/prop-types
      onClick,
      onMouseDown,
      role,
    } = this.props;

    const allyAndEventProps = {
      'aria-haspopup': ariaHasPopup,
      onClick,
      onMouseDown,
      role,
      onKeyDown: this.handleKeyDown,
    };

    if (href) {
      return (
        <Link href={href} {...allyAndEventProps}>
          <GlobalItemInner size={size}>
            {this.props.children}
          </GlobalItemInner>
        </Link>
      );
    }

    return (
      <GlobalItemInner size={size} tabIndex={0} {...allyAndEventProps}>
        {this.props.children}
      </GlobalItemInner>
    );
  }
}
