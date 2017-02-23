// @flow
import { PureComponent, PropTypes } from 'react';
import type { Store } from '../../state/types';
import createStore from '../../state/create-store';

type Props = {
  children: React$Element<any>
}

type Context = {
  dragDropStore: Store
}

export default class Provider extends PureComponent {
  // [need to declare childContextTypes without flow](https://github.com/brigand/babel-plugin-flow-react-proptypes/issues/22)
  static childContextTypes = {
    dragDropStore: PropTypes.shape({
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
      dragDropStore: this.store,
    };
  }

  props: Props
  store: Store

  render() {
    return this.props.children;
  }
}
