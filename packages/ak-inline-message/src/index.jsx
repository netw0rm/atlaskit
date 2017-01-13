import React, {
  PureComponent,
  // PropTypes,
} from 'react';
import WarningIcon from 'ak-icon/glyph/warning';
import styles from 'style!./styles.less';
import Button from 'ak-button';
import InlineDialog from 'ak-inline-dialog';

export default class InlineMessage extends PureComponent {
  state = {
    isOpen: false,
  }

  toggleDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render = () => (
    <div className={styles.root}>
      <InlineDialog
        content={
          <div>
            <span style={{ display: 'block', fontWeight: 'bold', paddingBottom: 8 }}>Authenticate heading</span>
            <span>Authenticate <a href="">here</a> to see more information</span>
          </div>
        }
        position="bottom left"
        isOpen={this.state.isOpen}
      >
        <Button
          appearance={this.props.appearance}
          onClick={this.toggleDialog}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                color: 'orange',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <WarningIcon />
            </span>
            <span style={{ fontWeight: 500, padding: '0 4px' }}>JIRA Service Desk </span>
            <span>Authenticate to see more information</span>
          </div>
        </Button>
      </InlineDialog>
    </div>
  )
}
