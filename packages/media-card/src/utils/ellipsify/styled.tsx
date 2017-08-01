/* tslint:disable:variable-name */
import * as React from 'react';
import styled from 'styled-components';
import Truncate from 'react-truncate';

export interface WrapperProps {
  lines?: number;
  inline?: boolean;
  className?: string;
}

export const TruncateWithoutStyleProps = ({inline, ...otherProps}: WrapperProps) => <Truncate {...otherProps}/>;
export const TruncateWrapper = styled(TruncateWithoutStyleProps)`
  ${({inline}: WrapperProps) => inline && 'display: inline;' || 'display: block;'}
`;

export const OldWrapper = styled.div`
  ${({inline}: WrapperProps) => inline && 'display: inline;' || ''}
`;
