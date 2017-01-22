import React, { PropTypes, PureComponent } from 'react';
import RouterLinkComponent from './RouterLinkComponent';
import { AkContainerHeader } from '../../../src/index';
import nucleusLogo from '../../nucleus.png';

export default class RouterHeader extends PureComponent {
  static propTypes = {
    to: PropTypes.string,
  }

  render() {
    return (
      <AkContainerHeader
        href={this.props.to}
        icon={<img alt="nucleus" src={nucleusLogo} />}
        linkComponent={RouterLinkComponent}
        text="AtlasCat"
      />
    );
  }
}
