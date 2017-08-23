import Message from '../ui/Appearance/Message';
import FullPage from '../ui/Appearance/FullPage';
import { EditorAppearance, EditorAppearanceComponentProps } from '../types';

export default function getUiComponent(
  appearance: EditorAppearance
): React.ComponentClass<EditorAppearanceComponentProps> {
  appearance = appearance || 'message';

  switch (appearance) {
    case 'message':
      return Message;
    case 'full-page':
      return FullPage;
    default:
      throw new Error(`Appearance '${appearance}' is not supported by the editor.`);
  }
}
