import * as prosemirror from '../../prosemirror';

declare var global: any;
let loading;
const ensureSynchronyLoaded = (synchronyUrl, debug) : Promise<{configureProsemirror: any}> => {
  if(loading) {
    return loading;
  }

  loading = new Promise((resolve, reject) => {
    if(global.Synchrony && global.Synchrony.ready) {
      resolve(global.Synchrony);
      return;
    }
    global.Synchrony = global.Synchrony || {_cbs: []};

    if(debug) {
      global.Synchrony._cbs.push(() => resolve(global.Synchrony));
    } else {
      const timeout = window.setTimeout(reject, 10000);
      global.Synchrony._cbs.push(() => {
        clearTimeout(timeout);
        resolve(global.Synchrony);
      });
    }

    const path = synchronyUrl + '/../resources/js';
    if(debug) {
      global.document.write('<script src="' + path + '/synchrony/goog/base.js" type="text/javascript"></script>');
      global.document.write('<script src="' + path + '/synchrony-cljs-deps.js"></script>');
      global.document.write('<script src="' + path + '/js-deps.js"></script>');
      global.document.write('<script>goog.require("synchrony.entry_point");</script>');
    } else {
      global.document.write('<script src="' + path + '/synchrony.min.js"></script>');
    }
  });
  return loading;
};

const configureEditorState = (config, {synchronyUrl, synchronyDebug, contentId, jwtToken}) => {
  if (!synchronyUrl) {
    return config;
  }

  return ensureSynchronyLoaded(synchronyUrl, synchronyDebug).then((synchrony) => {
    return synchrony.configureProsemirror(prosemirror, config, synchronyUrl, contentId, jwtToken);
  }).catch(e => {
    console.error('Unable to initialize synchrony. Collaborative editing is not available.', e);
    return config;
  });
};

export default configureEditorState;
