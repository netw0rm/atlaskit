import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!./styles.less';
import Button from 'ak-button';
import InlineDialog from 'ak-inline-dialog';
import IconForType from './internal/IconForType';
import { types, defaultType } from './internal/types';

export default class InlineMessage extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    type: PropTypes.oneOf(types),
    secondaryText: PropTypes.string.isRequired,
  }

  static defaultProps = {
    type: defaultType,
  }

  state = {
    isOpen: false,
  }

  toggleDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render = () => (
    <div className={styles.root}>
      <InlineDialog
        content={this.props.children}
        isOpen={this.state.isOpen}
        position="bottom left"
        shouldFlip
      >
        <Button
          appearance="subtle-link"
          onClick={this.toggleDialog}
        >
          <div className={styles.buttonContents}>
            <IconForType type={this.props.type} />
            {
              this.props.title ? (
                <span className={styles.titleText}>
                  {this.props.title}
                </span>
              ) : null
            }
            {
              this.props.secondaryText ? (
                <span className={styles.secondaryText}>{this.props.secondaryText}</span>
              ) : null
            }
          </div>
        </Button>
      </InlineDialog>
    </div>
  )
}
