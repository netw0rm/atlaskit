// @flow
// Icons

import type { ___Icon } from '@atlaskit/icon';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';

type IconSize = 'small' | 'medium' | 'large' | 'xlarge'

type IconType = {|
  iconSize: IconSize,
  icon: ___Icon,
|};

type IconTypeMap = {|
  'connectivity': IconType,
  'confirmation': IconType,
  'info': IconType,
  'warning': IconType,
  'error': IconType
|};

const typesMapping: IconTypeMap = {
  connectivity: {
    icon: WarningIcon,
    iconSize: 'medium',
  },
  confirmation: {
    icon: CheckCircleIcon,
    iconSize: 'small',
  },
  info: {
    icon: WarningIcon,
    iconSize: 'medium',
  },
  warning: {
    icon: WarningIcon,
    iconSize: 'medium',
  },
  error: {
    icon: WarningIcon,
    iconSize: 'medium',
  },
};

export default typesMapping;

export const types = Object.keys(typesMapping);

export const defaultType = 'connectivity';
