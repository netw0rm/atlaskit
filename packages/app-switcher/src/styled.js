import styled from 'styled-components';

const {
  akColorB400,
  akColorN90,
  akColorN100,
} = require('@atlaskit/util-shared-styles');

const ellipsis = `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const HomeIconContainer = styled.div`
  color: ${akColorB400};
`;

export const Item = styled.div`
  line-height: 1.2;
  max-width: 225px;
  min-width: 208px;
  
  ${ellipsis}
`;

export const ItemWithIcon = styled.div`
  max-width: 177px;
  min-width: 160px;
  
  ${ellipsis}
`;

export const SuggestedApplicationTagline = styled.div`
  color: ${akColorN90};
  font-size: 12px;
  line-height: 1.666666667;
`;

export const LogoContainer = styled.div`
  color: ${akColorB400};
`;

export const HomeLinkContainer = styled(ItemWithIcon)`
  padding: 8px 0;
`;

export const RecentContainerType = styled.div`
  color: ${akColorN100}
  font-size: 10px;
  line-height: 1.6;
`;

export const RecentContainerName = styled.div`
  line-height: 1.2;

  ${ellipsis}
`;

export const RecentContainerImage = styled.img`
  border-radius: 2px;
  height: 32px;
  width: 32px;
`;

export const Link = styled.span`
  color: ${akColorB400};
`;
