import React, { PureComponent, PropTypes } from 'react';

import { cardAnimationWrapper } from 'style!../styles/profilecard.less';

export default class HeightTransitionWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  state = {
    height: 'auto',
  }

  componentDidMount() {
    this.updateRefHeight();
  }

  componentDidUpdate() {
    this.updateRefHeight();
  }

  updateRefHeight() {
    this.setState({
      height: this.ref ? this.ref.children[0].offsetHeight : 'auto',
    });
  }

  render() {
    const inlineHeight = {
      height: this.state.height,
    };

    return (
      <div
        className={cardAnimationWrapper}
        style={inlineHeight}
        ref={ref => (this.ref = ref)}
      >
        {this.props.children}
      </div>
    );
  }
}
