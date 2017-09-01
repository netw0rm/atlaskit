import * as React from 'react';
import { PureComponent, ReactElement } from 'react';

import {
  CheckBoxWrapper,
} from '../styled/TaskItem';

import Item from './Item';
import { Appearance, Participant } from '../types';

export interface ContentRef {
  (ref: HTMLElement | undefined): void;
}

export interface Props {
  taskId: string;
  isDone?: boolean;
  onChange?: (taskId: string, isChecked: boolean) => void;
  contentRef?: ContentRef;
  children?: ReactElement<any>;
  showPlaceholder?: boolean;
  appearance?: Appearance;
  participants?: Participant[];
  showParticipants?: boolean;
}

let taskCount = 0;
const getCheckBoxId = (localId: string) => `${localId}-${taskCount++}`;

export default class TaskItem extends PureComponent<Props, {}> {
  public static defaultProps: Partial<Props> = {
    appearance: 'inline',
  };

  private checkBoxId: string;

  constructor(props) {
    super(props);
    this.checkBoxId = getCheckBoxId(props.taskId);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.taskId !== this.props.taskId) {
      this.checkBoxId = getCheckBoxId(nextProps.taskId);
    }
  }

  handleOnChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    const { onChange, taskId, isDone } = this.props;
    if (onChange) {
      onChange(taskId, !isDone);
    }
  }

  render() {
    const { appearance, isDone, contentRef, children, participants, showPlaceholder } = this.props;

    const icon = (
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
    );

    return (
      <Item
        appearance={appearance}
        contentRef={contentRef}
        icon={icon}
        participants={participants}
        placeholder="Add an action…"
        showPlaceholder={showPlaceholder}
      >
        {children}
      </Item>
    );
  }
}
