import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';
import FieldBaseWC from '../src';
import { name } from '../package.json';
import TextfieldWC from './skate/textfield';
import styles from '../src/host.less';

const FieldBase = reactify(FieldBaseWC);
const Textfield = reactify(TextfieldWC);

const formStyle = (width = 300) => ({
  padding: '20px',
  backgroundColor: 'white',
  width: `${width}px`,
});


storiesOf(name, module)
  .add('a simple ak-field-base', () => (
    <div>
      <form action="" style={formStyle(500)}>
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
        <FieldBase className={styles.locals.akutilFieldBase} label="Label for FieldBase">
          <div is slot="editmode">This content is in the Editing slot!</div>
          <div is slot="viewmode"><b>This content is in the Viewing slot!</b></div>
        </FieldBase>
        <FieldBase className={styles.locals.akutilFieldBase} label="Multiline content">
          <div is slot="editmode">This content is in the Editing slot!</div>
          <div is slot="viewmode">
            <b>This content is in the Viewing slot!</b>
            <br />
            asdf
            <br />
            <b>This content is in the Viewing slot!</b>
          </div>
        </FieldBase>
      </form>
    </div>
  ))
  .add('some field-bases in various states', () => (
    <div>
      <form action="" style={formStyle(500)}>
        <FieldBase label="A default field-base">
          <div is slot="editmode">This content is in the Editing slot!</div>
          <div is slot="viewmode"><b>This content is in the Viewing slot!</b></div>
        </FieldBase>
        <FieldBase label="In edit mode" editing>
          <div is slot="editmode">This content is in the Editing slot!</div>
          <div is slot="viewmode"><b>This content is in the Viewing slot!</b></div>
        </FieldBase>
        <FieldBase label="In edit mode, focused" editing focused>
          <div is slot="editmode">This content is in the Editing slot!</div>
          <div is slot="viewmode"><b>This content is in the Viewing slot!</b></div>
        </FieldBase>
        <FieldBase label="In edit mode, waiting" editing waiting>
          <div is slot="editmode">This content is in the Editing slot!</div>
          <div is slot="viewmode"><b>This content is in the Viewing slot!</b></div>
        </FieldBase>
        <FieldBase label="In edit mode, waiting, focused" editing waiting focused>
          <div is slot="editmode">This content is in the Editing slot!</div>
          <div is slot="viewmode"><b>This content is in the Viewing slot!</b></div>
        </FieldBase>
        <FieldBase label="In edit mode, invalid" editing invalid>
          <div is slot="editmode">This content is in the Editing slot!</div>
          <div is slot="viewmode"><b>This content is in the Viewing slot!</b></div>
        </FieldBase>
        <FieldBase label="In edit mode, invalid, focused" editing invalid focused>
          <div is slot="editmode">This content is in the Editing slot!</div>
          <div is slot="viewmode"><b>This content is in the Viewing slot!</b></div>
        </FieldBase>
        <FieldBase
          label="In edit mode, with a max-width css style"
          editing
          style={{ maxWidth: '100px' }}
          className={styles.locals.akutilFieldBase}
        >
          <div is slot="editmode">This content is in the Editing slot!</div>
          <div is slot="viewmode"><b>This content is in the Viewing slot!</b></div>
        </FieldBase>

      </form>
    </div>
  ))
  .add('fieldbase with different content', () => {
    const longTextWithSpaces = `According to all known laws of aviation, there is no way a bee
      should be able to fly. Its wings are too small to get its fat little body off the ground.
      The bee, of course, flies anyway because bees don't care what humans think is impossible.`;
    const longTextNoSpaces = '3.1415926535897932384626433832795028841971693993751058209749445923' +
      '07816406286208998628034825342117067982148086513282306647093844609550582231725359408128481' +
      '11745028410270193852110555964462294895493038196442881097566593344612847564';
    const smallBoxStyles = {
      height: '5px',
      width: '5px',
      border: '1px solid',
      boxSizing: 'border-box',
    };
    return (
      <div>
        <form action="" style={formStyle(500)}>
          <h2>My Form</h2>
          <FieldBase label="Lots of text (with whitespace)">
            <div is slot="editmode">{longTextWithSpaces}</div>
            <div is slot="viewmode">{longTextWithSpaces}</div>
          </FieldBase>
          <FieldBase label="Lots of text (no whitespace)">
            <div is slot="editmode">{longTextNoSpaces}</div>
            <div is slot="viewmode">{longTextNoSpaces}</div>
          </FieldBase>
          <FieldBase label="No content">
            <div is slot="editmode"></div>
            <div is slot="viewmode"></div>
          </FieldBase>
          <FieldBase label="Small non-textual content (5x5 div)">
            <div is slot="editmode"><div style={smallBoxStyles}></div></div>
            <div is slot="viewmode"><div style={smallBoxStyles}></div></div>
          </FieldBase>
        </form>
      </div>
    );
  })
  .add('fieldbase with the labels hidden', () => {
    const noMarginStyle = {
      margin: '0px',
    };
    return (
      <div>
        <form action="" style={formStyle(500)}>
          <h2>My Label-less Form</h2>
          <FieldBase label="Label for bold FieldBase" hideLabel>
            <div is slot="editmode">I'm in editing mode but I don't have a label!</div>
            <div is slot="viewmode"><b>I'm in view mode but I don't have a label!</b></div>
          </FieldBase>
          <FieldBase label="Label for h1 FieldBase" hideLabel>
            <div is slot="editmode"><h1 style={noMarginStyle}>Edit mode, no label</h1></div>
            <div is slot="viewmode"><h1 style={noMarginStyle}>View mode, no label</h1></div>
          </FieldBase>
        </form>
      </div>
    );
  })
  .add('a simple form with text fields', () => (
    <div>
      <form action="" style={formStyle(400)}>
        <h2>My Form</h2>
        <div>
          This form shows actual TextField components that are created by extending FieldBase.
        </div>
        <Textfield label="Viewmode by default" value="Yo! If you had..." />
        <Textfield label="Editmode by default" value="One shot..." editing />
        <Textfield label="I am not inline editable" value="One opportunity..." editing />
      </form>
    </div>
  ))
  ;
