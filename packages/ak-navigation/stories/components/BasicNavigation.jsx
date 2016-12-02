import React, { Component, PropTypes } from 'react';
import { action } from '@kadira/storybook';
import Navigation, { AkContainerHeader, AkContainerItem } from '../../src/index';
import nucleusLogo from '../nucleus.png';

// eslint-disable-next-line react/prefer-stateless-function
export default class BasicNavigation extends Component {
  static get propTypes() {
    return {
      children: PropTypes.node,
    };
  }

  static get defaultProps() {
    return {
      children: <div>
        <AkContainerItem
          icon={<img src={nucleusLogo} alt="icon" />}
          text="Item A"
        />
        <AkContainerItem
          icon={<img src={nucleusLogo} alt="icon" />}
          text="Item B"
        />
        <AkContainerItem
          icon={<img src={nucleusLogo} alt="icon" />}
          text="Item C"
        />
      </div>,
    };
  }

  render() {
    return (
      <Navigation
        resizeHandler={action('resize')}
        containerHeader={
          <a href="#foo">
            <AkContainerHeader
              text={'AtlasCat'}
              icon={<img alt="nucleus" src={nucleusLogo} />}
            />
          </a>
        }
        {...this.props}
      >
        {this.props.children}
      </Navigation>
    );
  }
}

