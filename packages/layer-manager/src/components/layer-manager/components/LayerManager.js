import React, { Children, PureComponent } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
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
          <GatewayDest name="modal" component={TransitionGroup} />
        </div>
      </GatewayProvider>
    );
  }
}
