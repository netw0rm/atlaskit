import { Component, ComponentClass, ReactNode } from 'react';

export interface Props {
  component: string | ComponentClass<any>;
  description: ReactNode;
}

export default class extends Component<Props, {}> {}
