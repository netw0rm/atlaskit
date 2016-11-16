/** @jsx vdom */

import { vdom } from 'skatejs';

import Text from './Text';
import Href from './Href';

/* eslint-disable react/prop-types */
export default (props, children) => {
  const Label = props.href ? Href : Text;
  return (
    <Label href={props.href}>
      {children()}
    </Label>
  );
};
