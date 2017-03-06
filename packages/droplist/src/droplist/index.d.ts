import { Component, ReactNode } from 'react';

interface Props {
  appearance?: 'default' | 'tall';
  isOpen?: boolean;
  shouldFitContainer?: boolean;
  onClick?: () => void;
  onKeyDown?: () => void;
  onOpenChange?: ({ isOpen: boolean }) => void;
  position?: string;
  trigger?: ReactNode;
  shouldFlip?: boolean;
}

interface State {}

export default class DropdownList extends Component<Props, State> {}
