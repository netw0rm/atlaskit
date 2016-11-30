/* eslint-disable */
import { ProseMirror, browser, commands, Keymap } from  'ak-editor-prosemirror';
import { Schema } from 'ak-editor-schema';

const { wrapIn, setBlockType, wrapInList, splitListItem, lift, liftListItem,
  sinkListItem, chainCommands, newlineInCode, toggleMark } = commands;

const isMac = browser.mac;

interface Command {
  (pm: ProseMirror, apply: boolean): boolean;
}

export default (schema: Schema, mapKeys?: any) => {
  let keys: any = {};
  function bind(key: string, cmd: Command) {
    if (mapKeys) {
      let mapped = mapKeys[key];
      if (mapped === false) {
        return;
      }

      if (mapped) {
        key = mapped;
      }
    }
    keys[key] = cmd;
  }

  let lastCmd: Command;

  function clearAndApply(cmd: Command) {
    let isReset = false;

    return (pm: ProseMirror, apply: boolean) => {
      lift(pm, apply);
      setBlockType(schema.nodes.paragraph)(pm, apply);

      if (lastCmd !== cmd) {
        isReset = false;
        lastCmd = cmd;
      }

      if (!isReset) {
        cmd(pm, apply);
      }

      isReset = !isReset;

      return true;
    }
  }

  for (let name in schema.marks) {
    let mark = schema.marks[name];

    if (name === 'strong') {
      bind('Mod-B', toggleMark(mark));
    }

    if (name === 'em') {
      bind('Mod-I', toggleMark(mark));
    }

    if (name === 'code') {
      bind('Mod-`', toggleMark(mark));
    }
  }

  for (let name in schema.nodes) {
    let node = schema.nodes[name];

    if (name === 'bullet_list') {
      if (isMac) {
        bind('Shift-Cmd-B', clearAndApply(wrapInList(node)));
      } else {
        bind('Shift-Ctrl-B', clearAndApply(wrapInList(node)));
      }
    }

    if (name === 'ordered_list') {
      if (isMac) {
        bind('Shift-Cmd-L', clearAndApply(wrapInList(node)));
      } else {
        bind('Shift-Ctrl-L', clearAndApply(wrapInList(node)));
      }
    }

    if (name === 'blockquote') {
      if (isMac) {
        bind('Cmd-Alt-8', clearAndApply(wrapIn(node)));
      } else {
        bind('Ctrl-8', clearAndApply(wrapIn(node)));
      }
    }

    if (name === 'hard_break') {
      let cmd = chainCommands(
        newlineInCode,
        (pm: ProseMirror) => pm.tr.replaceSelection(node.create()).applyAndScroll()
      );
      bind('Mod-Enter', cmd);
      bind('Shift-Enter', cmd);
      if (isMac) {
        bind('Ctrl-Enter', cmd);
      }
    }

    if (name === 'list_item') {
      bind('Enter', splitListItem(node));
      bind('Mod-[', liftListItem(node));
      bind('Mod-]', sinkListItem(node));
    }

    if (name === 'paragraph') {
      if (isMac) {
        bind('Cmd-Alt-0', clearAndApply(setBlockType(node)));
      } else {
        bind('Ctrl-0', clearAndApply(setBlockType(node)));
      }
    }

    if (name === 'code_block') {
      if (isMac) {
        bind('Cmd-Alt-7', clearAndApply(setBlockType(node)));
      } else {
        bind('Ctrl-7', clearAndApply(setBlockType(node)));
      }
      // https://github.com/ProseMirror/prosemirror/issues/419
      bind('Enter', (pm: ProseMirror, apply: boolean) => {
        let {$from, $head, empty} = pm.selection;

        if (!$from.parent.type.isCode) {
          return false;
        }

        if (apply !== false) {
          if (
            $head.parent.textContent.slice(-1) === '\n'
            && empty
            // nodeSize includes newlines
            && $head.parentOffset === $head.parent.nodeSize - 2
          ) {
            commands.deleteCharBefore(pm);
            return false;
          }

          pm.tr.typeText('\n').applyAndScroll();
        }

        return true;
      });
    }

    if (name === 'heading') {
      for (let i = 1; i <= 5; i++) {
        if (isMac) {
          bind('Cmd-Alt-' + i, clearAndApply(setBlockType(node, {level: i})));
        } else {
          bind('Ctrl-' + i, clearAndApply(setBlockType(node, {level: i})));
        }
      }
    }

    if (name === 'horizontal_rule') {
      bind('Mod-Shift--', (pm: ProseMirror) => pm.tr.replaceSelection(node.create()).applyAndScroll());
    }
  }
  return new Keymap(keys);
}
