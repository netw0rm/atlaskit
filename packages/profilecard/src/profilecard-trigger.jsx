import React, { PureComponent, PropTypes } from 'react';

import AkLayer from '@atlaskit/layer';

import { getAnimationClass } from './internal/helper';
import DirectionWrapper from './components/DirectionWrapper';
import AkProfilecardResourced from './profilecard-resourced';

const allowedPositions = [
  'top left',
  'top right',
  'right top',
  'right bottom',
  'bottom right',
  'bottom left',
  'left bottom',
  'left top',
];

export default class ProfilecardTrigger extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    position: PropTypes.oneOf(allowedPositions),
    userId: PropTypes.string,
    cloudId: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.shape({
      callback: PropTypes.func,
      label: PropTypes.string,
    })),
    resourceClient: PropTypes.shape({
      getProfile: PropTypes.func,
      getCachedProfile: PropTypes.func,
      makeRequest: PropTypes.func,
    }).isRequired,
  }

  static defaultProps = {
    position: 'right top',
    isLoading: false,
    hasError: false,
  }

  constructor(props) {
    super(props);

    this.showDelay = 500;
    this.hideDelay = 250;

    this.state = {
      visible: false,
      isFlipped: false,
      cachedData: null,
      showTimeout: null,
      hideTimeout: null,
    };
  }

  handleLayerFlipChange = ({ flipped }) => {
    this.setState({ isFlipped: flipped });
  }

  hideProfilecard = () => {
    clearTimeout(this.showTimer);

    this.hideTimer = setTimeout(() => {
      this.setState({ visible: false });
    }, this.hideDelay);
  }

  showProfilecard = () => {
    clearTimeout(this.hideTimer);

    this.showTimer = setTimeout(() => {
      this.setState({ visible: true });
    }, this.showDelay);
  }

  renderProfilecard() {
    if (!this.state.visible) { return null; }

    const mainPosition = this.props.position.split(' ')[0];
    const animationClass = getAnimationClass(
      mainPosition,
      this.state.isFlipped
    );

    return (
      <DirectionWrapper
        position={this.props.position}
        isFlipped={this.state.isFlipped}
      >
        <div className={animationClass}>
          <AkProfilecardResourced
            userId={this.props.userId}
            cloudId={this.props.cloudId}
            resourceClient={this.props.resourceClient}
            actions={this.props.actions}
          />
        </div>
      </DirectionWrapper>
    );
  }

  render() {
    return (
      <div

        onMouseEnter={this.showProfilecard}
        onMouseLeave={this.hideProfilecard}
      >
        <AkLayer
          autoPosition
          content={this.renderProfilecard()}
          offset="0 4"
          onFlippedChange={this.handleLayerFlipChange}
          position={this.props.position}
        >
          {this.props.children}
        </AkLayer>
      </div>
    );
  }
}
