import { PureComponent, ReactElement } from 'react';
import * as ReactDOM from 'react-dom';

export interface Props {
  onClick?: () => void;
}

export default class OutsideClickable extends PureComponent<Props, {}> {
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  render() {
    const { children } = this.props;
    return children
      ? children as ReactElement<any>
      : null;
  }

  private handleClickOutside = (e: MouseEvent) => {
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || (e.target instanceof Node && !domNode.contains(e.target))) {
      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  }
}
