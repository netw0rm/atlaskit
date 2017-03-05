import { Component, ReactNode, MouseEvent, KeyboardEvent } from 'react';

type KeyboardOrMouseEvent = MouseEvent<any> | KeyboardEvent<any>;

interface Props {
  isDisabled?: boolean;
  isHidden?: boolean;
  isActive?: boolean;
  isSelected?: boolean;
  isChecked?: boolean;
  isFocused?: boolean;
  href?: string;
  target?: string;
  type?: 'link' | 'radio' | 'checkbox' | 'option';
  onActivate?: (attr: { item: Item, event: KeyboardOrMouseEvent }) => void;
  elemBefore?: ReactNode;
  elemAfter?: ReactNode;
}

interface State {}

export default class Item extends Component<Props, State> {}
