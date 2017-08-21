import EditorActions from '../../actions';

export type RenderOnClickHandler = (editorActions: EditorActions, closePopup: () => void) => React.ReactElement<any>;

export interface AddonCommonProps {
  icon: React.ReactElement<any>;
  actionOnClick?: (editorActions: EditorActions) => void;
  renderOnClick?: RenderOnClickHandler;
}

export interface AddonProps extends AddonCommonProps {
  onClick?: () => void;
  children?: React.ReactElement<any>[];
}

export interface AddonConfiguration extends AddonCommonProps {
  text: string;
}
