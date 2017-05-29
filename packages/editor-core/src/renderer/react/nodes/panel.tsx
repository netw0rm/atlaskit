import * as React from 'react';
import { PureComponent } from 'react';
import {
  akBorderRadius,
  akGridSizeUnitless,
  akColorG50,
  akColorG500,
  akColorP50,
  akColorP500,
  akColorT50,
  akColorT500,
  akColorY50,
  akColorY500
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
    background: akColorT50,
    iconColor: akColorT500,
  },
  note: {
    icon: NoteIcon,
    background: akColorP50,
    iconColor: akColorP500,
  },
  tip: {
    icon: TipIcon,
    background: akColorG50,
    iconColor: akColorG500,
  },
  warning: {
    icon: WarningIcon,
    background: akColorY50,
    iconColor: akColorY500,
  },
};

// tslint:disable-next-line:variable-name
const PanelWrapper = styled.div`
  border-radius: ${akBorderRadius};
  margin: ${akGridSizeUnitless / 2}px 0;
  padding: ${akGridSizeUnitless / 2}px;
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
  margin: 1px 0 1px 30px
`;

export default class Panel extends PureComponent<Props, {}> {
  render() {
    const { panelType, children } = this.props;
    return (
      <PanelWrapper panelType={panelType}>
        <IconWrapper panelType={panelType}>{this.getIcon()}</IconWrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </PanelWrapper>
    );
  }

  getIcon() {
    const { panelType } = this.props;
    // tslint:disable-next-line:variable-name
    const Icon = config[panelType].icon;
    return <Icon label={`Panel {panelType}`} />;
  }
}
