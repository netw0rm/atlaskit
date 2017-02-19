import React from 'react';
import styled from 'styled-components';
import { akFontSizeDefault } from '@atlaskit/util-shared-styles';

const commonStyles = `
  color: inherit;
  fontSize: ${akFontSizeDefault};
  letterSpacing: normal;
  appearance: none;
`;

export const InputEditView = styled.input`
  ${commonStyles}

  lineHeight: inherit;
  background: transparent;
  border: 0;
  margin: 0;
  padding: 0;
  boxSizing: border-box;
  cursor: inherit;
  outline: none;
  width: 100%;
  &:invalid: {
    boxShadow: none;
  };
  ${props => props.style}
`;

export const TextAreaEditView = styled.textarea`
  ${commonStyles}

  lineHeight: inherit;
  background: transparent;
  border: 0;
  margin: 0;
  padding: 0;
  boxSizing: border-box;
  cursor: inherit;
  outline: none;
  width: 100%;
  &:invalid: {
    boxShadow: none;
  };
  ${props => props.style}
  resize: none;
`;

export const ReadView = styled.div`
  ${commonStyles}

  overflow: hidden;
  whiteSpace: nowrap;
  textOverflow: ellipsis;

  ${props => props.style}
`;