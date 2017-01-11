import { Component, ReactNode } from 'react';

interface Props {
  appearance?: 'default' | 'tall';
  isOpen?: boolean;
  isTriggerNotTabbable?: boolean;
  listContext?: 'menu';
  onOpenChange?: ({ isOpen: boolean }) => void;
  position?: string;
  trigger?: ReactNode;
  isFitContainerWidthEnabled?: boolean;
}

interface State {}

export default class DropdownList extends Component<Props, State> {};
