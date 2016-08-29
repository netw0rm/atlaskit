import { Plugin, ProseMirror } from 'prosemirror/dist/edit';

export default new Plugin(class SyncPlugin {
  constructor(pm: ProseMirror) {
    // Poke inside the trigger all update schedulers. Normally it would be
    // done on a timeout if the editor is in the DOM, but for tests we want to
    // skip that requirement.
    function forceSync() {
      (pm as any).centralScheduler.force();
    }

    Object.keys(pm.on)
      .map(name => (pm.on as any)[name])
      .forEach(subscription => subscription.add(forceSync));
  }
});
