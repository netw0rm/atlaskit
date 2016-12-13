import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router';
import { AkContainerItem } from '../../../src/index';

export default class RouterLink extends PureComponent {
  static propTypes = {
    to: PropTypes.string,
    text: PropTypes.string,
  }
  static contextTypes = {
    router: PropTypes.object,
  }

  render() {
    return (
      <Link
        to={this.props.to}
      >
        <AkContainerItem
          text={this.props.text}
          isSelected={this.context.router.isActive(this.props.to, true)}
        />
      </Link>
    );
  }
}
