import { EditorView, Mark } from '../../../../prosemirror';
import { Command } from '../../../../commands';
import stateKey from './plugin-key';
import { normalizeUrl } from './utils';

export interface HyperlinkOptions {
  href: string;
  text?: string;
}

export function hideLinkPanel(): Command {
  return function (state, dispatch) {
    const { tr } = state;
    tr.setMeta(stateKey, { showToolbarPanel: false });
    dispatch(tr);
    return true;
  };
}

export function addLink(options: HyperlinkOptions, linkable: boolean, active: boolean): Command {
  return function (state, dispatch) {
    if (!linkable || active) {
      return false;
    }

    const { href, text } = options;
    const { selection, schema, tr } = state;
    const { empty, $from, $to } = selection;
    const mark = state.schema.mark('link', { href: normalizeUrl(href) });

    if (empty) {
      tr.insert($from.pos, schema.text(text || href, [mark]));
    } else {
      tr.addMark($from.pos, $to.pos, mark);
    }

    dispatch(tr);
    return true;
  };
}

export function removeLink(view: EditorView, activeLinkStartPos?: number, linkedText?: string, activeLinkMark?: Mark): Command {
  return function (state, dispatch) {
    if (!activeLinkStartPos || !linkedText) {
      return false;
    }
    const { tr } = state;
    const from = activeLinkStartPos;
    const to = from + linkedText.length;

    dispatch(tr.removeMark(from, to, activeLinkMark));
    view.focus();
    return true;
  };
}

export function updateLink(options: HyperlinkOptions, activeLinkStartPos?: number, linkedText?: string, activeLinkMark?: Mark): Command {
  return function (state, dispatch) {
    if (!activeLinkStartPos || !linkedText) {
      return false;
    }
    const from = activeLinkStartPos;
    const to = activeLinkStartPos + linkedText.length;

    dispatch(state.tr
      .removeMark(from, to, activeLinkMark)
      .addMark(from, to, state.schema.mark('link', { href: normalizeUrl(options.href) })));
    return true;
  };
}

export function updateLinkText(newLinkedText: string, view: EditorView, activeLinkStartPos?: number, currentLinkedText?: string, activeLinkMark?: Mark): Command {
  return function (state, dispatch) {
    if (!activeLinkStartPos || !currentLinkedText) {
      return false;
    }
    const from = activeLinkStartPos;
    const to = from + currentLinkedText.length;
    const newTo = from + newLinkedText.length;

    view.dispatch(state.tr.insertText(newLinkedText, from, to)
      .addMark(from, newTo, activeLinkMark!));
    view.focus();
    return true;
  };
}
