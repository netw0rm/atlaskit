import React from 'react';
import { Route } from 'react-router-dom';
import Component from './Component';

// eslint-disable-next-line react/prop-types
const Components = ({ match }) => (
  <div>
    <Route path={`${match.url}/:component`} component={Component} />
    <Route
      exact
      path={match.url} render={() => (
        <h3>Please select a component.</h3>
      )}
    />
  </div>
);

export default Components;
