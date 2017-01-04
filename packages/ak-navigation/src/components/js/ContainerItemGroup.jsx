import React, { PureComponent, PropTypes } from 'react';
import {
  action,
  header,
  title,
} from 'style!../less/ContainerItemGroup.less';
// import className from 'classnames';

export default class ContainerItemGroup extends PureComponent {
  static propTypes = {
    action: PropTypes.node,
    children: PropTypes.node,
    title: PropTypes.string,
  }

  render() {
    return (
      <div>
        <div className={header}>
          <div className={title}><span>{this.props.title}</span></div>
          {this.props.action ?
            <div className={action}>
              {this.props.action}
            </div>
          : null}
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
