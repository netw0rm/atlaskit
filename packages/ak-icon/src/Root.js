import { vdom } from 'skatejs';
import classnames from 'classnames';

import shadowStyles from './shadow.less';

/* eslint-disable react/prop-types */
export default (props, children) => {
  const classes = {
    [shadowStyles.locals.icon]: true,
    [shadowStyles.locals[props.size]]: !!props.size,
  };
  return (
    <div className={classnames(classes)}>
      <style>{shadowStyles.toString()}</style>
      {children()}
    </div>
  );
};
