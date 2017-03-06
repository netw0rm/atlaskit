import { Component, ReactNode } from 'react';

interface Props {
  appearance?: 'default' | 'tall';
  isOpen?: boolean;
  isTriggerDisabled?: boolean;
  isTriggerNotTabbable?: boolean;
  onOpenChange?: ({ isOpen: boolean }) => void;
  position?: string;
  trigger?: ReactNode;
  shouldFitContainer?: boolean;
}

interface State {}

export default class DropdownList extends Component<Props, State> {}
