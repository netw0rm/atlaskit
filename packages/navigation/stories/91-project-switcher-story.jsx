import React from 'react';
import { storiesOf } from '@kadira/storybook';
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
        description={'this is description'}
        elemBefore={<NucleusIcon />}
      >{item}</DropdownItem>)
    }
    <ViewAllItem>View all projects</ViewAllItem>
  </DropdownItemGroup>
);

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
                  <BasicProjectSwitcher>{dropdownItems}</BasicProjectSwitcher>
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
;
