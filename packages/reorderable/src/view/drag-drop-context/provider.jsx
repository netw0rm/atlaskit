// @flow
import { PureComponent, PropTypes } from 'react';
import { createStore } from 'redux';
import type { Store } from '../../state/types';
import reducer from '../../state/reducer';

type Props = {
  children: React$Element<any>
}

type Context = {
  dragDropStore: Store
}

export default class Provider extends PureComponent {
  // https://github.com/brigand/babel-plugin-flow-react-proptypes/issues/22
  static childContextTypes = {
    dragDropStore: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props: Props, context: any) {
    super(props, context);

    this.store = createStore(reducer);
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
