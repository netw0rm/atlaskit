import * as React from 'react';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import {DetailLayout} from '../DetailLayout';
import {TitleWrapper, IconWrapper} from './styled';

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
        <IconWrapper>
          <WarningIcon label="error" size="small"/>
        </IconWrapper>
      }
    />
  );
}
