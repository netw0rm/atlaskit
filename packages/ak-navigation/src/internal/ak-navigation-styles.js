import { vdom } from 'skatejs';
import shadowStyles from '../index.less';
import {
  getContainerPadding,
  getNavigationWidth,
  getNavigationXOffset,
  getSpacerWidth,
} from './collapse';


/* eslint-disable react/prop-types */
export default (props) => {
  if (!props.navigation) {
    return null;
  }
  return (<style>{`
      .${shadowStyles.locals.navigation} {
        width: ${getNavigationWidth(props.navigation)}px;
        transform: translateX(${getNavigationXOffset(props.navigation)}px);
      }

      .${shadowStyles.locals.spacer} {
        width: ${getSpacerWidth(props.navigation)}px;
      }

      .${shadowStyles.locals.containerName}, .${shadowStyles.locals.containerLinks} {
        transform: translateX(${getContainerPadding(props.navigation.width)}px);
      }
  `}</style>);
};
