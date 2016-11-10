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

const InputFieldBase = (props) => {
  const defaultValue = props.text === '' ? props.text : (props.text || 'A slotted input');
  return (
    <FieldBase
      className={styles.locals.akFieldBase}
      label="Label for FieldBase"
      {...props}
    >
      <input
        is
        slot="input-slot"
        type="text"
        style={slottedInputStyle}
        defaultValue={defaultValue}
        disabled={props.disabled}
      />
      {props.children}
    </FieldBase>
  );
};

const DivFieldBase = props => (<FieldBase
  className={styles.locals.akFieldBase}
  label="Label for FieldBase"
  {...props}
>
  <div is slot="input-slot">{props.text || 'This content is in the input-slot'}</div>
</FieldBase>);

InputFieldBase.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element),
  ]),
  disabled: React.PropTypes.bool,
  text: React.PropTypes.string,
};

DivFieldBase.propTypes = {
  text: React.PropTypes.string,
};

export { InputFieldBase, DivFieldBase };
