// @flow
import React, { Component, PropTypes } from 'react';
import DropdownMenu from '@atlaskit/dropdown-menu';
import Avatar from './Avatar';
import { Grid, Stack } from '../styled/AvatarGroup';
import { DEFAULT_BORDER_COLOR } from '../styled/constants';
import ExcessIndicator from '../components/ExcessIndicator';
import type { Size } from '../types';

const groupComponent = {
  grid: Grid,
  stack: Stack,
};
const stackMaxCount = 5;
const DefaultAvatarComponent = (
  { groupAppearance, index, name, size, src, stackIndex, ...rest }: {
    groupAppearance: 'grid' | 'stack',
    index: number,
    name?: string,
    size: string,
    src: string,
    stackIndex: number,
  }
) => (
  <Avatar
    groupAppearance={groupAppearance}
    index={index}
    stackIndex={stackIndex}
    key={src || index}
    name={name}
    size={size}
    src={src}
    {...rest}
  />
);

type AvatarsArray = [{
  name?: string;
  src: string;
  href?: string;
  target: '_blank' | '_self';
}];
type Props = {
  /** Indicates the shape of the avatar. Most avatars are circular, but square avatars
  can be used for 'container' objects. */
  appearance: 'grid' | 'stack',
  /** Component used to render each avatar */
  avatarComponent?: () => mixed,
  /** The array of avatar data used fed to the `avatar` component */
  data: AvatarsArray,
  /** Used to override the default border color of the presence indicator.
  Accepts any color argument that the border-color CSS property accepts. */
  borderColor?: string,
  /** The maximum number of avatars allowed in the grid */
  maxCount?: number,
  /** Take control of the click event on the excess indicator. This will circumvent
  the default dropdown behaviour. */
  onClickMore?: () => mixed,
  /** Handle the click event on the avatar item */
  onClickAvatar?: () => mixed,
  /** Handle the click event on the dropdown item */
  onClickDropdownItem?: () => mixed,
  /** Defines the size of the avatar */
  size?: Size,
};

export default class AvatarGroup extends Component {
  props: Props; // eslint-disable-line react/sort-comp

  static defaultProps = {
    appearance: 'stack',
    maxCount: 11,
    avatarComponent: DefaultAvatarComponent,
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

  renderExcessDropdown(max, total) {
    const { appearance, data, borderColor, onClickMore, onClickDropdownItem, size } = this.props;

    // only render when there's enough items
    if (total <= max) return null;

    // warn the consumer if the provide invalid props
    if (onClickMore && onClickDropdownItem && process.env.NODE_ENV !== 'production') {
      console.warn('You cannot provide both `onClickMore` AND `onClickDropdownItem` to AvatarGroup.'); // eslint-disable-line no-console
      return null;
    }

    // prepare the button -- we'll use it twice
    const ExcessButton = props => (
      <ExcessIndicator
        borderColor={borderColor || DEFAULT_BORDER_COLOR}
        count={total - max}
        isStack={appearance === 'stack'}
        size={size}
        {...props}
      />
    );

    // bail if the consumer wants to handle onClick
    if (typeof onClickMore === 'function') {
      return <ExcessButton onClick={onClickMore} />;
    }

    // crop and prepare the dropdown items
    const items = [{ items: [] }];
    data.slice(max).forEach((avatar) => {
      items[0].items.push({
        content: avatar.name,
        elemBefore: <Avatar {...avatar} size="small" />,
        href: avatar.href,
        rel: avatar.target ? 'noopener noreferrer' : null,
        target: avatar.target,
      });
    });

    return (
      <DropdownMenu items={items} onItemActivated={onClickDropdownItem} position="bottom right">
        <ExcessButton />
      </DropdownMenu>
    );
  }

  render() {
    const {
      avatarComponent: AvatarItem, appearance, data, maxCount, onClickAvatar, size,
    } = this.props;
    const Group = groupComponent[appearance];
    const isStack = appearance === 'stack';

    if (!Group && process.env.NODE_ENV !== 'production') {
      console.warn(`Cannot render group with invalid appearance: "${appearance}"`); // eslint-disable-line no-console
      return null;
    }

    const total = data.length;
    const max = (!isStack && maxCount) ? maxCount : stackMaxCount;
    const items = data.slice(0, max).map((avatar, idx) => (
      <AvatarItem
        {...avatar}
        groupAppearance={appearance}
        index={idx}
        onClick={onClickAvatar || avatar.onClick}
        stackIndex={max - idx}
        size={size}
      />
    ));

    return (
      <Group isStack={isStack}>
        {items}
        {this.renderExcessDropdown(max, total)}
      </Group>
    );
  }
}
