import React from 'react';
import { action } from '@kadira/storybook';
import akNavigation from '../src/index';
import reactify from 'akutil-react';
const AkNavigation = reactify(akNavigation);

const childProperty = React.PropTypes.oneOfType([
  React.PropTypes.arrayOf(React.PropTypes.node),
  React.PropTypes.node,
]);

export default React.createClass({ // eslint-disable-line react/prefer-es6-class
  propTypes: {
    children: childProperty,
    propToToggle: React.PropTypes.string,
  },
  getInitialState() {
    return { open: true };
  },
  componentDidMount() {
    this.timer = setInterval(this.toggle, 3000);
  },
  componentWillUnmount() {
    window.clearInterval(this.timer);
  },
  toggle() {
    const propToToggle = this.props.propToToggle;
    this.setState({ [propToToggle]: !this.state[propToToggle] });
  },
  render() {
    return (<AkNavigation
      {...this.props}
      onLinkSelected={action('link selected')}
      onClose={action('close')}
      onOpen={action('open')}
      open={this.state && this.state.open}
      containerHidden={this.state && this.state.containerHidden}
      collapsible
    >
      {this.props.children}
    </AkNavigation>);
  },
});
