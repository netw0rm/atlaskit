import { PureComponent } from 'react';

type Props = {
  children: any,
}

type Context = {
  dragDropStore: {}
}

export default class DragContext extends PureComponent {
  childContextTypes: Context

  getChildContext() {
    return {
      dragDropStore: {},
    };
  }

  props: Props

  render() {
    return this.props.children;
  }
}
