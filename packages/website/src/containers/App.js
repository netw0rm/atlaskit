/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import Page from '@atlaskit/page';
import Nav from './Nav';

import Home from '../pages/Home';
import About from '../pages/About';
import Components from '../pages/Components';

export default class App extends PureComponent {
  state = {
    isNavigationOpen: true,
    isSearchDrawerOpen: false,
    navigationWidth: 304,
  }

  onNavResize = ({ width, isOpen }) => {
    this.setState({
      navigationWidth: width,
      isNavigationOpen: isOpen,
    });
  }

  onSearchDrawerToggle = (isSearchDrawerOpen) => {
    this.setState({ isSearchDrawerOpen });
  }
  render() {
    return (
      <Router>
        <Page
          navigationWidth={this.state.navigationWidth}
          navigation={<Nav onResize={this.onNavResize} />}
        >
          <Container>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/components" component={Components} />
          </Container>
        </Page>
      </Router>
    );
  }
}

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  padding-left: 12px;
  padding-right: 12px;

  @media (min-width: 600px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;
