import styled from 'styled-components';
import {
  akColorB400,
  akColorN90,
  akColorN100,
  akHelperMixins,
} from '@atlaskit/util-shared-styles';

export const HomeIconContainer = styled.div`
  color: ${akColorB400};
`;

export const Item = styled.div`
  line-height: 1.2;
  min-width: 208px;
  ${akHelperMixins.text.truncate('225px')}
`;

export const ItemWithIcon = styled.div`
  min-width: 160px;
  ${akHelperMixins.text.truncate('177px')}
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
  color: ${akColorN100};
  font-size: 10px;
  line-height: 1.6;
`;

export const RecentContainerName = styled.div`
  line-height: 1.2;
  ${akHelperMixins.text.truncate('auto')}
`;

export const RecentContainerImage = styled.img`
  border-radius: 2px;
  height: 32px;
  width: 32px;
`;

export const Link = styled.span`
  color: ${akColorB400};
`;

export const AppSwitcherContainer = styled.span`
  [data-role="droplistContent"] {
    max-height: 85vh;
  }
`;
