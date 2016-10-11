import shadowStyles from './ak-navigation-drag.less';
import { vdom, define, prop } from 'skatejs';
import classNames from 'classnames';

export default define('ak-navigation-drag', {
  created(elem) {
    const onDrag = (mouseMoveEvent) => { elem.dragCallback(mouseMoveEvent); };
    const throttledDrag = onDrag;
    const onMouseUp = (mouseUpEvent) => {
      elem.isDragging = false;
      elem.endDragCallback(mouseUpEvent);
      document.removeEventListener('mousemove', throttledDrag);
      document.removeEventListener('mouseup', onMouseUp);
    };
    elem.addEventListener('mousedown', (mouseDownEvent) => {
      elem.isDragging = true;
      elem.startDragCallback(mouseDownEvent);
      document.addEventListener('mousemove', throttledDrag);
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

