import * as React from 'react';
import { PureComponent } from 'react';
import ModalDialog from '@atlaskit/modal-dialog';
import { analyticsDecorator as analytics } from '../../analytics';
import ToolbarButton from '../ToolbarButton';
import * as styles from './styles';

export interface Props {
  feedbackFormUrl: string;
}

export interface State {
  active: boolean;
}

export default class ToolbarFeedback extends PureComponent<Props, State> {
  state: State = { active: false };

  render() {
    return (
      <span style={{ display: 'inline-block' }}>
        <ToolbarButton onClick={this.openFeedbackPanel} selected={this.state.active} spacing="compact">
          Feedback
        </ToolbarButton>
        <ModalDialog
          onDialogDismissed={this.closeFeedbackPanel}
          isOpen={this.state.active}
        >
          <div className={styles.popup}>
              <button
                type="button"
                className={styles.close}
                onClick={this.closeFeedbackPanel}
              >
              &#10005;
              </button>
              <iframe
                allowTransparency
                frameBorder="0"
                scrolling="no"
                src={this.props.feedbackFormUrl}
              />
            </div>
        </ModalDialog>
      </span>
    );
  }

  @analytics('atlassian.editor.feedback.button')
  private openFeedbackPanel = () => {
    this.setState({ active: true });
  }

  private closeFeedbackPanel = () => {
    this.setState({ active: false });
  }
}
