// @flow
import styled from 'styled-components';
import {
  akColorB400,
  akColorN100,
  akColorN200,
  akGridSize,
} from '@atlaskit/util-shared-styles';

const ellipsis = `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const imageDimensions = `
  height: 32px;
  width: 32px;
`;

const primaryLinkTitleLineHeight = `
  line-height: 1.2;
`;

export const HomeIconContainer = styled.div`
  color: ${akColorB400};

  ${imageDimensions};
`;

export const PeopleDirectoryIconContainer = styled.div`
  color: ${akColorN200};

  ${imageDimensions};
`;

export const SiteAdminIconContainer = styled.div`
  color: ${akColorN200};

  ${imageDimensions};
`;

export const MarketplaceIconContainer = styled.div`
  color: ${akColorN200};

  ${imageDimensions};
`;

export const Item = styled.div`
  line-height: 1.2;
  max-width: 225px;
  min-width: 208px;

  ${ellipsis};
`;

export const ItemWithIcon = styled.div`
  max-width: 177px;
  min-width: 160px;

  ${ellipsis};
`;

export const TopLinkContainer = styled(ItemWithIcon)`
  ${primaryLinkTitleLineHeight}

  padding: ${akGridSize} 0;
`;

export const RecentContainerType = styled.div`
  color: ${akColorN100}
  font-size: 10px;
  line-height: 1.6;
`;

export const RecentContainerName = styled.div`
  ${primaryLinkTitleLineHeight} ${ellipsis};
`;

export const Link = styled.span`
  color: ${akColorB400};
`;

export const AppSwitcherContainer = styled.span`
  [data-role='droplistContent'] {
    max-height: 85vh;
  }
`;

export const LozengeContainer = styled.span`
  padding-left: 8px;
`;
