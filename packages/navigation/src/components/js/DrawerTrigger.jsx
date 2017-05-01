import React, { PureComponent, PropTypes } from 'react';
import DrawerTriggerInner from '../styled/DrawerTriggerInner';

export default class DrawerTrigger extends PureComponent {
  static propTypes = {
    identity: PropTypes.string,
    children: PropTypes.node,
    onActivate: PropTypes.func,
  };
  static defaultProps = {
    onActivate: () => {},
    idenetity: '',
  };

  render() {
    if (this.props.children === null) return null;
    return (
      <DrawerTriggerInner
        aria-haspopup="true"
        id={this.props.identity}
        onClick={this.props.onActivate}
        onMouseDown={e => e.preventDefault()}
      >
        {this.props.children}
      </DrawerTriggerInner>
    );
  }
}
