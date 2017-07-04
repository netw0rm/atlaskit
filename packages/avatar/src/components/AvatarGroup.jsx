// @flow
import React, { Component, PropTypes } from 'react';
import DropdownMenu from '@atlaskit/dropdown-menu';
import Avatar from './Avatar';
import { Grid, Stack } from '../styled/AvatarGroup';
import { DEFAULT_BORDER_COLOR } from '../styled/constants';
import MoreIndicator from '../components/MoreIndicator';
import type { Size } from '../types';

const GROUP_COMPONENT = {
  grid: Grid,
  stack: Stack,
};
const MAX_COUNT = {
  grid: 11,
  stack: 5,
};

type AvatarsArray = [{
  href?: string,
  name?: string,
  src?: string,
  target?: '_blank' | '_self',
}];
type Props = {
  /** Indicates the shape of the avatar. Most avatars are circular, but square avatars
  can be used for 'container' objects. */
  appearance: 'grid' | 'stack',
  /** Component used to render each avatar */
  avatar?: Function,
  /** Typically the background color that the avatar is presented on.
  Accepts any color argument that the CSS border-color property accepts. */
  borderColor?: string,
  /** The array of avatar data used fed to the `avatar` component */
  data: AvatarsArray,
  /** The maximum number of avatars allowed in the grid */
  maxCount?: number,
  /** Handle the click event on the avatar item */
  onAvatarClick?: ({ event: Object, item: Object }) => mixed,
  /** Take control of the click event on the more indicator. This will cancel
  the default dropdown behaviour. */
  onMoreClick?: () => mixed,
  /** Defines the size of the avatar */
  size?: Size,
};

export default class AvatarGroup extends Component {
  props: Props; // eslint-disable-line react/sort-comp

  static defaultProps = {
    appearance: 'stack',
    avatar: Avatar,
    maxCount: 0,
    size: 'medium',
  }
  static childContextTypes = {
    borderColor: PropTypes.string,
    groupAppearance: PropTypes.oneOf(['grid', 'stack']),
  }
  getChildContext() {
    return {
      borderColor: this.props.borderColor,
      groupAppearance: this.props.appearance,
    };
  }

  renderMoreDropdown(max, total) {
    const { appearance, data, borderColor, onMoreClick, onAvatarClick, size } = this.props;

    // bail if there's not enough items
    if (total <= max) return null;

    // prepare the button -- we'll use it twice
    const MoreButton = props => (
      <MoreIndicator
        borderColor={borderColor || DEFAULT_BORDER_COLOR}
        count={total - max}
        isStack={appearance === 'stack'}
        onClick={() => {}} // force "interactive" styles
        size={size}
        {...props}
      />
    );

    // bail if the consumer wants to handle onClick
    if (typeof onMoreClick === 'function') {
      return <MoreButton onClick={onMoreClick} />;
    }

    // crop and prepare the dropdown items
    const items = data.slice(max).map(avatar => ({
      content: avatar.name,
      elemBefore: <Avatar {...avatar} size="small" borderColor="transparent" />,
      href: avatar.href,
      rel: avatar.target ? 'noopener noreferrer' : null,
      target: avatar.target,
    }));

    return (
      <DropdownMenu items={[{ items }]} onItemActivated={onAvatarClick} position="bottom right">
        <MoreButton />
      </DropdownMenu>
    );
  }

  render() {
    const { avatar: Item, appearance, data, maxCount, onAvatarClick, size } = this.props;

    // NOTE: conditionally defaulting the `maxCount` prop based on `appearance`
    const max = (maxCount === 0) ? MAX_COUNT[appearance] : maxCount;
    const total = data.length;
    const Group = GROUP_COMPONENT[appearance];

    const items = data.slice(0, max).map((avatar, idx) => (
      <Item
        {...avatar}
        groupAppearance={appearance}
        index={idx}
        onClick={onAvatarClick || avatar.onClick}
        stackIndex={max - idx}
        size={size}
      />
    ));

    return (
      <Group size={size}>
        {items}
        {this.renderMoreDropdown(max, total)}
      </Group>
    );
  }
}
