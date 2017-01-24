import { expect } from 'chai';
import { browser } from '../../src';
import * as keymaps from '../../src/keymaps';

describe('keymaps', () => {
  const keymap = {
    description: 'A keymap',
    windows: 'ctrl-shift-alt-k',
    mac: 'cmd-shift-alt-k',
    common: 'mod-shift-alt-k'
  };

  if (browser.mac) {
    context('when on a mac', () => {
      describe('tooltip', () => {
        it('returns tooltip', () => {
          expect(keymaps.tooltip(keymap)).to.eq('A keymap (⌘-⇧-⌥-K)');
        });
      });

      describe('findKeymapByDescription', () => {
        context('keymap is found', () => {
          it('returns matched keymap', () => {
            expect(keymaps.findKeymapByDescription('toggle bold')).to.eq(keymaps.toggleBold);
          });
        });

        context('key map is not found', () => {
          it('returns undefined', () => {
            expect(keymaps.findKeymapByDescription('random')).to.be.undefined;
          });
        });
      });

      describe('findShortcutByDescription', () => {
        context('shortcut is found', () => {
          it('returns matched shortcut', () => {
            expect(keymaps.findShorcutByDescription('heading 1')).to.eq('Cmd-Alt-1');
          });
        });

        context('shortcut is not found', () => {
          it('returns undefined', () => {
            expect(keymaps.findShorcutByDescription('random')).to.be.undefined;
          });
        });
      });
    });
  } else {
    context('when not on a mac', () => {
      describe('tooltip', () => {
        it('returns tooltip', () => {
          expect(keymaps.tooltip(keymap)).to.eq('A keymap (^-⇧-⌥-K)');
        });
      });

      describe('findKeymapByDescription', () => {
        context('keymap is found', () => {
          it('returns matched keymap', () => {
            expect(keymaps.findKeymapByDescription('toggle bold')).to.eq(keymaps.toggleBold);
          });
        });

        context('key map is not found', () => {
          it('returns undefined', () => {
            expect(keymaps.findKeymapByDescription('random')).to.be.undefined;
          });
        });
      });

      describe('findShortcutByDescription', () => {
        context('shortcut is found', () => {
          it('returns matched shortcut', () => {
            expect(keymaps.findShorcutByDescription('heading 1')).to.eq('Ctrl-1');
          });
        });

        context('shortcut is not found', () => {
          it('returns undefined', () => {
            expect(keymaps.findShorcutByDescription('random')).to.be.undefined;
          });
        });
      });
    });
  }
});
