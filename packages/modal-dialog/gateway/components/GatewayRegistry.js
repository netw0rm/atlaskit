import { cloneElement } from 'react';

export default class GatewayRegistry {
  constructor() {
    this._containers = {};
    this._children = {};

    // Unique key for children of a gateway
    this._currentId = 0;
  }

  _renderContainer(name) {
    if (!this._containers[name] || !this._children[name]) {
      return;
    }

    const childrenKeys = Object.keys(this._children[name]);
    const stackTotal = childrenKeys.length;

    this._containers[name].setState({
      children: childrenKeys.sort().map((key, i) => {
        const stackIndex = stackTotal - (i + 1);
        const element = this._children[name][key];

        return cloneElement(element, { key, stackIndex, stackTotal });
      }),
    });
  }

  addContainer(name, container) {
    this._containers[name] = container;
    this._renderContainer(name);
  }

  removeContainer(name) {
    this._containers[name] = null;
  }

  addChild(name, gatewayId, child) {
    this._children[name][gatewayId] = child;
    this._renderContainer(name);
  }

  clearChild(name, gatewayId) {
    delete this._children[name][gatewayId];
  }

  register(name, child) {
    this._children[name] = this._children[name] || {};

    const gatewayId = `${name}_${this._currentId}`;
    this._children[name][gatewayId] = child;
    this._currentId += 1;

    return gatewayId;
  }

  unregister(name, gatewayId) {
    this.clearChild(name, gatewayId);
    this._renderContainer(name);
  }
}
