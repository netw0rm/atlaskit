import React, { Component, PropTypes } from 'react';
import { action } from '@kadira/storybook';
import Navigation, { ContainerHeader } from '../../src/index';
import nucleusLogo from '../nucleus.png';

// eslint-disable-next-line react/prefer-stateless-function
export default class BasicNavigation extends Component {
  static get propTypes() {
    return {
      children: PropTypes.node,
    };
  }

  render() {
    return (
      <Navigation
        resizeHandler={action('resize')}
        containerHeader={
          <ContainerHeader
            text={'AtlasCat'}
            url={'#foo'}
            logo={<img alt="nucleus" src={nucleusLogo} />}
          />
        }
        {...this.props}
      >
        {this.props.children}
      </Navigation>
    );
  }
}

