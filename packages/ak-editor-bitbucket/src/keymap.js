/* eslint-disable */
import { browser, commands, Keymap } from  "ak-editor-prosemirror";
import { service as analyticsService } from "ak-editor-analytics";

const { wrapIn, setBlockType, wrapInList, splitListItem, lift, liftListItem,
  sinkListItem, chainCommands, newlineInCode, toggleMark } = commands;

const isMac = browser.mac;

// Note: This is a copy pasta from prosemirror's example setup.
// Modified to match custom nodes and markers.

// :: (Schema, ?Object) → Keymap
// Inspect the given schema looking for marks and nodes from the
// basic schema, and if found, add key bindings related to them.
// This will add:
//
// * **Mod-B** for toggling [strong](#StrongMark)
// * **Mod-I** for toggling [emphasis](#EmMark)
// * **Mod-\`** for toggling [code font](#CodeMark)
// * **Ctrl-Shift-0** for making the current textblock a paragraph
// * **Ctrl-Shift-1** to **Ctrl-Shift-6** for making the current
//   textblock a heading of the corresponding level
// * **Ctrl-Shift-\\** to make the current textblock a code block
// * **Ctrl-Shift-8** to wrap the selection in an ordered list
// * **Ctrl-Shift-9** to wrap the selection in a bullet list
// * **Ctrl-Shift-.** to wrap the selection in a block quote
// * **Enter** to split a non-empty textblock in a list item while at
//   the same time splitting the list item
// * **Mod-Enter** to insert a hard break
// * **Mod-Shift-minus** to insert a horizontal rule
//
// You can suppress or map these bindings by passing a `mapKeys`
// argument, which maps key names (say `"Mod-B"` to either `false`, to
// remove the binding, or a new key name string.
export function buildKeymap(schema, mapKeys) {
  let keys = {};
  function bind(key, cmd) {
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

  let lastCmd;

  function clearAndApply(cmd, analyticsEventName) {
    let isReset = false;

    return (pm, apply) => {
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

      if (analyticsEventName) {
        analyticsService.trackEvent(analyticsEventName);
      }
      
      return true;
    }
  }

  function trackAndToggleMark(mark, analyticsEventName) {
    const toggleFn = toggleMark(mark);
    
    return (...args) => {
      analyticsService.trackEvent(analyticsEventName);
      return toggleFn(...args);
    }
  }

  for (let name in schema.marks) {
    let mark = schema.marks[name];

    if (name === "strong") {
      bind("Mod-B", trackAndToggleMark(mark, 'atlassian.editor.format.bold.keyboard'));
      // bind("Mod-B", toggleMark(mark, 'atlassian.editor.format.bold.keyboard'));
    }

    if (name === "em") {
      bind("Mod-I", trackAndToggleMark(mark, 'atlassian.editor.format.italic.keyboard'));
    }

    if (name === "code") {
      bind("Mod-`", trackAndToggleMark(mark, 'atlassian.editor.format.monospace.keyboard'));
    }
  }

  for (let name in schema.nodes) {
    let node = schema.nodes[name];

    if (name === "bullet_list") {
      if (isMac) {
        bind("Shift-Cmd-B", clearAndApply(wrapInList(node), 'atlassian.editor.format.list.bullet.keyboard'));
      } else {
        bind("Shift-Ctrl-B", clearAndApply(wrapInList(node), 'atlassian.editor.format.list.bullet.keyboard'));
      }
    }

    if (name === "ordered_list") {
      if (isMac) {
        bind("Shift-Cmd-L", clearAndApply(wrapInList(node), 'atlassian.editor.format.list.numbered.keyboard'));
      } else {
        bind("Shift-Ctrl-L", clearAndApply(wrapInList(node), 'atlassian.editor.format.list.numbered.keyboard'));
      }
    }

    if (name === "blockquote") {
      if (isMac) {
        bind("Cmd-Alt-8", clearAndApply(wrapIn(node), 'atlassian.editor.format.blockquote.keyboard'));
      } else {
        bind("Ctrl-8", clearAndApply(wrapIn(node), 'atlassian.editor.format.blockquote.keyboard'));
      }
    }

    if (name === "hard_break") {
      let cmd = chainCommands(
        newlineInCode,
        pm => pm.tr.replaceSelection(node.create()).applyAndScroll()
      );
      bind("Mod-Enter", cmd);
      bind("Shift-Enter", cmd);
      if (isMac) {
        bind("Ctrl-Enter", cmd);
      }
    }

    if (name === "list_item") {
      bind("Enter", splitListItem(node));
      bind("Mod-[", liftListItem(node));
      bind("Mod-]", sinkListItem(node));
    }

    if (name === "paragraph") {
      if (isMac) {
        bind("Cmd-Alt-0", clearAndApply(setBlockType(node)));
      } else {
        bind("Ctrl-0", clearAndApply(setBlockType(node)));
      }
    }

    if (name === "code_block") {
      if (isMac) {
        bind("Cmd-Alt-7", clearAndApply(setBlockType(node), 'atlassian.editor.format.codeblock.keyboard'));
      } else {
        bind("Ctrl-7", clearAndApply(setBlockType(node), 'atlassian.editor.format.codeblock.keyboard'));
      }
      // https://github.com/ProseMirror/prosemirror/issues/419
      bind("Enter", (pm, apply) => {
        let {$from, $head, empty} = pm.selection;

        if (!$from.parent.type.isCode) {
          return false;
        }

        if (apply !== false) {
          if (
            $head.parent.textContent.slice(-1) === "\n"
            && empty
            // nodeSize includes newlines
            && $head.parentOffset === $head.parent.nodeSize - 2
          ) {
            commands.deleteCharBefore(pm);
            return false;
          }

          pm.tr.typeText("\n").applyAndScroll();
        }

        return true;
      });
    }

    if (name === "heading") {
      for (let i = 1; i <= 5; i++) {
        if (isMac) {
          bind("Cmd-Alt-" + i, clearAndApply(setBlockType(node, {level: i}), `atlassian.editor.format.heading${i}.keyboard`));
        } else {
          bind("Ctrl-" + i, clearAndApply(setBlockType(node, {level: i}), `atlassian.editor.format.heading${i}.keyboard`));
        }
      }
    }

    if (name === "horizontal_rule") {
      bind("Mod-Shift--", pm => pm.tr.replaceSelection(node.create()).applyAndScroll());
    }
  }
  return new Keymap(keys);
}
