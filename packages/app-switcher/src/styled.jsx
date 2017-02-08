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
  width: 232px;
  padding: 8px 0;
  
  a, a:hover {
    text-decoration: none;
    
    // Overriding AUI default styles
    display: inline;
    line-height: 20px;
    padding: 0px;
  }
`;

export const MenuItemContainer = styled.div`
  outline: none;
  color: ${akColorN800};
  cursor: pointer;
  padding: 6px 24px; 6px 24px;
  display: flex;
  align-items: center;
  font-size: 14px;
  
  &:hover {
    background: ${akColorN30};
  }
  
  div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const MenuItemIcon = styled.div`
  padding-right: 8px;
  height: 32px;
  width: 32px;
  flex-shrink: 0;
  
  img {
    height: 32px;
    width: 32px;
    border-radius: 3px;
  }
`;

export const MenuItemTwoLineContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 32px;
  line-height: normal;
  flex-grow: 0;
  
  div:first-child {
    padding-top: 2px;
  }
  
  div:last-child {
    font-size: 10px;
    color: ${akColorN100}
  }
`;

export const MenuHeader = styled.div`
  color: ${akColorN300};
  font-size: 12px;
  text-transform: uppercase;
  padding: ${props => (props.paddingTop ? '24px 0 8px 24px' : '0 0 8px 24px')}
  font-weight: 500;
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
  font-size: 12px;
  color: ${akColorN90};
  white-space: normal !important;
`;

export const LogoContainer = styled.div`
  color: ${akColorB400};
`;
