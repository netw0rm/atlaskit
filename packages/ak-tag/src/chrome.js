import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';
import classnames from 'classnames';
/* eslint-disable react/prop-types */
export default (props, children) => {
  const classNames = classnames({
    [shadowStyles.locals.chrome]: true,
    [shadowStyles.locals.markedForRemoval]: props.markedForRemoval,
    [shadowStyles.locals.isLinked]: props.isLinked,
    [shadowStyles.locals.isRemovable]: props.isRemovable,
  });

  return (
    <span {...props} className={classNames}>
      {children()}
    </span>
  );
};
