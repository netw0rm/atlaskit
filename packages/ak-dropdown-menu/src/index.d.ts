import { Component, ReactNode } from 'react';

interface Props {
  appearance?: 'default' | 'tall';
  children?: ReactNode;
  defaultOpen?: boolean;
  isTriggerNotTabbable?: boolean;
  items: Array<Object>;
  onItemActivated?: Function;
  onOpenChange?: Function;
  position?: string;
  triggerType?: 'default' | 'button';
}

interface State {}

export default class extends Component<Props, State> {}
