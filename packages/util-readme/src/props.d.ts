import { Component, ComponentClass } from 'react';

export interface Props {
  component: ComponentClass<any>;
  descriptions?: { [propName: string]: string };
  types?: { [propName: string]: string };
}

export default class extends Component<Props, {}> {}
