/** @jsx React.createElement */
import React from 'react';
import shadowStyles from './shadow.less';

const Content = props => (
  <span className={shadowStyles.locals.content}>
    {props.children}
  </span>
);
Content.propTypes = { children: React.PropTypes.node };

export default Content;
