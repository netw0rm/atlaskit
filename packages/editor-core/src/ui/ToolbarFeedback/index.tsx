import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import ToolbarButton from '../ToolbarButton';

const JIRA_ISSUE_COLLECTOR_URL = 'https://product-fabric.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/-j519ub/b/c/78bd26fb4be69a8bdb879359a9397e96/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-US&collectorId=305d3263';

export interface Props {}
export interface State {}

declare global {
  interface Window {
    jQuery: any;
    ATL_JQ_PAGE_PROPS: any;
  }
}

export default class ToolbarFeedback extends PureComponent<Props, State> {

  showJiraCollectorDialogCallback?: () => void;

  render() {
    // JIRA issue collector script is using jQuery internally
    return this.hasJquery()
      ? (
        <span style={{ display: 'inline-block' }}>
          <ToolbarButton onClick={this.openFeedbackPopup} selected={false} spacing="compact">
            Feedback
          </ToolbarButton>
        </span>
      )
      : null;
  }

  @analytics('atlassian.editor.feedback.button')
  private openFeedbackPopup = () => {
    if (typeof this.showJiraCollectorDialogCallback === 'function') {
      this.showJiraCollectorDialogCallback();
      return;
    }

    // triggerFunction is executed as soon as JIRA issue collector script is loaded
    window.ATL_JQ_PAGE_PROPS = {
      triggerFunction: (showCollectorDialog) => {
        if (typeof showCollectorDialog === 'function') {
          // save reference to `showCollectorDialog` for future calls
          this.showJiraCollectorDialogCallback = showCollectorDialog;

          // and run it now
          // next tick is essential due to JIRA issue collector behaviour
          setTimeout(showCollectorDialog, 0);
        }
      }
    };

    this.loadJiraIssueCollectorScript();
  }

  private loadJiraIssueCollectorScript = (): void => {
    if (this.hasJquery()) {
      window.jQuery.ajax({
        url: JIRA_ISSUE_COLLECTOR_URL,
        type: 'get',
        cache: true,
        dataType: 'script'
      });
    }
  }

  private hasJquery = (): boolean => {
    return (typeof window.jQuery !== 'undefined');
  }
}
