import React from 'react';
import AkFieldBase from '../src';
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

const InputFieldBase = props => (<AkFieldBase
  className={styles.locals.akFieldBase}
  label="Label for FieldBase"
  {...props}
>
  <input
    type="text"
    style={inputStyle}
    defaultValue={props.text || 'A children input'}
    disabled={props.isDisabled}
  />
</AkFieldBase>);

const DivFieldBase = props => (<AkFieldBase
  className={styles.locals.akFieldBase}
  label="Label for FieldBase"
  {...props}
>
  <div>{props.text || 'This is inside content'}</div>
</AkFieldBase>);

InputFieldBase.propTypes = {
  text: React.PropTypes.string,
  isDisabled: React.PropTypes.bool,
};

DivFieldBase.propTypes = {
  text: React.PropTypes.string,
};

export { InputFieldBase, DivFieldBase };
