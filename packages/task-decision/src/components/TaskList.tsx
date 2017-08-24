import * as React from 'react';
import { PureComponent } from 'react';
import TaskItem from './TaskItem';
import ListWrapper from '../styled/ListWrapper';

export interface ContentRef {
  (ref: HTMLElement | undefined): void;
}

export interface Props {
  children?: Array<TaskItem> | TaskItem;
}

export default class TaskList extends PureComponent<Props,{}> {
  render() {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    return (
      <ListWrapper>
        {React.Children.map(children, (child, idx) =>
          <li key={idx}>{child}</li>
        )}
      </ListWrapper>
    );
  }
}
