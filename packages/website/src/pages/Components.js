import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Component from './Component';

const Components = () => (
  <Header>
    <h1>Components</h1>
  </Header>
);

// eslint-disable-next-line react/prop-types
export default ({ match }) => (
  <div>
    <Route path={`${match.url}/:component`} component={Component} />
    <Route
      exact
      path={match.url} component={Components}
    />
  </div>
);

const Header = styled.header`
  padding-bottom: 24px;
  padding-top: 24px;
`;
