import { vdom } from 'skatejs';
import classNames from 'classnames';
import shadowItemStyles from '../less/shadow-item.less';

import Text from './Text';
import Href from './Href';

/* eslint-disable react/prop-types */
export default (props, children) => {
  const tabIndex = props.selected ? '1' : '0';
  const Item = props.href || props.target ? Href : Text;

  const classes = classNames(
    [shadowItemStyles.locals.item, Object.assign({
      [shadowItemStyles.locals.disabled]: props.disabled,
      [shadowItemStyles.locals.selected]: props.selected,
      [shadowItemStyles.locals.hidden]: props.hidden,
    }), props.classes]
  );

  return (
    <Item
      tabindex={tabIndex}
      className={classes}
      aria-disabled={props.disabled}
      aria-hidden={props.hidden}
      {...props}
    >
      {children()}
    </Item>
  );
};
