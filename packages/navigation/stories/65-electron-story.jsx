import { storiesOf } from '@kadira/storybook';
import React, { Component } from 'react';
import { AkNavigationItem } from '@atlaskit/navigation';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import styled from 'styled-components';
import { name } from '../package.json';
import BasicNavigation from './components/BasicNavigation';

class MacTrafficLights extends Component {
  render() {
    return (
      <TrafficLightContainer>
        <TrafficLight color="#FF6057" />
        <TrafficLight color="#FFBD2E" />
        <TrafficLight color="#28CA42" />
      </TrafficLightContainer>
    );
  }
}

storiesOf(name, module)
  .add('with macOS electron support', () => (
    <div>
      <Page
        navigation={
          <BasicNavigation
            isElectronMac
            isResizeable
            defaultOpen
          >
            <AkNavigationItem text="Item one" />
            <AkNavigationItem text="Item two" />
            <AkNavigationItem text="Item three" />
          </BasicNavigation>
        }
      >
        <Grid>
          <GridColumn>
            Testing 123
          </GridColumn>
        </Grid>
      </Page>
      <MacTrafficLights />
    </div>
  )
);

const TrafficLight = styled.div`
  background-color: ${props => props.color};
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: inline-block;
  height: 12px;
  width: 12px;
  margin-left: 8px;
`;

const TrafficLightContainer = styled.div`
  position: fixed;
  height: 16px;
  left: 0;
  top: 5px;
  z-index: 9999;
`;
