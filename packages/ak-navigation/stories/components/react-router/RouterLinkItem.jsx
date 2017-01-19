import React, { PropTypes, PureComponent } from 'react';
import RouterLinkComponent from './RouterLinkComponent';
import { AkContainerItem } from '../../../src/index';

export default class RouterLinkItem extends PureComponent {
  static propTypes = {
    to: PropTypes.string,
    text: PropTypes.string,
  }
  static contextTypes = {
    router: PropTypes.object,
  }

  render() {
    return (
      <AkContainerItem
        href={this.props.to}
        isSelected={this.context.router.isActive(this.props.to, true)}
        linkComponent={RouterLinkComponent}
        text={this.props.text}
      />
    );
  }
}
