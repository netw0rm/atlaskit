import shadowStyles from '../index.less';
import {
  getContainerPadding,
  getNavigationWidth,
  getNavigationXOffset,
  getSpacerWidth,
} from './collapse';

export default (navigation) => {
  const innerTranslateX = 280 - getNavigationWidth(navigation);
  const outerTranslateX = -innerTranslateX + getNavigationXOffset(navigation);
  return `
    .${shadowStyles.locals.navigationWrapper} {
      transform: translateX(${outerTranslateX}px);
    }

    .${shadowStyles.locals.navigation} {
      width: 280px;
      transform: translateX(${innerTranslateX}px);
    }

    .${shadowStyles.locals.spacer} {
      width: ${getSpacerWidth(navigation)}px;
    }

    .${shadowStyles.locals.containerName}, .${shadowStyles.locals.containerLinks} {
      transform: translateX(${getContainerPadding(navigation.width)}px);
    }`;
};
