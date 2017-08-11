import * as React from 'react';
import ArrowLeft from '@atlaskit/icon/glyph/arrow-left';
import ArrowRight from '@atlaskit/icon/glyph/arrow-right';
import {ArrowLeftWrapper, ArrowRightWrapper} from '../styled/Navigation';

export interface NavigationProps {
  canGoPrev?: boolean;
  canGoNext?: boolean;
  onGoPrev?: () => void;
  onGoNext?: () => void;
}

export default function NavigationProps(props: NavigationProps) {
  const {canGoPrev, canGoNext, onGoPrev, onGoNext} = props;
  return (
    <div>
      {canGoPrev ? (
        <ArrowLeftWrapper className="visible-on-hover" onClick={onGoPrev}>
          <ArrowLeft size="large" label="navigate left" />
        </ArrowLeftWrapper>
      ) : null }
      {canGoNext ? (
        <ArrowRightWrapper className="visible-on-hover" onClick={onGoNext}>
          <ArrowRight size="large" label="navigate right" />
        </ArrowRightWrapper>
      ) : null }
    </div>
  );
}
