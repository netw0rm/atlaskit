/**
 * TODO:
 *   - Add typings 😱
 *   - Specs 😅
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Rnd from 'react-rnd';

import {CardDimensions} from '../../index';
import {
  // object literals
  containerForWidgetStyles,
  widgetWrapperStyles,
} from './styled';


const containerId = 'widget-container';

interface WidgetOptions {
  dimensions?: CardDimensions;
  enableResizing?: boolean;
}

export default class Widget {
  static add(component, options: WidgetOptions = {enableResizing: true, dimensions: undefined}) {
    this.renderWidget(component, options);
  }

  static remove() {
    ReactDOM.unmountComponentAtNode(this.getContainer());
  }

  private static renderWidget(activeComponent, options: WidgetOptions) {
    const {dimensions, enableResizing} = options;

    const initialLocationAndDimensions = {
      x: 100,
      y: 100,
      ...dimensions
    };
    const resizingValues = Widget.resizingHash(enableResizing);
    const componentWrapper = (
      <Rnd
        default={initialLocationAndDimensions}
        style={widgetWrapperStyles}
        minWidth={240}
        minHeight={180}
        bounds="parent"
        lockAspectRatio
        enableResizing={resizingValues}
      >
        {activeComponent}
      </Rnd>
    );

    Widget.remove(); // TODO: Don't remove the whole container, find a more performant way of updating it
    ReactDOM.render(componentWrapper, this.getContainer());
  }

  private static getContainer() {
    const container = document.body.querySelector(`#${containerId}`);

    if (!container) {
      return Widget.createContainerInDom(containerId);
    }

    return container;
  }

  private static createContainerInDom(containerId: string) {
    const container = window.document.createElement('div');

    container.setAttribute('id', containerId);
    Widget.addStylesToContainerForWidget(container);
    document.body.appendChild(container);

    return container;
  }

  private static addStylesToContainerForWidget(container: HTMLElement): void {
    container.style.cssText = containerForWidgetStyles;
  }

  private static resizingHash(visible?: boolean) {
    return {
      bottom: visible,
      bottomLeft: visible,
      bottomRight: visible,
      left: visible,
      right: visible,
      top: visible,
      topLeft: visible,
      topRight: visible
    };
  }
}
