import React, { PureComponent, PropTypes } from 'react';
import {
  action,
  header,
  noHeaderContent,
  title,
} from 'style!../less/ContainerItemGroup.less';
import className from 'classnames';

export default class ContainerItemGroup extends PureComponent {
  static propTypes = {
    action: PropTypes.node,
    children: PropTypes.node,
    title: PropTypes.string,
  }

  hasEmptyHeader = () => (!(this.props.title || this.props.action));

  render() {
    return (
      <div
        className={className({
          [noHeaderContent]: this.hasEmptyHeader(),
        })}
      >
        {this.hasEmptyHeader() ? null :
        <div className={header}>
          {this.props.title ?
            <div className={title}><span>{this.props.title}</span></div>
            : null}
          {this.props.action ?
            <div
              className={action}
            >
              {this.props.action}
            </div>
          : null}
        </div>
        }
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
