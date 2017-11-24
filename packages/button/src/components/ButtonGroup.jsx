import React, { Children, cloneElement, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Group, { GroupItem } from '../styled/ButtonGroup';

function ValidateChildren(props, propName) {
  const prop = props[propName];

  let error = null;

  Children.forEach(prop, (child) => {
    if (child === null || child === false) {
      return;
    }
    if (child.type !== Button) {
      error = new Error('Children should be of type `Button`.');
    }
  });

  return error;
}

export default class ButtonGroup extends PureComponent {
  static propTypes = {
    /** The appearance to apply to all buttons. */
    appearance: PropTypes.oneOf([
      'default',
      'link',
      'primary',
      'subtle',
      'subtle-link',
      'warning',
      'danger',
      'help',
    ]),
    /** The buttons to render. */
    children: ValidateChildren,
  }

  render() {
    const { appearance, children } = this.props;

    return (
      <Group>
        {Children.map(children, (child, idx) => {
          if (child != null || child === false) {
            return child;
          }
          return (
            <GroupItem key={idx}>
              {appearance ? cloneElement(child, { appearance }) : child}
            </GroupItem>
          );
        })}
      </Group>
    );
  }
}
