// @flow
import { PureComponent, PropTypes } from 'react';
import type { Store } from '../../types';
import storeKey from '../../state/get-store-key';

type Props = {
  store: any,
  children?: React$Element<any>
}

type Context = {
  [storeKey]: Store
}

export default class Provider extends PureComponent {
  /* eslint-disable react/sort-comp */
  props: Props
  store: Store
  /* eslint-enable */

  // [need to declare childContextTypes without flow](https://github.com/brigand/babel-plugin-flow-react-proptypes/issues/22)
  static childContextTypes = {
    [storeKey]: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }).isRequired,
  }

  getChildContext(): Context {
    return {
      [storeKey]: this.props.store,
    };
  }

  render() {
    return this.props.children;
  }
}
