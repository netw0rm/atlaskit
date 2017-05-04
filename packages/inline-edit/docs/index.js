import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import EditExamples from './EditExamples';
import editExamplesSrc from '!raw-loader!./EditExamples';
/* eslint-enable import/no-duplicates, import/first */

const Usage = styled.pre`
  background-color: #F4F5F7;
  border-radius: 5px;
  margin: 14px 0;
  padding: 8px;
`;

export const description = (
  <div>
    <p>
      The package exports two version of <code>InlineEdit</code>:
    </p>
    <Usage>
      {'import InlineEditor, { InlineEdit } from @atlaskit/inline-edit'}
    </Usage>
    <p>
      The default export has an <code>onCancel</code> and <code>onConfirm</code> method
      as helpers, and also props down to the base component. The functions you
      provide for these will be called after an internal method, which
      sets <code>isEditing</code> to false.
    </p>
    <p>
      If you do not want automatic functions for <code>onCancel</code>
      and <code>onConfirm</code>, or <code>onEditRequested</code>, you can export
      the base component and handle these entirely.
    </p>
    <p>
      The inline editor is designed to not stand out as an input when not focused by default.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Examples',
    Component: EditExamples,
    src: editExamplesSrc,
  },
];
