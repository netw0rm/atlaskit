import * as React from 'react';
import { PureComponent, ReactElement } from 'react';

import { withAnalytics, FireAnalyticsEvent } from '@atlaskit/analytics';

import {
  CheckBoxWrapper,
} from '../styled/TaskItem';

import Item from './Item';
import { Appearance, User } from '../types';

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
  participants?: User[];
  showParticipants?: boolean;
  creator?: User;
  lastUpdater?: User;
  fireAnalyticsEvent?: FireAnalyticsEvent;
}

let taskCount = 0;
const getCheckBoxId = (localId: string) => `${localId}-${taskCount++}`;

export class InternalTaskItem extends PureComponent<Props, {}> {
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
    const { onChange, fireAnalyticsEvent, taskId, isDone } = this.props;
    const newIsDone = !isDone;
    if (onChange) {
      onChange(taskId, newIsDone);
    }
    if (fireAnalyticsEvent) {
      fireAnalyticsEvent(newIsDone ? 'check' : 'uncheck', {});
    }
  }

  getAttributionText() {
    const { creator, lastUpdater, isDone } = this.props;

    if (isDone && lastUpdater) {
      return `Completed by ${lastUpdater.displayName}`;
    }

    if (!creator || !creator.displayName) {
      return undefined;
    }

    return `Added by ${creator.displayName}`;
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
        attribution={this.getAttributionText()}
      >
        {children}
      </Item>
    );
  }
}

// This is to ensure that the "type" is exported, as it gets lost and not exported along with TaskItem after
// going through the high order component.
// tslint:disable-next-line:variable-name
const TaskItem = withAnalytics<typeof InternalTaskItem>(InternalTaskItem, {}, { analyticsId: 'atlassian.fabric.action' });
type TaskItem = InternalTaskItem;

export default TaskItem;
