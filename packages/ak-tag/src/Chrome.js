import { vdom } from 'skatejs';
import classnames from 'classnames';

import keyHandler from './internal/keyHandler';
import shadowStyles from './shadow.less';

const attachKeyHandlers = (elem) => {
  const followLink = () => {
    elem.querySelector('a').click();
  };
  keyHandler(elem, followLink);
};

/* eslint-disable react/prop-types */
export default (props, children) => {
  const classNames = classnames({
    [shadowStyles.locals.chrome]: true,
    [shadowStyles.locals.markedForRemoval]: props.markedForRemoval,
    [shadowStyles.locals.isLinked]: props.isLinked,
    [shadowStyles.locals.isRemovable]: props.isRemovable,
  });

  const targetProps = {};
  if (props.isLinked) {
    targetProps.role = 'link';
    targetProps.ref = attachKeyHandlers;
  }

  return (
    <span
      {...props}
      {...targetProps}
      tabindex={props.isLinked ? 0 : -1}
      className={classNames}
      onmousedown={(e) => (e.preventDefault())}
    >
      {children()}
    </span>
  );
};
