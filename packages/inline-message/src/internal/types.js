// Icons
import WarningIcon from 'ak-icon/glyph/warning';
import SuccessIcon from 'ak-icon/glyph/success';

// Colours
import {
  akColorB400,
  akColorG300,
  akColorP300,
  akColorR300,
  akColorY300,
} from '@atlaskit/util-shared-styles';

const typesMapping = {
  connectivity: {
    icon: WarningIcon,
    iconColor: akColorB400,
  },
  confirmation: {
    icon: SuccessIcon,
    iconColor: akColorG300,
  },
  info: {
    icon: WarningIcon,
    iconColor: akColorP300,
  },
  warning: {
    icon: WarningIcon,
    iconColor: akColorY300,
  },
  error: {
    icon: WarningIcon,
    iconColor: akColorR300,
  },
};

export default typesMapping;

export const types = Object.keys(typesMapping);

export const defaultType = types[0];
