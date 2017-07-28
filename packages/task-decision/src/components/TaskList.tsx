import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import TaskItem from './TaskItem';

export interface ContentRef {
  (ref: HTMLElement | undefined): void;
}

export interface Props {
  children?: Array<TaskItem> | TaskItem;
}

// tslint:disable-next-line:variable-name
const ListWrapper = styled.ol`
  list-style-type: none;
  margin: 0 4px;
  padding-left: 0;
`;

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
