import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

import Page from '../components/Page';
import Home from '../pages/Home';
import About from '../pages/About';
import Components from '../pages/Components';
import Nav from './Nav';

export default class App extends PureComponent {
  state = {
    isNavigationOpen: true,
    isSearchDrawerOpen: false,
    navigationWidth: 304,
  }
  handleSearchToggle = (isSearchDrawerOpen) => {
    this.setState({ isSearchDrawerOpen });
  }
  render() {
    const { isSearchDrawerOpen, navigationWidth } = this.state;
    return (
      <Router>
        <Page
          navigationWidth={navigationWidth}
          navigation={(
            <Nav
              isSearchDrawerOpen={isSearchDrawerOpen}
              onSearchDrawerToggle={this.handleSearchToggle}
            />
          )}
        >
          <Route exact path="/" component={Home} />
          <Container>
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
  max-width: 600px;
  padding-left: 12px;
  padding-right: 12px;

  @media (min-navigationWidth: 600px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;
