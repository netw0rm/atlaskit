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

export default class TaskItem extends PureComponent<Props, {}> {

  handleOnChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    const { onChange, taskId, isDone } = this.props;
    if (onChange) {
      onChange(taskId, !isDone);
    }
  }

  render() {
    const { isDone, contentRef, children, taskId } = this.props;
    const localId = `${taskId}-${Date.now()}`;

    return (
      <Wrapper>
        <CheckBoxWrapper contentEditable={false}>
          <input
            id={localId}
            name={localId}
            type="checkbox"
            onChange={this.handleOnChange}
            checked={!!isDone}
          />
          <label htmlFor={localId} />
        </CheckBoxWrapper>
        <ContentWrapper innerRef={contentRef}>
          {children}
        </ContentWrapper>
      </Wrapper>
    );
  }
}
