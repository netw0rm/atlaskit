// THIS WILL BE REPLACED WITH ACTUAL ak-blanket WHEN IT IS READY

import React, { PropTypes, PureComponent } from 'react';
import { akColorN900 } from 'akutil-shared-styles';

// eslint-disable-next-line react/prefer-stateless-function
export default class AkBlanketTmp extends PureComponent {
  static propTypes = {
    onBlanketClicked: PropTypes.func,
  };

  static defaultProps = {
    onBlanketClicked: () => {},
  };

  render() {
    const { onBlanketClicked } = this.props;

    return (
      // eslint-disable-next-line
      <div
        style={{
          backgroundColor: akColorN900,
          opacity: 0.5,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          cursor: 'pointer',
        }}
        onClick={onBlanketClicked}
      />
    );
  }
}
