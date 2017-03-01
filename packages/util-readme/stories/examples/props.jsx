import React, { PropTypes, PureComponent } from 'react';
import { Props } from '@atlaskit/util-readme';

class MyComponent extends PureComponent {
  static propTypes = {
    prop1: PropTypes.string,
    prop2: PropTypes.number,
  }
}

export default (
  <Props component={MyComponent} />
);
