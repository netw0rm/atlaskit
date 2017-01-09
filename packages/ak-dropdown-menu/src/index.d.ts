import { Component, ReactElement } from 'react';

interface Props {
  appearance?: 'default' | 'tall';
  children?: ReactElement<any>;
  defaultOpen?: boolean;
  isTriggerNotTabbable?: boolean;
  items: Array;
  onItemActivated?: Function;
  onOpenChange?: Function;
  position?: string;
  triggerType?: 'default' | 'button';
}

interface State {}

export default class extends Component<Props, State> {};
