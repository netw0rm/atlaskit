import * as React from 'react';
import { PureComponent } from 'react';
import FeedbackIcon from 'ak-icon/glyph/feedback';
import Panel from '../Panel';
import * as styles from './styles';
import IconButton from '../ToolbarIconButton';

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
        <IconButton
          onClick={this.openFeedbackPanel}
          selected={this.state.active}
          icon={<FeedbackIcon label='Feedback' />}
        />
        {!this.state.active ? null :
        <Panel align='right' spacing='none' onOutsideClick={this.closeFeedbackPanel}>
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
