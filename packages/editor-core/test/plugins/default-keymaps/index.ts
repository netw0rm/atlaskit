import { expect } from 'chai';
import * as chai from 'chai';

import { DefaultKeymapsPlugin } from '../../../src';
import { chaiPlugin, makeEditor, dispatchKeypressEvent } from '../../../src/test-helper';
import { doc, p, schema } from '../../_schema-builder';
import { commands } from '../../../src/prosemirror';

chai.use(chaiPlugin);

describe('default-keymaps', () => {
  const editor = (doc: any) => makeEditor({ doc, plugin: DefaultKeymapsPlugin, schema });

  describe('keymap', () => {
    context('Cmd-Z', () => {
      it('shoud undo changes', () => {
        const { pm } = editor(doc(p('te{<>}xt')));
        expect(pm.activeMarks().length === 0);
        commands.toggleMark(schema.marks.strong)(pm);
        expect(pm.activeMarks().length === 1);
        dispatchKeypressEvent(pm, 'Mod-Z');
        expect(pm.activeMarks().length === 0);
      });
    });

    context('Cmd-Shift-Y', () => {
      it('shoud redo changes', () => {
        const { pm } = editor(doc(p('te{<>}xt')));
        expect(pm.activeMarks().length === 0);
        commands.toggleMark(schema.marks.strong)(pm);
        expect(pm.activeMarks().length === 1);
        dispatchKeypressEvent(pm, 'Mod-Z');
        expect(pm.activeMarks().length === 0);
        dispatchKeypressEvent(pm, 'Mod-Shift-Y');
        expect(pm.activeMarks().length === 1);
      });
    });

    context('Cmd-Shift-Y', () => {
      it('shoud produce no change', () => {
        const { pm } = editor(doc(p('te{<>}xt')));
        expect(pm.activeMarks().length === 0);
        commands.toggleMark(schema.marks.strong)(pm);
        expect(pm.activeMarks().length === 1);
        dispatchKeypressEvent(pm, 'Mod-Z');
        expect(pm.activeMarks().length === 0);
        dispatchKeypressEvent(pm, 'Mod-Y');
        expect(pm.activeMarks().length === 0);
      });
    });
  });
});
