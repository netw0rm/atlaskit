import * as React from 'react';
import {
  akBorderRadius,
  akGridSizeUnitless,
  akColorG50,
  akColorG400,
  akColorP50,
  akColorP400,
  akColorB400,
  akColorY50,
  akColorB50,
  akColorY400
} from '@atlaskit/util-shared-styles';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import TipIcon from '@atlaskit/icon/glyph/editor/hint';
import NoteIcon from '@atlaskit/icon/glyph/editor/note';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import styled from 'styled-components';

export type PanelType = 'info' | 'note' | 'tip' | 'warning';

export interface Props {
  panelType: PanelType;
}

const config = {
  info: {
    icon: InfoIcon,
    background: akColorB50,
    iconColor: akColorB400,
  },
  note: {
    icon: NoteIcon,
    background: akColorP50,
    iconColor: akColorP400,
  },
  tip: {
    icon: TipIcon,
    background: akColorG50,
    iconColor: akColorG400,
  },
  warning: {
    icon: WarningIcon,
    background: akColorY50,
    iconColor: akColorY400,
  },
};

// tslint:disable-next-line:variable-name
const PanelWrapper = styled.div`
  border-radius: ${akBorderRadius};
  margin: ${akGridSizeUnitless / 2}px 0;
  padding: ${akGridSizeUnitless}px;
  background: ${({ panelType }: Props) => config[panelType].background}
`;

// tslint:disable-next-line:variable-name
const IconWrapper = styled.span`
  position: absolute;
  height: ${akGridSizeUnitless * 3}px;
  width: ${akGridSizeUnitless * 3}px;
  color: ${({ panelType }: Props) => config[panelType].iconColor}
`;

// tslint:disable-next-line:variable-name
const ContentWrapper = styled.div`
  margin: 1px 0 1px ${akGridSizeUnitless * 4}px
`;

export default function Panel(props, params) {
  const { panelType } = props;
  // tslint:disable-next-line:variable-name
  const Icon = config[panelType].icon;
  return (
    <PanelWrapper key={params.key} panelType={panelType}>
      <IconWrapper panelType={panelType}><Icon label={`Panel {panelType}`} /></IconWrapper>
      <ContentWrapper>{params.children}</ContentWrapper>
    </PanelWrapper>
  );
}
