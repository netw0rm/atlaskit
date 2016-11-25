import React from 'react';
import FieldBase from '../src';
import styles from '../src/styles.less';

const inputStyle = {
  border: '0px',
  background: 'transparent',
  color: 'inherit',
  cursor: 'inherit',
  fontSize: '14px',
  outline: 0,
  width: '100%',
};

const InputFieldBase = props => (<FieldBase
  className={styles.locals.akFieldBase}
  label="Label for FieldBase"
  {...props}
>
  <input
    type="text"
    style={inputStyle}
    defaultValue={props.text || 'A children input'}
    disabled={props.disabled}
  />
</FieldBase>);

const DivFieldBase = props => (<FieldBase
  className={styles.locals.akFieldBase}
  label="Label for FieldBase"
  {...props}
>
  <div>{props.text || 'This is inside content'}</div>
</FieldBase>);

InputFieldBase.propTypes = {
  text: React.PropTypes.string,
  disabled: React.PropTypes.bool,
};

DivFieldBase.propTypes = {
  text: React.PropTypes.string,
};

export { InputFieldBase, DivFieldBase };
