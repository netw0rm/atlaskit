import * as React from 'react';
import { PureComponent, ReactElement } from 'react';
import TaskItem from './TaskItem';
import { TaskDecisionProvider, TaskState } from '../types';

export interface Props {
  taskId: string;
  isDone?: boolean;
  onChange?: (taskId: string, isChecked: boolean) => void;
  children?: ReactElement<any>;
  taskDecisionProvider?: Promise<TaskDecisionProvider>;
  objectAri: string;
  containerAri: string;
}

export interface State {
  isDone?: boolean;
}

export default class ResourcedTaskItem extends PureComponent<Props, State> {
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
        provider.toggleTask({ localId: taskId, objectAri, containerAri }, isDone ? 'DONE' : 'TODO')
        .then(result => {
          if (!this.mounted) {
            return;
          }
            const newState = result === 'DONE';
          if (newState !== isDone) { // Avoid unnecessary re-render
            this.setState({ isDone: newState });
          }
        })
        .catch(() => {
          if (!this.mounted) {
            return;
          }
          this.setState({ isDone: this.props.isDone }); // Roll-back when something goes wrong
        });
      });
    }
  }

  render() {
    const { isDone } = this.state;
    const { children, taskId } = this.props;

    return (
      <TaskItem isDone={isDone} taskId={taskId} onChange={this.handleOnChange}>
        {children}
      </TaskItem>
    );
  }

}
