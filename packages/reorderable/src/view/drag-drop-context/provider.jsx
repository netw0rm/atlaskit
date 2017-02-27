// @flow
import { PureComponent, PropTypes } from 'react';
import type { Store } from '../../types';
import createStore from '../../state/create-store';
import storeKey from '../../state/get-store-key';

type Props = {
  children: React$Element<any>
}

type Context = {
  [storeKey]: Store
}

export default class Provider extends PureComponent {
  // [need to declare childContextTypes without flow](https://github.com/brigand/babel-plugin-flow-react-proptypes/issues/22)
  static childContextTypes = {
    [storeKey]: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props: Props, context: any) {
    super(props, context);

    this.store = createStore();
  }

  getChildContext(): Context {
    return {
      [storeKey]: this.store,
    };
  }

  props: Props
  store: Store

  render() {
    return this.props.children;
  }
}
