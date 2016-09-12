import { vdom } from 'skatejs';
import classnames from 'classnames';
import { KeyPressHandler } from 'akutil-common';

import shadowStyles from './shadow.less';

/* eslint-disable react/prop-types */
export default (props, children) => {
  const classNames = classnames({
    [shadowStyles.locals.chrome]: true,
    [shadowStyles.locals.markedForRemoval]: props.markedForRemoval,
    [shadowStyles.locals.isLinked]: props.isLinked,
    [shadowStyles.locals.isRemovable]: props.isRemovable,
  });

  const attachKeyHandlers = (elem) => {
    if (!props.isLinked) {
      return;
    }

    const followLink = () => {
      elem.querySelector('a').click();
    };

    const handler = new KeyPressHandler('ENTER', followLink, elem);
    handler.add('SPACE', followLink);
  };

  return (
    <span
      {...props}
      tabindex={props.isLinked ? 0 : -1}
      className={classNames}
      ref={attachKeyHandlers}
      onmousedown={(e) => (e.preventDefault())}
    >
      {children()}
    </span>
  );
};
