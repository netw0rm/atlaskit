// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import createStore from '../../state/create-store';
// eslint-disable-next-line no-duplicate-imports
import type { Store, Hooks, ReactElement } from '../../types';
import storeKey from '../../state/get-store-key';

type Props = Hooks & {|
  children?: ReactElement,
|}

type Context = {|
  [storeKey]: Store
|}

export default class DragDropContext extends PureComponent {
  /* eslint-disable react/sort-comp */
  props: Props
  store: Store

  // [Need to declare childContextTypes without flow](https://github.com/brigand/babel-plugin-flow-react-proptypes/issues/22)
  static childContextTypes = {
    [storeKey]: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }).isRequired,
  }
  /* eslint-enable */

  componentWillMount() {
    this.store = createStore(this.props);
  }

  getChildContext(): Context {
    return {
      [storeKey]: this.store,
    };
  }

  render() {
    return this.props.children;
  }
}
