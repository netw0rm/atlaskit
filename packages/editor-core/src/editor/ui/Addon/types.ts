import EditorActions from '../../actions';

export type RenderOnClickHandler = (closePopup: () => void) => React.ReactElement<any>;

export interface AddonCommonProps {
  icon: React.ReactElement<any>;
  action?: (editorActions: EditorActions) => void;
  renderOnClick?: RenderOnClickHandler;
}

export interface AddonProps extends AddonCommonProps {
  onClick?: () => void;
}

export interface AddonConfiguration extends AddonCommonProps {
  text: string;
}
