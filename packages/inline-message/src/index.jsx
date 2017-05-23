import React, { PureComponent, PropTypes } from 'react';
import Button from '@atlaskit/button';
import InlineDialog from '@atlaskit/inline-dialog';
import IconForType from './internal/IconForType';
import { types, defaultType } from './internal/types';
import styles from './styles.less';

export default class InlineMessage extends PureComponent {
  static propTypes = {
    /** The elements to be displayed by the inline dialog. */
    children: PropTypes.node,
    /** Text to display first, bolded for emphasis. */
    title: PropTypes.string,
    /** Set the icon to be used before the title. Options are: connectivity,
    confirmation, info, warning, and error. */
    type: PropTypes.oneOf(types),
    /** Text to display second. */
    secondaryText: PropTypes.string,
    /** Position prop to be passed to the inline dialog. Determines where around
    the text the dialog is displayed. */
    position: InlineDialog.propTypes.position,
  }

  static defaultProps = {
    type: defaultType,
    position: 'bottom left',
  }

  state = {
    isOpen: false,
  }

  toggleDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div className={styles.root}>
        <InlineDialog
          content={this.props.children}
          isOpen={this.state.isOpen}
          position={this.props.position}
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
    );
  }
}
