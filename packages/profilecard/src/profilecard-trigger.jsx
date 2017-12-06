import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import AkLayer from '@atlaskit/layer';

import PositionWrapper from './components/PositionWrapper';
import withOuterListeners from './components/withOuterListeners';
import AkProfilecardResourced from './profilecard-resourced';

import { AnimationWrapper } from './styled/Trigger';

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

const AkLayerWithOuterListeners = withOuterListeners(AkLayer);

export default class ProfilecardTrigger extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    position: PropTypes.oneOf(allowedPositions),
    userId: PropTypes.string.isRequired,
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
    trigger: PropTypes.oneOf(['click', 'hover']),
    analytics: PropTypes.func,
  }

  static defaultProps = {
    position: 'top left',
    actions: [],
    trigger: 'hover',
  }

  constructor(props) {
    super(props);

    this.showDelay = 500;
    this.hideDelay = 250;

    this.state = {
      visible: false,
      isFlipped: false,
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
    return (
      <PositionWrapper
        position={this.props.position}
        isFlipped={this.state.isFlipped}
      >
        <AnimationWrapper
          position={this.props.position}
          isFlipped={this.state.isFlipped}
        >
          <AkProfilecardResourced
            userId={this.props.userId}
            cloudId={this.props.cloudId}
            resourceClient={this.props.resourceClient}
            actions={this.props.actions}
            analytics={this.props.analytics}
          />
        </AnimationWrapper>
      </PositionWrapper>
    );
  }

  render() {
    const {
      children,
      position,
      trigger,
    } = this.props;

    const Layer = trigger === 'hover' ? AkLayer : AkLayerWithOuterListeners;
    const containerListeners = {};
    const layerListeners = {};

    if (trigger === 'hover') {
      containerListeners.onMouseEnter = this.showProfilecard;
      containerListeners.onMouseLeave = this.hideProfilecard;
    } else {
      containerListeners.onClick = this.showProfilecard;

      layerListeners.handleClickOutside = this.hideProfilecard;
      layerListeners.handleEscapeKeydown = this.hideProfilecard;
    }

    return (
      <div style={{ display: 'inline-block', maxWidth: '100%' }} {...containerListeners}>
        {
          this.state.visible ? <Layer
            autoFlip
            content={this.renderProfilecard()}
            offset="0 4"
            onFlippedChange={this.handleLayerFlipChange}
            position={position}
            {...layerListeners}
          >
            {children}
          </Layer> : children
        }
      </div>
    );
  }
}
