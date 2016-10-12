import shadowStyles from './ak-navigation-drag.less';
import { vdom, define } from 'skatejs';


export default define('ak-navigation-drag', {
  created(elem) {
    elem.addEventListener('mousedown', (mouseDownEvent) => {
      elem.startDragCallback(mouseDownEvent);
      const onDrag = mouseMoveEvent => elem.dragCallback(mouseMoveEvent);
      const onMouseUp = (mouseUpEvent) => {
        elem.endDragCallback(mouseUpEvent);
        document.body.removeEventListener('mousemove', onDrag);
        document.body.removeEventListener('mouseup', onMouseUp);
      };
      document.body.addEventListener('mousemove', onDrag);
      document.body.addEventListener('mouseup', onMouseUp);
    });
  },
  render() {
    return (<div
      className={shadowStyles.locals.resize}
    >
      <style>{shadowStyles.toString()}</style>
    </div>);
  },
  props: {
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

