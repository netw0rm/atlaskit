import React, { PureComponent, PropTypes } from 'react';
import FieldBase from 'ak-field-base';
import Icon from 'ak-icon/glyph/edit';
import styles from './styles.less';

export default class ReadView extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    isFocused: PropTypes.bool.isRequired,
    isLabelHidden: PropTypes.bool,
    onEditRequested: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    isLabelHidden: false,
  }

  render() {
    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        className={styles.locals.readViewWrapper}
        onClick={this.props.onEditRequested}
      >
        <FieldBase
          label={this.props.label}
          hideLabel={this.props.isLabelHidden}
          focused={this.props.isFocused}
        >
          <div className={styles.locals.readViewContentWrapper}>
            {this.props.children}
            <button className={styles.locals.editButton}>
              <Icon label="Edit" size="small" />
            </button>
          </div>
        </FieldBase>
      </div>
    );
  }
}
