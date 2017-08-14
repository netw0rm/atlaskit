import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';
import Banner from '../src';

const Padded = props => <div style={{ padding: 16 }} {...props} />;

// eslint-disable-next-line react/prefer-stateless-function
export default class AnimationDemo extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    icon: PropTypes.node,
  };

  state = { isOpen: false };

  toggleBanner = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div>
        <Banner icon={this.props.icon} isOpen={this.state.isOpen}>
          {this.props.children}
        </Banner>
        <Padded>
          <Button
            appearance="primary"
            onClick={this.toggleBanner}
          >Toggle banner</Button>
        </Padded>
      </div>
    );
  }
}
