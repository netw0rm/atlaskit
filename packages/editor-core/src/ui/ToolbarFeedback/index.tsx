import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import ToolbarButton from '../ToolbarButton';

const JIRA_ISSUE_COLLECTOR_URL = 'https://product-fabric.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/-j519ub/b/c/78bd26fb4be69a8bdb879359a9397e96/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-US&collectorId=305d3263';
const JQUERY_CDN_URL = 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js';

export interface Props {
  feedbackFormUrl: string;
}

export interface State {
  active: boolean;
}

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
    // JIRA issue collector script is using jQuery internally
    // we just need to ensure jQuery is available on the host page
    this.ensureJqueryLoaded().then((jQuery: any) => {
      const self = this;

      // triggerFunction is executed as soon as JIRA issue collector script is loaded
      window.ATL_JQ_PAGE_PROPS = {
        triggerFunction: (showCollectorDialog) => {
          self.showJiraCollectorDialogCallback = showCollectorDialog;
        }
      };

      // load JIRA issue collector script
      jQuery.ajax({
        url: JIRA_ISSUE_COLLECTOR_URL,
        type: 'get',
        cache: true,
        dataType: 'script'
      });
    });
  }

  render() {
    return (
      <span style={{ display: 'inline-block' }}>
        <ToolbarButton onClick={this.openFeedbackPopup} selected={false} spacing="compact">
          Feedback
        </ToolbarButton>
      </span>
    );
  }

  @analytics('atlassian.editor.feedback.button')
  private openFeedbackPopup = () => {
    this.showJiraCollectorDialogCallback();
  }

  private ensureJqueryLoaded = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      if (window.jQuery) {
        resolve(window.jQuery);
        return;
      }

      const scriptElem = document.createElement('script');
      scriptElem.type = 'text/javascript';
      scriptElem.src = JQUERY_CDN_URL;

      scriptElem.onload = () => {
        resolve(window.jQuery);
      };

      scriptElem.onerror = (err) => {
        reject(err);
      };

      (document.head || document.body).appendChild(scriptElem);
    });
  }
}
