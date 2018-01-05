import * as React from 'react';
import { PureComponent } from 'react';
import TaskItem from './TaskItem';
import { Appearance, ContentRef, TaskDecisionProvider, TaskState, User, UserInfo } from '../types';

export interface Props {
  taskId: string;
  isDone?: boolean;
  onChange?: (taskId: string, isChecked: boolean) => void;
  contentRef?: ContentRef;
  children?: any;
  taskDecisionProvider?: Promise<TaskDecisionProvider>;
  objectAri?: string;
  containerAri?: string;
  showPlaceholder?: boolean;
  appearance?: Appearance;
  participants?: User[];
  showParticipants?: boolean;
  creator?: User;
  lastUpdater?: User;
}

export interface State {
  isDone?: boolean;
  lastUpdater?: UserInfo;
}

export default class ResourcedTaskItem extends PureComponent<Props, State> {
  public static defaultProps: Partial<Props> = {
    appearance: 'inline'
  };
  private mounted: boolean;

  constructor(props: Props) {
    super(props);

    this.state = {
      isDone: props.isDone,
      lastUpdater: props.lastUpdater,
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.subscribe(this.props.taskDecisionProvider, this.props.containerAri, this.props.objectAri);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.taskDecisionProvider !== this.props.taskDecisionProvider ||
        nextProps.containerAri !== this.props.containerAri ||
        nextProps.objectAri !== this.props.objectAri) {
      this.unsubscribe();
      this.subscribe(nextProps.taskDecisionProvider, nextProps.containerAri, nextProps.objectAri);
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.mounted = false;
  }

  private subscribe(taskDecisionProvider?: Promise<TaskDecisionProvider>, containerAri?: string, objectAri?: string) {
    if (taskDecisionProvider && containerAri && objectAri) {
      taskDecisionProvider.then(provider => {
        if (!this.mounted) {
          return;
        }
        const { taskId } = this.props;
        provider.subscribe({ localId: taskId, objectAri, containerAri }, this.onUpdate);
      });
    }
  }

  private unsubscribe() {
    const { taskDecisionProvider, taskId, objectAri, containerAri } = this.props;
    if (taskDecisionProvider && containerAri && objectAri) {
      taskDecisionProvider.then(provider => {
        provider.unsubscribe({ localId: taskId, objectAri, containerAri }, this.onUpdate);
      });
    }
  }

  private onUpdate = (state: TaskState) => {
    this.setState({ isDone: state === 'DONE' });
  }

  private handleOnChange = (taskId: string, isDone: boolean) => {
    const { taskDecisionProvider, objectAri, containerAri, onChange } = this.props;
    if (taskDecisionProvider && containerAri && objectAri) {
      // Optimistically update the task
      this.setState({ isDone });

      // Call provider to update task
      taskDecisionProvider.then(provider => {
        if (!this.mounted) {
          return;
        }
        provider.toggleTask({ localId: taskId, objectAri, containerAri }, isDone ? 'DONE' : 'TODO');
        // No provider.getCurrentUsername defaults to current delayed behaviour
        if (isDone && provider.getCurrentUsername) {
          // Undefined username shows 'Created By'/does not update to prevent incorrect 'Completed By' message
          this.setState({ lastUpdater: provider.getCurrentUsername() });
        }
      });
    }
    if (onChange) {
      onChange(taskId, isDone);
    }
  }

  render() {
    const { isDone, lastUpdater } = this.state;
    const { appearance, children, contentRef, creator, participants, showParticipants, showPlaceholder, taskId } = this.props;

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
