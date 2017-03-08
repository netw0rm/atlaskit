import React, { PureComponent, PropTypes } from 'react';

import AkLayer from '@atlaskit/layer';

import { getAnimationClass } from './internal/helper';
import AkProfilecard from './profilecard';
import DirectionWrapper from './components/DirectionWrapper';
// import AkProfilecardResourced from './profilecard-resourced';

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
    isLoading: PropTypes.bool,
    hasError: PropTypes.bool,
  }

  static defaultProps = {
    position: 'right top',
    isLoading: false,
    hasError: false,
    apiEndpoint: '',
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
    const animationClass = getAnimationClass(mainPosition, this.state.isFlipped);

    const profileData = {
      fullName: 'Kramer Hatfield',
      nickname: 'khatfield',
      email: 'khatfield@gluid.com',
      location: 'Vienna, Austria',
      meta: 'Manager',
      presence: 'available',
    };

    return (
      <DirectionWrapper direction={mainPosition}>
        <div className={animationClass}>
          <AkProfilecard
            isLoading={this.props.isLoading}
            hasError={this.props.hasError}
            {...profileData}
            actions={[
              {
                label: 'View profile',
                callback: () => {
                  window.open('https://local.atlassian.io:10124/c/CLOUDID/people/655363:7c218e11-d210-43fd-9830-bcc1874e4736/FULLNAME', '_blank');
                },
              },
            ]}
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
