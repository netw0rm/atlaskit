import shadowStyles from '../index.less';
import calculateCollapseProperties from './collapse-properties';
import { resizeDelta } from './symbols';
import { expandedWidth } from '../shared-variables';

export default (navigation) => {
  const {
    visibleWidth,
    totalWidth,
    containerPadding,
    xOffset,
  } = calculateCollapseProperties({
    open: navigation.open,
    containerHidden: navigation.containerHidden,
    resizeDelta: navigation[resizeDelta],
  });
  const innerTranslateX = expandedWidth - totalWidth;
  const outerTranslateX = -innerTranslateX + xOffset;
  return `
    .${shadowStyles.locals.navigationWrapper} {
      transform: translateX(${outerTranslateX}px);
    }

    .${shadowStyles.locals.navigation} {
      width: 280px;
      transform: translateX(${innerTranslateX}px);
    }

    .${shadowStyles.locals.spacer} {
      width: ${visibleWidth}px;
    }

    .${shadowStyles.locals.containerName}, .${shadowStyles.locals.containerLinks} {
      transform: translateX(${containerPadding}px);
    }`;
};
