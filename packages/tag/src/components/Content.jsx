import React, { PureComponent } from 'react';
import { Link, Text } from '../styled/Content';
import { ReactElement, tagColor } from '../types';

type Props = {|
  children: ReactElement,
  href?: string,
  isFocused?: bool,
  isRemovable?: bool,
  markedForRemoval?: bool,
  color: tagColor,
|}

export default class Content extends PureComponent {
  props: Props

  render() {
    const { children, href, isFocused, isRemovable, markedForRemoval, color } = this.props;
    const styledProps = { isFocused, isRemovable, markedForRemoval, color };

    return href ? (
      <Link {...styledProps} href={href} tabIndex="-1">
        {children}
      </Link>
    ) : (
      <Text {...styledProps}>{children}</Text>
    );
  }
}
