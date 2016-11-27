import React, { PureComponent } from 'react';
import FeedbackIcon from 'ak-icon/glyph/feedback';
import * as styles from './styles.global.less';
import IconButton from '../ToolbarIconButton/index.react';
import DismissBlanket from '../DismissBlanket/index.react';

interface Props {
  feedbackFormUrl: string;
}

interface State {
  active: boolean;
}

export default class ToolbarFeedback extends PureComponent<Props, State> {
  state: State = { active: false };

  render() {
    return (
      <span className={styles.container}>
        <IconButton
          onClick={this.openFeedbackPanel}
          selected={this.state.active}
          icon={<FeedbackIcon label='Feedback' />}
        />
        {!this.state.active ? null :
        <DismissBlanket onDismiss={this.closeFeedbackPanel}>
          <div className={styles.popup}>
            <button
              type="button"
              className={styles.close}
              onClick={this.closeFeedbackPanel}
            >&#10005;</button>
            <iframe
              allowTransparency
              frameBorder="0"
              scrolling="no"
              src={this.props.feedbackFormUrl}
            />
          </div>
        </DismissBlanket>
        }
      </span>
    );
  }

  private openFeedbackPanel = () => {
    this.setState({ active: true });
  }

  private closeFeedbackPanel = () => {
    this.setState({ active: false });
  }
}
