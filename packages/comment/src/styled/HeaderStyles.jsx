import styled from 'styled-components';
import { akColorN100A, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const ThemeColor = {
  Restricted: {
    text: akColorN100A,
  },
};

const BulletSpacer = styled.span`
  padding-right: ${akGridSizeUnitless / 2}px;
`;

const Restricted = styled.div`
  color: ${ThemeColor.Restricted.text};
  display: flex;
`;

const RestrictedIconWrapper = styled.span`
  margin-right: ${akGridSizeUnitless / 2}px;
`;
RestrictedIconWrapper.displayName = 'RestrictedIconWrapper';

const TopItem = styled.div`
  display: inline-block;
  margin-left: ${akGridSizeUnitless}px;

  &:first-child {
    margin-left: 0;

    [dir="rtl"] & {
      margin-right: 0;
    }
  }

  [dir="rtl"] & {
    margin-left: 0;
    margin-right: ${akGridSizeUnitless}px;
  }
`;

const TopItemsContainer = styled.div`
  display: flex;
`;

export {
  BulletSpacer,
  Restricted,
  RestrictedIconWrapper,
  TopItem,
  TopItemsContainer,
};
