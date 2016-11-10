import React from 'react';
import reactify from 'akutil-react';

import FieldBaseWC from '../src';
import styles from '../src/shadow.less';

const FieldBase = reactify(FieldBaseWC);


const slottedInputStyle = {
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
    is
    slot="input-slot"
    type="text"
    style={slottedInputStyle}
    defaultValue={props.text || 'A slotted input'}
    disabled={props.disabled}
  />
</FieldBase>);

const DivFieldBase = props => (<FieldBase
  className={styles.locals.akFieldBase}
  label="Label for FieldBase"
  {...props}
>
  <div is slot="input-slot">{props.text || 'This content is in the input-slot'}</div>
</FieldBase>);

InputFieldBase.propTypes = {
  text: React.PropTypes.string,
  disabled: React.PropTypes.bool,
};

DivFieldBase.propTypes = {
  text: React.PropTypes.string,
};

export { InputFieldBase, DivFieldBase };
