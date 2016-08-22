import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';
/* eslint-disable react/prop-types */
export default (props, children) => {
  const classes = [shadowStyles.locals.chrome];
  if (props.markedForRemoval) {
    classes.push(shadowStyles.locals.markedForRemoval);
  }

  if (props.isLinked) {
    classes.push(shadowStyles.locals.isLinked);
  }

  if (props.isRemovable) {
    classes.push(shadowStyles.locals.isRemovable);
  }

  return (<span
    {...props}
    className={classNames(classes)}
  >
      {children()}
  </span>);
};
