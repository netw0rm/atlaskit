import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!./shadow.less';
import EditingView from './Editing';
import ViewingView from './Viewing';


/**
 * @description Create instances of the component.
 * @class InlineEdit
 * @example @html <InlineEdit label="Email" />
 */
export default class InlineEdit extends PureComponent {
  static propTypes = {
    /**
     * @description The label to be rendered above the form field.
     *
     * This prop is still required, even if the hideLabel prop is set as the label is also used to
     * make the field accessible for screen readers.
     * @memberof InlineEdit
     * @instance
     * @type {string}
     */
    label: PropTypes.string,
     /**
     * @description Whether the field should show it's focus ring.
     *
     * This would usually be controlled by a component extending InlineEdit and setting this when
     * needed.
     *
     * Defaults to false.
     * @memberof InlineEdit
     * @instance
     * @type {boolean}
     * @example @html <ak-inline-edit focused></ak-inline-edit>
     * @example @js field.focused = true;
     */
    focused: PropTypes.bool,
    onCancelEdit: PropTypes.func,
    onConfirmEdit: PropTypes.func,
    children: PropTypes.node,
    view: PropTypes.node,
  }

  static defaultProps = {
    onCancel: () => {},
  }
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  onConfirm = () => {
    this.switchToViewing();
    this.props.onConfirmEdit();
  }
  onCancel = () => {
    this.switchToViewing();
    this.props.onCancelEdit();
  }
  switchToEditing = () => this.setState({ editing: true })
  switchToViewing = () => this.setState({ editing: false })


  render() {
    return (
      <div className={styles.root}>
        <ViewingView
          switchToEditing={this.switchToEditing}
          setFocus={focus => this.setState({ focused: focus })}
          focused={this.props.focused}
          hide={this.state.editing}
          label={this.props.label}
          view={this.props.view}
        />
        <EditingView
          focused={this.props.focused}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          label={this.props.label}
          hide={!this.state.editing}
        >
          {this.props.children}
        </EditingView>
      </div>
    );
  }
}
