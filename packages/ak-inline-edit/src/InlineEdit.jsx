import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!./styles.less';
import EditingView from './Editing';
import ViewingView from './Viewing';


/**
 * @description Create instances of the component.
 * @class InlineEdit
 * @example @html <InlineEdit label="Email" />
 */
export default class InlineEdit extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    isFocused: PropTypes.bool,
    isEditing: PropTypes.bool,
    edit: PropTypes.node,
    view: PropTypes.node,
    switchToEditing: PropTypes.func,
  }

  renderEditingView = () =>
    <EditingView label={this.props.label}>
      {this.props.edit}
    </EditingView>

  renderViewingView = () =>
    <ViewingView
      switchToEditing={this.props.switchToEditing}
      setFocus={focus => this.setState({ isFocused: focus })}
      isFocused={this.props.isFocused}
      label={this.props.label}
      view={this.props.view}
    />

  render() {
    return (
      <div className={styles.root}>
        { this.props.isEditing ? this.renderEditingView() : this.renderViewingView() }
      </div>
    );
  }
}
