import { Component, ComponentClass } from 'react';

export interface Props {
  component: string | ComponentClass<any>;
  description: string;
}

export default class extends Component<Props, {}> {}
