import { vdom } from 'skatejs';
import classnames from 'classnames';
import shadowStyles from './shadow.less';

/* eslint-disable react/prop-types */
export default (props, children) => {
  const animationWrapperClasses = classnames({
    [shadowStyles.locals.animationWrapper]: true,
    [shadowStyles.locals.isRemoving]: props.isRemoving,
    [shadowStyles.locals.isRemoved]: props.isRemoved,
  });

  const onAnimationend = (e) => {
    if (e.animationName === shadowStyles.locals.removeAnimation) {
      props.afterAnimation();
    }
  };

  return (<div
    {...props}
    className={animationWrapperClasses}
    onAnimationend={onAnimationend}
  >
    {children()}
  </div>);
};
