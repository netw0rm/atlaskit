import { vdom, emit } from 'skatejs';
import classnames from 'classnames';

import { afterRemove as afterRemoveEvent } from './internal/events';
import shadowStyles from './shadow.less';


export default (elem, isRemovingSymbol) => {
  const animationWrapperClasses = classnames({
    [shadowStyles.locals.animationWrapper]: true,
    [shadowStyles.locals.isRemoving]: elem[isRemovingSymbol],
  });

  const onAnimationend = (e) => {
    if (e.animationName === shadowStyles.locals.removeAnimation) {
      emit(elem, afterRemoveEvent);
    }
  };

  return (props, children) => (<div
    {...props}
    className={animationWrapperClasses}
    onAnimationend={onAnimationend}
  >
      {children()}
  </div>);
};
