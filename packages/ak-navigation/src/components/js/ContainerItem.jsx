import React, { PureComponent, PropTypes } from 'react';
import {
  containerItemInner,
  containerItemOuter,
  icon,
  isSelected,
  text,
} from 'style!../less/ContainerItem.less';
import className from 'classnames';

export default class ContainerItem extends PureComponent {
  static propTypes = {
    text: PropTypes.node,
    icon: PropTypes.node,
    isSelected: PropTypes.bool,
  }

  render() {
    return (
      <div
        className={className(containerItemOuter, {
          [isSelected]: this.props.isSelected,
        })}
      >
        <div
          className={containerItemInner}
        >
          {this.props.icon ?
            <div className={icon}>{this.props.icon}</div> : null}
          <div className={text}>{this.props.text}</div>
        </div>
      </div>
    );
  }
}
