import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';
import FieldTextWC from 'ak-field-text';


import InlineEditWC from '../src';
import { name } from '../package.json';
import styles from '../src/shadow.less';

const InlineEdit = reactify(InlineEditWC);
const FieldText = reactify(FieldTextWC);

const formStyle = {
  padding: '20px',
  backgroundColor: 'white',
  width: '500px',
};

const GenericInlineEdit = (props) => {
  const label = props.label || (props.hideLabel ? null : 'label for field-base');
  const value = props.value || 'Your content here!';
  return (
    <InlineEdit
      className={styles.locals.akFieldBase}
      label={label}
      hideLabel={props.hideLabel}
      focused={props.focused}
      invalid={props.invalid}
      editing={props.editing}
      waiting={props.waiting}
    >
      <div is slot="editmode">
        <FieldText
          label={label}
          hideLabel={props.hideLabel}
          focused={props.focused}
          invalid={props.invalid}
          value={value}
        />
      </div>
      <div is slot="viewmode">
        {value}
      </div>
    </InlineEdit>
  );
};

storiesOf(name, module)
  .add('a simple ak-field-base', () => (
    <div>
      <form action="" style={formStyle}>
        <div>
          <p>
            This shows the base functionality provided by ak-field-base. It has two slots; editmode
            and viewmode. Hovering over the field whilst in view mode should show the edit icon and
            clicking should enter edit mode. Edit mode will display whatever content is in.
          </p>
          <p>
            Feel free to use your browsers inspector to modify different properties to see how they
            work.
          </p>
          <ul>
            <li>label (any string)</li>
            <li>editing (true or false)</li>
            <li>focused (true or false)</li>
            <li>waiting (true or false)</li>
            <li>invalid (true or false)</li>
            <li>hideLabel (true or false)</li>
          </ul>
        </div>
        <GenericInlineEdit />
      </form>
    </div>
  ))
  ;

GenericInlineEdit.propTypes = {
  label: React.PropTypes.string,
  value: React.PropTypes.string,
  hideLabel: React.PropTypes.bool,
  focused: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
  waiting: React.PropTypes.bool,
  editing: React.PropTypes.bool,
};
