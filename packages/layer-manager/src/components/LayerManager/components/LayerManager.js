// @flow
import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import type { PropType } from 'babel-plugin-react-flow-props-to-prop-types'; // eslint-disable-line import/no-extraneous-dependencies
import { GatewayDest, GatewayProvider } from '../../gateway';

type ElementType = PropType<Element<mixed>, any>;
type ChildrenType = PropType<Array<ElementType> | ElementType, any>;

type Props = { children: ChildrenType };

export default class LayerManager extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp
  static childContextTypes = { appId: PropTypes.string }
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
          <GatewayDest
            id="gateway-destination-modal"
            name="modal"
          />
        </div>
      </GatewayProvider>
    );
  }
}
