/**
 * TODO:
 *   - Add typings 😱
 *   - Specs 😅
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Rnd from 'react-rnd';

import {CardDimensions} from '../../index';
import {
  // object literals
  containerForWidgetStyles,
  widgetWrapperStyles,
} from './styled';


const containerId = 'widget-container';

interface WidgetOptions {
  id?: number | string;
  dimensions?: CardDimensions;
}

export default class Widget {
  static add(component, options: WidgetOptions = {id: undefined, dimensions: undefined}) {
    const dimensions = options.dimensions || {width: undefined, height: undefined};
    this.renderWidget(component, dimensions);
  }

  static remove() {
    this.getContainer().remove();
  }

  private static renderWidget(activeComponent, dimensions: CardDimensions) {
    const initialLocationAndDimensions = {
      x: 100,
      y: 100,
      ...dimensions
    };

    const componentWrapper = (
      <Rnd
        initial={initialLocationAndDimensions}
        style={widgetWrapperStyles}
        minWidth={120}
        minHeight={90}
        bounds="parent"
        lockAspectRatio
      >
        {activeComponent}
      </Rnd>
    );

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
}
