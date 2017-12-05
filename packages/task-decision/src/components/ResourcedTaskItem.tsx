import * as React from 'react';
import { PureComponent } from 'react';
import TaskItem from './TaskItem';
import { Appearance, ContentRef, TaskDecisionProvider, TaskState, User } from '../types';

export interface Props {
  taskId: string;
  isDone?: boolean;
  onChange?: (taskId: string, isChecked: boolean) => void;
  contentRef?: ContentRef;
  children?: any;
  taskDecisionProvider?: Promise<TaskDecisionProvider>;
  objectAri: string;
  containerAri: string;
  showPlaceholder?: boolean;
  appearance?: Appearance;
  participants?: User[];
  showParticipants?: boolean;
  creator?: User;
  lastUpdater?: User;
}

export interface State {
  isDone?: boolean;
}

export default class ResourcedTaskItem extends PureComponent<Props, State> {
  public static defaultProps: Partial<Props> = {
    appearance: 'inline'
  };

  private mounted: boolean;

  constructor(props: Props) {
    super(props);

    this.state = {
      isDone: props.isDone
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.subscribe(this.props.taskDecisionProvider);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.taskDecisionProvider !== this.props.taskDecisionProvider) {
      this.unsubscribe();
      this.subscribe(nextProps.taskDecisionProvider);
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.mounted = false;
  }

  private subscribe(taskDecisionProvider?: Promise<TaskDecisionProvider>) {
    if (taskDecisionProvider) {
      taskDecisionProvider.then(provider => {
        if (!this.mounted) {
          return;
        }
        const { taskId, objectAri, containerAri } = this.props;
        provider.subscribe({ localId: taskId, objectAri, containerAri }, this.onUpdate);
      });
    }
  }

  private unsubscribe() {
    const { taskDecisionProvider, taskId, objectAri, containerAri } = this.props;
    if (taskDecisionProvider) {
      taskDecisionProvider.then(provider => {
        provider.unsubscribe({ localId: taskId, objectAri, containerAri }, this.onUpdate);
      });
    }
  }

  private onUpdate = (state: TaskState) => {
    this.setState({ isDone: state === 'DONE' });
  }

  private handleOnChange = (taskId: string, isDone: boolean) => {
    const { taskDecisionProvider, objectAri, containerAri } = this.props;
    if (taskDecisionProvider) {
      // Optimistically update the task
      this.setState({ isDone });

      // Call provider to update task
      taskDecisionProvider.then(provider => {
        if (!this.mounted) {
          return;
        }
        provider.toggleTask({ localId: taskId, objectAri, containerAri }, isDone ? 'DONE' : 'TODO');
      });
    }
  }

  render() {
    const { isDone } = this.state;
    const { appearance, children, contentRef, creator, participants, showParticipants, showPlaceholder, taskId, lastUpdater } = this.props;

    return (
      <TaskItem
        isDone={isDone}
        taskId={taskId}
        onChange={this.handleOnChange}
        appearance={appearance}
        contentRef={contentRef}
        participants={participants}
        showParticipants={showParticipants}
        showPlaceholder={showPlaceholder}
        creator={creator}
        lastUpdater={lastUpdater}
      >
        {children}
      </TaskItem>
    );
  }
}
