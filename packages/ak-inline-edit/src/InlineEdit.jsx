import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!./styles.less';
import EditView from './Edit';
import ReadView from './Read';

export default class InlineEdit extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    readView: PropTypes.node.isRequired,
    editView: PropTypes.node.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isFocused: PropTypes.bool.isRequired,
    shouldHideLabel: PropTypes.bool,
    onEditRequested: PropTypes.func.isRequired,
    onEditEntered: PropTypes.func,
  }

  static defaultProps = {
    isFocused: false,
  }

  renderReadView = () => (
    <ReadView
      label={this.props.label}
      isFocused={this.props.isFocused}
      shouldHideLabel={this.props.shouldHideLabel}
      onEditRequested={this.props.onEditRequested}
    >
      {this.props.readView}
    </ReadView>
  )

  renderEditView = () => (
    <EditView
      label={this.props.label}
      isFocused={this.props.isFocused}
      shouldHideLabel={this.props.shouldHideLabel}
      onEditEntered={this.props.onEditEntered}
    >
      {this.props.editView}
    </EditView>
  )

  render = () => (
    <div className={styles.root}>
      {this.props.isEditing ? this.renderEditView() : this.renderReadView()}
    </div>
  )
}
