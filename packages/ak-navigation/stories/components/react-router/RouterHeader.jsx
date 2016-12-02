import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router';
import { AkContainerHeader } from '../../../src/index';
import nucleusLogo from '../../nucleus.png';

// eslint-disable-next-line react/prefer-stateless-function
export default class RouterHeader extends PureComponent {
  static get propTypes() {
    return {
      to: PropTypes.string,
    };
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
