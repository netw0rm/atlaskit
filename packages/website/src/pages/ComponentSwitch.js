import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Details from './Component';
import IndexComponent from './Components';
import data from '../data';

// Prepare Data for Component Table
const dataKeys = Object.keys(data);
const formattedData = dataKeys.map((key) => {
  const c = data[key];

  return {
    description: c.package.description,
    packageName: c.package.name,
    packageNameWithoutOrg: c.package.name.replace('@atlaskit/', ''),
    maintainers: c.package.maintainers,
    name: c.name,
    publishTime: c.status.date,
    version: c.package.version,
  };
});
const Index = () => <IndexComponent components={formattedData} />;

// eslint-disable-next-line react/prop-types
export default ({ match }) => (
  <Switch>
    <Route
      component={Details}
      path={`${match.url}/:component`}
    />
    <Route
      component={Index}
      exact
      path={match.url}
    />
  </Switch>
);
