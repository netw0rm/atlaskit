import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import styled from 'styled-components';
import { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import { name } from '../package.json';
import HtmlPage from './components/HtmlPage';
import NavigationWithProjectSwitcher from './components/project-switcher/NavigationWithProjectSwitcher';
import BasicProjectSwitcher from './components/project-switcher/BasicProjectSwitcher';
import { AkContainerNavigation, AkNavigationItem } from '../src/';
import { WithRootTheme, getProvided } from '../src/theme/util';
import * as presets from '../src/theme/presets';
import { containerOpenWidth, gridSize } from '../src/shared-variables';
import NucleusIcon from './components/NucleusIcon';

const withRootTheme = children => (
  <WithRootTheme provided={presets.container}>
    {children}
  </WithRootTheme>
);

const ViewAllItem = styled(DropdownItem)`
  border-top: 1px solid ${({ theme }) => getProvided(theme).keyline};
`;

const Grid = styled.div`
  display: flex;
  height: 100vh;
`;

const Column = styled.div`
  width: ${containerOpenWidth}px;
  margin-left: ${gridSize}px;
  margin-right: ${gridSize}px;

  /* make sure it is full height */
  display: flex;
`;

const items = [
  'Project 1',
  'Project 2',
  'Project 3',
  'Project 4',
  'Project 5',
];

const dropdownItems = (
  <DropdownItemGroup title="Recent Projects">
    {
      items.map(item => <DropdownItem
        key={item}
        description="this is description"
        elemBefore={<div style={{ marginRight: gridSize }}><NucleusIcon /></div>}
      >{item}</DropdownItem>)
    }
    <ViewAllItem>View all projects</ViewAllItem>
  </DropdownItemGroup>
);

class ControlledProjectSwicther extends Component {
  state = {
    isOpen: true,
  };

  componentDidMount() {
    this.timer = setInterval(this.toggle, 200);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const dropdownProps = {
      isDropdownOpen: this.state.isOpen,
    };

    return (
      <NavigationWithProjectSwitcher
        dropdownItems={this.props.dropdownItems}
        projectSwictherProps={dropdownProps}
      />
    );
  }
}

storiesOf(`${name}/ProjectSwitcher`, module)
  .add('Simple ProjectSwitcher', () => withRootTheme(
    <NavigationWithProjectSwitcher dropdownItems={dropdownItems} />
  ))
  .add('with themes', () => (
    <HtmlPage content="">
      <Grid>
        {
          Object.keys(presets).map(key => (
            <Column key={key}>
              <AkContainerNavigation
                theme={presets[key]}
                themeName={key}
                headerComponent={() => (
                  <BasicProjectSwitcher
                    text="Project Switcher very long text"
                    icon={<NucleusIcon />}
                    subText="Software project"
                  >
                    {dropdownItems}
                  </BasicProjectSwitcher>
                )}
              >
                <AkNavigationItem
                  text="The very first item"
                  href="#1"
                />
              </AkContainerNavigation>
            </Column>
          ))
        }
      </Grid>
    </HtmlPage>
  ))
  .add('with default state = open', () => {
    const dropdownProps = {
      defaultDropdownOpen: true,
    };

    return withRootTheme(
      <NavigationWithProjectSwitcher
        dropdownItems={dropdownItems}
        projectSwictherProps={dropdownProps}
      />
    );
  })
  .add('changing isOpen programmaticaly', () => (
    withRootTheme(
      <ControlledProjectSwicther
        items={dropdownItems}
      />
    )
  ))
  .add('with loading state', () => {
    const dropdownProps = {
      defaultDropdownOpen: true,
      isDropdownLoading: true,
    };

    return withRootTheme(
      <NavigationWithProjectSwitcher
        dropdownItems={dropdownItems}
        projectSwictherProps={dropdownProps}
      />
    );
  })
  .add('callback on open change', () => {
    const dropdownProps = {
      onDropdownOpenChange: ({ isOpen }) => action('dropdown open change')(isOpen),
    };

    return withRootTheme(
      <NavigationWithProjectSwitcher
        dropdownItems={dropdownItems}
        projectSwictherProps={dropdownProps}
      />
    );
  })
;
