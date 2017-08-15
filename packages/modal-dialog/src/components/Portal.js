import { Children, PureComponent } from 'react';
import { render } from 'react-dom'; // eslint-disable-line
import PropTypes from 'prop-types';

export default class Portal extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    this.portalElement = null;
  }
  componentDidMount() {
    const node = document.createElement('div');
    document.body.appendChild(node);
    this.portalElement = node;
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const { children } = this.props;

    render(
      Children.only(children),
      this.portalElement
    );
  }
  componentWillUnmount() {
    document.body.removeChild(this.portalElement);
  }
  render() {
    return null;
  }
}
