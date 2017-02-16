import styled from 'styled-components';
import {
  akColorB400,
  akColorN90,
  akColorN100,
} from '@atlaskit/util-shared-styles';

const ellipsis = `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const HomeIconContainer = styled.div`
  color: ${akColorB400};
`;

export const Item = styled.div`
  max-width: 350px;
  min-width: 150px;
  
  ${ellipsis}
`;

export const ItemWithIcon = styled.div`
  max-width: 300px;
  min-width: 150px;
  
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
  line-height: 1.4;
  padding-top: 4px;
`;

export const RecentContainerName = styled.div`
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
