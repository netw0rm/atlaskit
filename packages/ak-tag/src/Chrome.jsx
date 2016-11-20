import React from 'react';
import classnames from 'classnames';

import keyHandler from './internal/keyHandler';
import styles from './styles.less';

const attachKeyHandlers = (elem) => {
  const followLink = () => {
    elem.querySelector('a').click();
  };
  keyHandler(elem, followLink);
};

/* eslint-disable react/prop-types */
export default (props) => {
  const classNames = classnames({
    [styles.locals.chrome]: true,
    [styles.locals.markedForRemoval]: props.markedForRemoval,
    [styles.locals.isRemovable]: props.isRemovable,
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
      tabIndex={props.isLinked ? 0 : -1}
      className={classNames}
      onMouseDown={e => (e.preventDefault())}
    >
      {props.children}
    </span>
  );
};
