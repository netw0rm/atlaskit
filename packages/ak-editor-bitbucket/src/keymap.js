/* eslint-disable */
import { browser, commands, Keymap } from  "ak-editor-prosemirror";

const { wrapIn, setBlockType, wrapInList, splitListItem, liftListItem,
  sinkListItem, chainCommands, newlineInCode, toggleMark } = commands;

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

  for (let name in schema.marks) {
    let mark = schema.marks[name];

    if (name === "strong") {
      bind("Mod-B", toggleMark(mark));
    }

    if (name === "em") {
      bind("Mod-I", toggleMark(mark));
    }

    if (name === "code") {
      bind("Mod-`", toggleMark(mark));
    }
  }
  for (let name in schema.nodes) {
    let node = schema.nodes[name];

    if (name === "bullet_list") {
      bind("Shift-Ctrl-8", wrapInList(node));
    }

    if (name === "ordered_list") {
      bind("Shift-Ctrl-9", wrapInList(node));
    }

    if (name === "blockquote") {
      bind("Shift-Ctrl-.", wrapIn(node));
    }

    if (name === "hard_break") {
      let cmd = chainCommands(
        newlineInCode,
        pm => pm.tr.replaceSelection(node.create()).applyAndScroll()
      );
      bind("Mod-Enter", cmd);
      bind("Shift-Enter", cmd);
      if (browser.mac) {
        bind("Ctrl-Enter", cmd);
      }
    }

    if (name === "list_item") {
      bind("Enter", splitListItem(node));
      bind("Mod-[", liftListItem(node));
      bind("Mod-]", sinkListItem(node));
    }

    if (name === "paragraph") {
      bind("Shift-Ctrl-0", setBlockType(node));
    }

    if (name === "code_block") {
      bind("Shift-Ctrl-\\", setBlockType(node));
      // https://github.com/ProseMirror/prosemirror/issues/419
      bind("Enter", (pm, apply) => {
        if (apply !== false) {
          if (pm.selection.$head.parent.textContent.slice(-1) === "\n") {
            commands.deleteCharBefore(pm);
            return false;
          }

          pm.tr.typeText("\n").applyAndScroll();
        }

        return true;
      });
    }

    if (name === "heading") {
      for (let i = 1; i <= 6; i++) {
        bind("Shift-Ctrl-" + i, setBlockType(node, {level: i}));
      }
    }

    if (name === "horizontal_rule") {
      bind("Mod-Shift--", pm => pm.tr.replaceSelection(node.create()).applyAndScroll());
    }
  }
  return new Keymap(keys);
}
