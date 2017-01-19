import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import Panel from '../Panel';
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
      <span style={{ position: 'relative' }}>
        <ToolbarButton onClick={this.openFeedbackPanel} selected={this.state.active} spacing="compact">
          Feedback
        </ToolbarButton>
        {!this.state.active ? null :
        <Panel align="right" spacing="none" onOutsideClick={this.closeFeedbackPanel}>
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
        </Panel>
        }
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
