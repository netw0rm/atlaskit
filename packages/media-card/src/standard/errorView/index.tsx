import * as React from 'react';
import {ErrorIcon} from '../../utils/errorIcon';
import {Wrapper, Title} from './styled';

export interface StandardErrorViewProps {
}

export const StandardErrorView = ({}: StandardErrorViewProps): JSX.Element => ( // tslint:disable-line:variable-name
  <Wrapper>
    <Title>Loading failed</Title>
    <ErrorIcon/>
  </Wrapper>
);
