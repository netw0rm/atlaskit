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

  showJiraCollectorDialogCallback: () => void;

  constructor(...args) {
    super(...args);

    // when JIRA issue collector script is loaded
    // its callback is saved into this field
    this.showJiraCollectorDialogCallback = () => {};
  }

  componentDidMount() {
    // triggerFunction is executed as soon as JIRA issue collector script is loaded
    window.ATL_JQ_PAGE_PROPS = {
      triggerFunction: (showCollectorDialog) => {
        this.showJiraCollectorDialogCallback = showCollectorDialog;
      }
    };

    this.loadJiraIssueCollectorScript();
  }

  render() {
    // JIRA issue collector script is using jQuery internally
    return window.jQuery
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
    this.showJiraCollectorDialogCallback();
  }

  private loadJiraIssueCollectorScript = (): void => {
    const scriptElem = document.createElement('script');
    scriptElem.type = 'text/javascript';
    scriptElem.src = JIRA_ISSUE_COLLECTOR_URL;
    (document.head || document.body).appendChild(scriptElem);
  }
}
