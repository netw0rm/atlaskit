import * as React from 'react';
import PropTypes from 'prop-types';
import { akColorPrimary3 } from '@atlaskit/util-shared-styles';
import Avatar from './Avatar';
import { StackWrapper, ItemWrapper, MoreAvatar } from '../styled/AvatarStack';

const AvatarStack = (props) => {
  const { avatars, max, size, borderColor } = props;

  const tooManyAvatars = avatars.length > max;
  const avatarsSubset = avatars.slice(0, tooManyAvatars ? max - 1 : max);

  // reverse the array so the ordering is maintained when using flex-direction: row-reverse
  // clone the array because .reverse() mutates the array rather than returning a copy
  const avatarsReversed = [...avatarsSubset].reverse();

  return (
    <StackWrapper>
      {tooManyAvatars && (
        <ItemWrapper key="more-avatars" borderColor={borderColor}>
          <MoreAvatar avatarSize={size}>+{(avatars.length - max) + 1}</MoreAvatar>
        </ItemWrapper>
      )}
      {avatarsReversed.map((avatar, index) => (
        <ItemWrapper key={index} borderColor={borderColor}>
          <Avatar
            {...avatar}
            appearance="circle"
            size={size}
            presenceBorderColor={borderColor}
          />
        </ItemWrapper>
      ))}
    </StackWrapper>
  );
};

AvatarStack.propTypes = {
  avatars: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    icon: PropTypes.element,
    label: PropTypes.string,
    presence: PropTypes.oneOf(['none', 'online', 'busy', 'offline']),
  })).isRequired,
  max: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium']),
  borderColor: PropTypes.string,
};

AvatarStack.defaultProps = {
  size: 'medium',
  max: 5,
  borderColor: akColorPrimary3,
};

export default AvatarStack;
