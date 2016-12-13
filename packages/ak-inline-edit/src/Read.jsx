import React, { PureComponent, PropTypes } from 'react';
import FieldBase from 'ak-field-base';
import Icon from 'ak-icon/glyph/edit';
import { locals } from './styles.less';

/* eslint-disable react/prefer-stateless-function */
export default class ReadView extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    isInvalid: PropTypes.bool.isRequired,
    isLabelHidden: PropTypes.bool.isRequired,
    onEditRequested: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  renderEditIcon = () => (
    <div className={locals.editButtonWrapper}>
      <button className={locals.editButton}>
        <Icon label="Edit" size="small" />
      </button>
    </div>
  )

  render = () => (
    <div // eslint-disable-line jsx-a11y/no-static-element-interactions
      className={locals.readViewWrapper}
      onClick={this.props.onEditRequested}
    >
      <FieldBase
        label={this.props.label}
        isInvalid={this.props.isInvalid}
        isLabelHidden={this.props.isLabelHidden}
        appearance="subtle"
      >
        <div className={locals.readViewContentWrapper}>
          {this.props.children}
          {this.props.isInvalid ? null : this.renderEditIcon()}
        </div>
      </FieldBase>
    </div>
  )
}
