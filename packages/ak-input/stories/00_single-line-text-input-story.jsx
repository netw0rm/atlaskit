import { storiesOf } from '@kadira/storybook';
import React from 'react';
// import InlineEdit from 'ak-inline-edit';
// import SingleLineTextInput from '../src';
// import { name } from '../package.json';

// const containerStyle = {
//   padding: 20,
//   backgroundColor: 'white',
//   width: 500,
// };

// const customTextStyle = {
//   fontSize: 28,
// };

// const createSingleLineTextInput = props => (
//   <SingleLineTextInput
//     value="Lorem ipsum dolor sit amet"
//     onChange={action('onChange')}
//     {...props}
//   />
// );

storiesOf('hiiiii', module)
  .add('foo', () => (
    <div>hi</div>
  ));
  // .add('with default font size', () => (
  //   <div style={containerStyle}>
  //     {createSingleLineTextInput()}
  //   </div>
  // ))
  // .add('with default font size in edit mode', () => (
  //   <div style={containerStyle}>
  //     {createSingleLineTextInput({ isEditing: true })}
  //   </div>
  // ))
  // .add('with auto focus', () => (
  //   <div style={containerStyle}>
  //     {createSingleLineTextInput({ isEditing: true, hasAutoFocus: true })}
  //   </div>
  // ))
  // .add('with custom font size', () => (
  //   <div style={containerStyle}>
  //     {createSingleLineTextInput({ style: customTextStyle })}
  //   </div>
  // ))
  // .add('with custom font size in edit mode', () => (
  //   <div style={containerStyle}>
  //     {createSingleLineTextInput({ style: customTextStyle, isEditing: true })}
  //   </div>
  // ))
  // .add('with field base', () => (
  //   <div style={containerStyle}>
  //     <InlineEdit
  //       label="InlineEdit containing a SingleLineTextInput"
  //       readView={createSingleLineTextInput({ isEditing: false })}
  //       editView={createSingleLineTextInput({ isEditing: true })}
  //       onConfirm={() => {}}
  //       onCancel={() => {}}
  //     />
  //   </div>
  // ));
