import { EditorView } from '../../../prosemirror';
import { getMacroType } from './utils';
import { MacroProvider, MacroParams, Macro } from './types';
export const STATE_CHANGE = 'macros.handleStateChange';

export const handleStateChange = (view: EditorView) => {
  // make sure editable DOM node is mounted
  if (view.dom.parentNode) {
    view.dispatch(view.state.tr.setMeta(STATE_CHANGE, true));
  }
};

export const openMacroBrowser = async (view: EditorView, macroProvider: MacroProvider, macroParams?: MacroParams) => {
  if (!macroProvider) {
    return;
  }

  const newMacro: Macro = await macroProvider.openMacroBrowser(macroParams);
  if (newMacro) {
    const { state: { tr, schema }, dispatch } = view;
    const {
      macroId,
      name,
      placeholderUrl,
      params,
      displayType,
      plainTextBody,
      richTextBody
    } = newMacro;
    let node;

    switch (getMacroType(displayType, plainTextBody, richTextBody)) {
      case 'BODYLESS-INLINE':
        node = schema.nodes.inlineMacro.create({ macroId, name, placeholderUrl, params });
    }

    if (node) {
      dispatch(tr.replaceSelectionWith(node).scrollIntoView());
    }
  }
};
