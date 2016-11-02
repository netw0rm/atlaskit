import { emit } from 'skatejs';

export default (before, after, elem, detail, cb) => {
  if (emit(elem, before, {
    detail,
    bubbles: true,
    cancelable: true,
  })) {
    if (cb) {
      cb();
    }
    emit(elem, after, {
      detail,
      bubbles: true,
      cancelable: false,
    });
  }
};
