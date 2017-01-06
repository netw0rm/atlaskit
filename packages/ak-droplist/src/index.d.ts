import { Component, ReactElement } from 'react';

interface Props {
  appearance?: 'default' | 'tall';
  isOpen?: boolean;
  isTriggerNotTabbable?: boolean;
  listContext?: 'menu';
  onOpenChange?: ({ isOpen: boolean }) => void;
  position?: string;
  trigger?: JSX.Element | Element;
}

interface State {}

export default class DropdownList extends Component<Props, State> {};
