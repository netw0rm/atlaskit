import * as React from 'react';
import { PureComponent, ReactElement } from 'react';
import TaskItem from './TaskItem';
import { TaskDecisionProvider } from '../types';

export interface Props {
  taskId: string;
  isDone?: boolean;
  onChange?: (taskId: string, isChecked: boolean) => void;
  children?: ReactElement<any>;
  taskDecisionProvider?: TaskDecisionProvider;
  ari: string;
  containerAri: string;
}

export interface State {
  isDone?: boolean;
}

export default class ResourcedTaskItem extends PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      isDone: props.isDone
    };
  }

  componentDidMount() {
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
  }

  private subscribe(provider?: TaskDecisionProvider) {
    if (provider) {
      const { taskId, ari, containerAri } = this.props;
      provider.subscribe({ taskId, ari, containerAri }, this.onUpdate);
    }
  }

  private unsubscribe() {
    const { taskDecisionProvider, taskId, ari, containerAri } = this.props;
    if (taskDecisionProvider) {
      taskDecisionProvider.unsubscribe({ taskId, ari, containerAri }, this.onUpdate);
    }
  }

  private onUpdate = (isDone: boolean) => {
    this.setState({ isDone });
  }

  private handleOnChange = (taskId: string, isDone: boolean) => {
    const { taskDecisionProvider, ari, containerAri } = this.props;
    if (taskDecisionProvider) {
      // Optimistically update the task
      this.setState({ isDone });

      // Call provider to update task
      taskDecisionProvider
        .toggleTask({ taskId, ari, containerAri }, isDone)
        .then(result => {
          if (result !== isDone) { // Avoid unnecessary re-render
            this.setState({ isDone: result });
          }
        })
        .catch(() => {
          this.setState({ isDone: this.props.isDone }); // Roll-back when something goes wrong
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
