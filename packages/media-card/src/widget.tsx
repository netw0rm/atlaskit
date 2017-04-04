/**
 * TODO:
 *   - Add typings 😱
 *   - Specs 😅
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Rnd from 'react-rnd';
import {FilmStripNavigator} from '@atlaskit/media-filmstrip';

const containerId = 'widget-container';
const wrapperStyles = {
  textAlign: 'center',
  borderRadius: '3px',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  pointerEvents: 'all',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  boxShadow: 'black 1px 1px 7px -2px'
};
// TODO: Retrieve initial state from localStorage
const recentItems = [];

export default class Widget {
  static add(component) {
    // TODO: Save component to localStorage
    recentItems.unshift(component);

    const componentWrapper = <Rnd
      ref={c => {
        window.rnd = c;
      }}
      initial={{
        // TODO: Get coordinates from actual element position
        x: 100,
        y: 100,
        // x: window.innerWidth / 2 - 200,
        // y: window.innerHeight / 2 - 80,
        width: 400,
        height: 300
      }}
      style={wrapperStyles}
      minWidth={300}
      minHeight={160}
      // maxWidth={800}
      // maxHeight={300}
      bounds={'parent'}
    >
      {component}
      {this.recentItems()}
    </Rnd>;

    ReactDOM.render(componentWrapper, this.getContainer());
  }

  static getContainer() {
    let container = document.body.querySelector(`#${containerId}`);

    if (!container) {
      container = document.createElement('div');
      container.id = containerId;

      document.body.appendChild(container);
      document.body.appendChild(this.getContainerStyles());
    }

    return container;
  }

  static getContainerStyles() {
    const stylesContent = `
      #${containerId} {
        width: 100%;
        height: 100%;
        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
      }
      #${containerId} * {
        box-sizing: border-box;
      }
      #${containerId} .expand-icon {
        display: none;
      }
      #${containerId} .card .wrapper {
        height: 100%;
      }
      .widget-filmstrip-wrapper {
        width: 100%;
        margin: 5px;
        padding: 0 5px;
        border-top: 1px solid #ccc;
      }
      .widget-filmstrip-wrapper .card {
        height: 70px !important;
        width: 70px !important;
      }
    `;
    const styles = document.createElement('style');
    styles.textContent = stylesContent;

    return styles;
  }

  static recentItems() {
    return <div className="widget-filmstrip-wrapper">
      <FilmStripNavigator>
        {recentItems}
      </FilmStripNavigator>
    </div>;
  }
}
