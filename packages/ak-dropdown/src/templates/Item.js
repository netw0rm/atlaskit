import { vdom } from 'skatejs';
import classNames from 'classnames';
import shadowItemStyles from '../less/shadow-item.less';

import Text from './Text';
import Href from './Href';

/* eslint-disable react/prop-types */
export default (props, children) => {
  const Item = props.href || props.target ? Href : Text;

  const classes = classNames(
    [shadowItemStyles.locals.item, Object.assign({
      [shadowItemStyles.locals.disabled]: props.disabled,
      [shadowItemStyles.locals.active]: props.active,
      [shadowItemStyles.locals.hidden]: props.hidden,
    }), props.classes]
  );

  return (
    <Item
      tabindex="0"
      className={classes}
      aria-disabled={props.disabled}
      aria-hidden={props.hidden}
      {...props}
    >
      {children()}
    </Item>
  );
};
