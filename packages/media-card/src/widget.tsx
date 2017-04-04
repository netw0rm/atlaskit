/**
 * TODO:
 *   - Add typings
 *   - Handle queue --> Use Filmstrip?
 * 
 */
import * as ReactDOM from 'react-dom';
import * as Rnd from 'react-rnd';

const containerId = 'widget-container';

export default class Widget {
  static add(component) {
    const componentWrapper = <Rnd
      ref={c => { this.rnd = c; }}
      initial={{
        x: 100,
        y: 100,
        // x: window.innerWidth / 2 - 200,
        // y: window.innerHeight / 2 - 80,
        width: 400,
        height: 160,
      }}
      style={style}
      minWidth={300}
      minHeight={160}
      // maxWidth={800}
      // maxHeight={300}
      bounds={'parent'}
    >
      {component}
    </Rnd>;

    ReactDOM.render(componentWrapper, this.getContainer());
  }

  static getContainer() {
    // TODO: Create first time, reuse next times
    let container = document.body.querySelector(containerId);

    if (!container) {
      container = document.createElement('div');
      const style = {
        textAlign: 'center',
        padding: '5px',
        borderRadius: '5px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        'pointer-events': 'all',
        'background-color': 'rgba(0, 0, 0, 0.0980392)',
        'box-shadow': 'black 1px 1px 7px -2px'
      };
      container.id = containerId;
      // TODO: add "box-sizing" to all widget childs
      Object.assign(container.style, {
        width: '100%',
        height: '100%',
        position: 'absolute',
        'pointer-events': 'none',
        top: 0,
        left: 0
      });

      document.body.appendChild(container);
    }

    return container;
  }
}
