import { Component, ReactNode } from 'react';

interface Props {
  appearance?: 'default' | 'tall' | 'manual';
  isOpen?: boolean;
  shouldFitContainer?: boolean;
  onClick?: () => void;
  onKeyDown?: () => void;
  onOpenChange?: ({ isOpen: boolean }) => void;
  position?: string;
  trigger?: ReactNode;
  shouldFlip?: boolean;
  manualMaxHeight?: number;
}

interface State {}

export default class DropdownList extends Component<Props, State> {}
