import * as React from 'react';
import { PureComponent, ReactElement } from 'react';
import {
  Wrapper,
  CheckBoxWrapper,
  ContentWrapper
} from '../styled/TaskItem';

export interface ContentRef {
  (ref: HTMLElement | undefined): void;
}

export interface Props {
  taskId: string;
  isDone?: boolean;
  onChange?: (taskId: string, isChecked: boolean) => void;
  contentRef?: ContentRef;
  children?: ReactElement<any>;
}

let taskCount = 0;
const getCheckBoxId = (localId: string) => `${localId}-${taskCount++}`;

export default class TaskItem extends PureComponent<Props, {}> {

  private checkBoxId: string;

  constructor(props) {
    super(props);
    this.checkBoxId = getCheckBoxId(props.taskId);
  }

  handleOnChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    const { onChange, taskId, isDone } = this.props;
    if (onChange) {
      onChange(taskId, !isDone);
    }
  }

  render() {
    const { isDone, contentRef, children } = this.props;

    return (
      <Wrapper>
        <CheckBoxWrapper contentEditable={false}>
          <input
            id={this.checkBoxId}
            name={this.checkBoxId}
            type="checkbox"
            onChange={this.handleOnChange}
            checked={!!isDone}
          />
          <label htmlFor={this.checkBoxId} />
        </CheckBoxWrapper>
        <ContentWrapper innerRef={contentRef}>
          {children}
        </ContentWrapper>
      </Wrapper>
    );
  }
}
