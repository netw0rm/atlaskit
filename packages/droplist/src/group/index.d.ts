import { Component, ReactNode } from 'react';

interface Props {
  heading?: string;
  elemAfter?: string | ReactNode;
}

interface State {}

export default class Group extends Component<Props, State> {}
