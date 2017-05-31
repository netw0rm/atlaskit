import * as React from 'react';
import PropTypes from 'prop-types';
import AvatarStack from './AvatarStack';

const AvatarGroup = (props) => {
  const { avatars, max, size, borderColor } = props;
  return (
    <AvatarStack
      avatars={avatars}
      max={max}
      size={size}
      borderColor={borderColor}
    />
  );
};

AvatarGroup.propTypes = {
  appearance: PropTypes.oneOf(['stack']), // eslint-disable-line react/no-unused-prop-types
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

export default AvatarGroup;
