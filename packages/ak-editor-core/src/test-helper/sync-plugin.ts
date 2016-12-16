import { Plugin, ProseMirror, Slice } from '../prosemirror';

export class SyncPlugin {
  constructor(pm: ProseMirror) {
    // Poke inside the trigger all update schedulers. Normally it would be
    // done on a timeout if the editor is in the DOM, but for tests we want to
    // skip that requirement.
    function forceSync() {
      (pm as any).centralScheduler.force();
    }

    // Some subscription handlers need to adhere to specific behaviour (e.g.
    // returning a value).
    const handlers = {
      transformPasted(slice: Slice) {
        forceSync();
        return slice;
      },
      transformPastedText(text: string) {
        forceSync();
        return text;
      },
      transformPastedHTML(html: string) {
        forceSync();
        return html;
      },
    };

    const defaultHandler = () => { forceSync(); };

    Object.keys(pm.on)
      .forEach(name => {
        const handler = (handlers as any)[name] || defaultHandler;
        (pm.on as any)[name].add(handler);
      });
  }
};

export default new Plugin(SyncPlugin);
