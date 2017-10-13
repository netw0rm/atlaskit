import { EditorView } from '../../../prosemirror';
import { getMacroType } from './utils';
import { MacroProvider, MacroParams, Macro } from './types';

export const insertMacroFromMacroBrowser = async (view: EditorView, macroProvider: MacroProvider, macroParams?: MacroParams) => {
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
