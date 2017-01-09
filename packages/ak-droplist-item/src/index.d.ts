import { Component, ReactNode, MouseEvent, KeyboardEvent } from 'react';

type KeyboardOrMouseEvent = MouseEvent | KeyboardEvent;

interface Props {
  isDisabled?: boolean;
  isHidden?: boolean;
  isActive?: boolean;
  isChecked?: boolean;
  isFocused?: boolean;
  href?: string;
  target?: string;
  type?: 'link' | 'checkbox' | 'radio';
  onActivate?: ({ item: Item, event: KeyboardOrMouseEvent }) => void;
  onKeyDown?: ({ item: Item, event: KeyboardEvent }) => void;
  elemBefore?: ReactNode;
  elemAfter?: ReactNode;
}

interface State {}

export default class Item extends Component<Props, State> {};
