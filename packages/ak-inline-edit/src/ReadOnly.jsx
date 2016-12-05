import React, { PureComponent, PropTypes } from 'react';
import { FieldBase } from 'ak-field-base';
import { locals } from './styles.less';

/* eslint-disable react/prefer-stateless-function */
export default class ReadOnlyView extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    isLabelHidden: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  }

  render = () => (
    <div
      className={locals.readViewWrapper}
    >
      <FieldBase
        label={this.props.label}
        isLabelHidden={this.props.isLabelHidden}
        isFocused={false}
        appearance="subtle"
        onFocus={() => {}}
        onBlur={() => {}}
      >
        <div className={locals.readViewContentWrapper}>
          {this.props.children}
        </div>
      </FieldBase>
    </div>
  )
}
