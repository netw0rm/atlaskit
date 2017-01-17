// Icons
import WarningIcon from 'ak-icon/glyph/warning';
import SuccessIcon from 'ak-icon/glyph/success';

// Colours
import {
  akColorB400,
  akColorB300,
  akColorB500,
  akColorG200,
  akColorG300,
  akColorG400,
  akColorP200,
  akColorP300,
  akColorP500,
  akColorR200,
  akColorR300,
  akColorR500,
  akColorY200,
  akColorY300,
  akColorY500,
} from 'akutil-shared-styles';

const typesMapping = {
  connectivity: {
    icon: WarningIcon,
    iconColor: akColorB400,
    iconHoverColor: akColorB500,
    iconActiveColor: akColorB300,
  },
  confirmation: {
    icon: SuccessIcon,
    iconColor: akColorG300,
    iconHoverColor: akColorG400,
    iconActiveColor: akColorG200,
  },
  info: {
    icon: WarningIcon,
    iconColor: akColorP300,
    iconHoverColor: akColorP500,
    iconActiveColor: akColorP200,
  },
  warning: {
    icon: WarningIcon,
    iconColor: akColorY300,
    iconHoverColor: akColorY500,
    iconActiveColor: akColorY200,
  },
  error: {
    icon: WarningIcon,
    iconColor: akColorR300,
    iconHoverColor: akColorR500,
    iconActiveColor: akColorR200,
  },
};

export default typesMapping;

export const types = Object.keys(typesMapping);

export const defaultType = types[0];
