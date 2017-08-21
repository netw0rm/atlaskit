import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { GatewayDest, GatewayProvider } from '../../gateway';

export default class LayerManager extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }
  static childContextTypes = {
    appId: PropTypes.string,
  }
  constructor(props, context) {
    super(props, context);
    this.appId = 'app-wrapper';
  }
  getChildContext() {
    return {
      appId: this.appId,
    };
  }

  render() {
    const { children } = this.props;

    return (
      <GatewayProvider>
        <div>
          <div id={this.appId} style={{ position: 'relative', zIndex: 0 }}>
            {Children.only(children)}
          </div>
          <GatewayDest name="modal" id="gateway-destination-modal" />
        </div>
      </GatewayProvider>
    );
  }
}
