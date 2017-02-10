import styled from 'styled-components';
import {
  akColorB400,
  akColorN30,
  akColorN90,
  akColorN100,
  akColorN300,
  akColorN800,
} from '@atlaskit/util-shared-styles';

export const AppSwitcherContainer = styled.div`
  padding: 8px 0;
  width: 232px;
`;

export const AppSwitcherLink = styled.a`
  // HACK to trump the AUI header styles for a
  html & {
    display: inline;
    line-height: 1.42857142857143;
    padding: 0;
    
    &:hover {
      text-decoration: none;
    }
  }
`;

export const MenuItemContainer = styled.div`
  color: ${akColorN800};
  cursor: pointer;
  font-size: 14px;
  outline: none;
  padding: 6px 24px;
  
  &.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    background: ${akColorN30};
  }
`;

export const MenuItemIcon = styled.div`
  flex-shrink: 0;
  height: 32px;
  padding-right: 8px;
  width: 32px;

  & .menuItemIcon {
    border-radius: 3px;
    height: 32px;
    width: 32px;
  }
`;

export const MenuItemTwoLineContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  height: 32px;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  > .top {
    overflow: hidden;
    padding-top: 2px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  > .bottom {
    color: ${akColorN100}
    font-size: 10px;
  }
`;

export const MenuHeader = styled.div`
  color: ${akColorN300};
  font-size: 12px;
  font-weight: 500;
  padding: ${props => (props.paddingTop ? '24px 0 8px 24px' : '0 0 8px 24px')}
  text-transform: uppercase;
`;

MenuHeader.defaultProps = {
  paddingTop: true,
};

export const MenuLinkItem = styled.span`
  color: ${akColorB400};
`;

export const SuggestedApplicationContainer = styled(MenuItemContainer)`
  display: block;
  padding: 0 14px 6px 24px;
`;

export const SuggestedApplicationTagline = styled.div`
  color: ${akColorN90};
  font-size: 12px;
`;

export const LogoContainer = styled.div`
  color: ${akColorB400};
`;

export const FlexContainer = styled.div`
  align-items: center;
  display: flex;
`;
