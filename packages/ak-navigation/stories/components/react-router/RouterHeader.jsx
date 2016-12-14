import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router';
import { AkContainerHeader } from '../../../src/index';
import nucleusLogo from '../../nucleus.png';

export default class RouterHeader extends PureComponent {
  static propTypes = {
    to: PropTypes.string,
  }

  render() {
    return (
      <Link
        to={this.props.to}
      >
        <AkContainerHeader
          text={'AtlasCat'}
          icon={<img alt="nucleus" src={nucleusLogo} />}
        />
      </Link>
    );
  }
}
