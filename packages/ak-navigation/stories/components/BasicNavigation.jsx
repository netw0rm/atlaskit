import React, { Component, PropTypes } from 'react';
import { action } from '@kadira/storybook';
import { AtlassianIcon, SearchIcon, CreateIcon, DashboardIcon, SettingsIcon, ProjectsIcon } from 'ak-icon';
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
          icon={<DashboardIcon />}
          text="Item A"
        />
        <AkContainerItem
          icon={<SettingsIcon />}
          text="Item B"
        />
        <AkContainerItem
          icon={<ProjectsIcon />}
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
        globalPrimaryIcon={<AtlassianIcon size="medium" />}
        globalSearchIcon={<SearchIcon />}
        globalCreateIcon={<CreateIcon />}
        {...this.props}
      >
        {this.props.children}
      </Navigation>
    );
  }
}
