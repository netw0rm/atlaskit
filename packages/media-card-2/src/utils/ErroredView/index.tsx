import * as React from 'react';
import {DetailLayout} from '../DetailLayout';
import {TitleWrapper} from './styled';
import {ErrorIcon} from '../ErrorIcon';

// TODO: add actions
export interface ErrorViewProps {
}

export function ErroredView(props: ErrorViewProps) {
  return (
    <DetailLayout
      title={
        <TitleWrapper>
          Error loading card
        </TitleWrapper>
      }
      icon={
        <ErrorIcon/>
      }
    />
  );
}
