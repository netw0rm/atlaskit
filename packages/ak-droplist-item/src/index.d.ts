import { Component, ReactElement } from 'react';

interface Props {
  isDisabled?: boolean;
  isHidden?: boolean;
  isActive?: boolean;
  isChecked?: boolean;
  isFocused?: boolean;
  href?: string;
  target?: string;
  type?: 'link' | 'checkbox' | 'radio';
  onActivated?: ({ item: Item, event: Event }) => void;
  onKeyDown?: ({ item: Item, event: Event }) => void;
  elemBefore?: Element;
  elemAfter?: Element;
}

interface State {}

export default class Item extends Component<Props, State> {};
