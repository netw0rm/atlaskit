import React, { PureComponent } from 'react';
import FeedbackIcon from 'ak-icon/glyph/feedback';
import Panel from '../Panel';
import * as styles from './styles.global.less';
import IconButton from '../ToolbarIconButton';
import DismissBlanket from '../DismissBlanket';

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
      <span style={{ position: 'relative' }}>
        <IconButton
          onClick={this.openFeedbackPanel}
          selected={this.state.active}
          icon={<FeedbackIcon label='Feedback' />}
        />
        {!this.state.active ? null :
        <DismissBlanket onDismiss={this.closeFeedbackPanel}>
          <Panel align='right' spacing='none'>
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
          </Panel>
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
