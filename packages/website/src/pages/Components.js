import React from 'react';

import {
  Route,
  Link,
} from 'react-router-dom';

import components from '../components';

import Component from './Component';

/* eslint-disable react/prop-types */

const Components = ({ match }) => (
  <div>
    <h2>Components</h2>
    <ul>
      {Object.keys(components).map((key) => {
        const component = components[key];
        return (
          <li key={key}>
            <Link to={`${match.url}/${key}`}>
              {component.name}
            </Link>
          </li>
        );
      })}
    </ul>

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
