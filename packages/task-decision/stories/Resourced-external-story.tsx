import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent } from 'react';

import { TaskDecisionProvider } from '../src/types';
import ResourcedItemList from '../src/components/ResourcedItemList';
import TaskDecisionResource from '../src/api/TaskDecisionResource';

import { createRenderer } from './story-utils';

let tdConfig;
try {
  // tslint:disable-next-line import/no-unresolved, no-var-requires
  tdConfig = require('../local-config')['default'];
} catch (e) {
  // tslint:disable-next-line import/no-unresolved, no-var-requires
  tdConfig = require('../local-config-example')['default'];
}

interface NotifyChangesProps {
  taskDecisionProvider: TaskDecisionProvider;
}

class NotifyChanges extends PureComponent<NotifyChangesProps,{}> {
  private renderDocument;

  componentWillMount() {
    const { taskDecisionProvider } = this.props;
    if (taskDecisionProvider) {
      this.renderDocument = createRenderer(taskDecisionProvider);
    }
  }

  componentWillReceiveProps(nextProps: NotifyChangesProps) {
    const { taskDecisionProvider } = nextProps;
    if (taskDecisionProvider !== this.props.taskDecisionProvider) {
      if (taskDecisionProvider) {
        this.renderDocument = createRenderer(taskDecisionProvider);
      } else {
        this.renderDocument = undefined;
      }
    }
  }

  handleNotify = () => {
    this.props.taskDecisionProvider.notifyRecentUpdates(tdConfig.initialQuery.containerAri);
  }

  render() {
    if (!this.props.taskDecisionProvider || !this.renderDocument) {
      return null;
    }

    return (
      <div>
        <div>
          Select <button onClick={this.handleNotify}>notify</button> to look for newest items from service.
        </div>
        <ResourcedItemList
          renderDocument={this.renderDocument}
          initialQuery={tdConfig.initialQuery}
          taskDecisionProvider={Promise.resolve(this.props.taskDecisionProvider)}
        />
      </div>
    );
  }
}

storiesOf('<ResourcedItemList/> - External', module)
  .add('Real data', () => {
    const taskDecisionProvider = new TaskDecisionResource(tdConfig.serviceConfig);

    return (
      <NotifyChanges taskDecisionProvider={taskDecisionProvider} />
    );
  });
