import React, { PropTypes, PureComponent } from 'react';
import { Box } from './styled';

export default class AnimatedBox extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(['bold', 'combined', 'optimistic']),
    children: PropTypes.node,
  }
  constructor(props) {
    super(props);
    this.state = { isAnimating: false };
  }
  componentDidMount() {
    const elem = this.animated;
    elem.addEventListener('animationend', this.animationDone);
  }
  componentWillUnmount() {
    const elem = this.animated;
    elem.removeEventListener('animationend', this.animationDone);
  }

  handleClick = () => this.setState({ isAnimating: true });
  animationDone = () => this.setState({ isAnimating: false });

  render() {
    const { appearance, children } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <Box
        appearance={appearance}
        innerRef={n => (this.animated = n)}
        isAnimating={this.state.isAnimating}
        onClick={this.handleClick}
      >
        <span>{children}</span>
      </Box>
    );
  }
}
