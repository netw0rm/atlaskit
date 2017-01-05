import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router';
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
        linkComponent={(
          { children, href, ...props }) => <Link to={href} {...props}>{children}</Link>
        }
        text={this.props.text}
        isSelected={this.context.router.isActive(this.props.to, true)}
      />
    );
  }
}
