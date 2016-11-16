/** @jsx vdom */

import { vdom, define, prop } from 'skatejs';
import classNames from 'classnames';
import shadowStyles from './ak-navigation-drag.less';

export default define('ak-navigation-drag', {
  created(elem) {
    const onDrag = (mouseMoveEvent) => { elem.dragCallback(mouseMoveEvent); };
    const onMouseUp = (mouseUpEvent) => {
      elem.isDragging = false;
      elem.endDragCallback(mouseUpEvent);
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', onMouseUp);
    };
    elem.addEventListener('mousedown', (mouseDownEvent) => {
      elem.isDragging = true;
      elem.startDragCallback(mouseDownEvent);
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', onMouseUp);
    });
  },
  render(elem) {
    return (<div
      className={classNames(shadowStyles.locals.resize, {
        [shadowStyles.locals.isDragging]: elem.isDragging,
      })}
    >
      <style>{shadowStyles.toString()}</style>
    </div>);
  },
  props: {
    isDragging: prop.boolean({}),
    startDragCallback: {
      default: () => {},
    },
    dragCallback: {
      default: () => {},
    },
    endDragCallback: {
      default: () => {},
    },
  },
});
