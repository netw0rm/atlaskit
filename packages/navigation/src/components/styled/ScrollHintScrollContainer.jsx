// @flow
import styled from 'styled-components';
import { drawerContainerHeaderAnimationSpeed, scrollbar } from '../../shared-variables';
import { getProvided } from '../../theme/util';

const keylineHeight = '2px';

const ScrollHintScrollContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  height: 100%;
  justify-content: flex-start;
  overflow-y: ${props => (props.isCollapsed ? 'hidden' : 'auto')};
  transition: padding ${drawerContainerHeaderAnimationSpeed};

  &:before,
  &:after {
    background: ${({ theme }) => getProvided(theme).background.secondary || getProvided(theme).background.primary};
    content: '';
    display: block;
    min-height: ${keylineHeight};
    width: 100%;
    z-index: 5;
    position: relative;
  }

  /* The following styles are to style scrollbars when there is long/wide content*/
  -ms-overflow-style: -ms-autohiding-scrollbar;
  &::-webkit-scrollbar {
    height: ${scrollbar.size}px;
    width: ${scrollbar.size}px;
  }
  &::-webkit-scrollbar-corner {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${scrollbar.background};
    border-radius: ${scrollbar.size}px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${scrollbar.hoverBackground};
  }
`;
ScrollHintScrollContainer.displayName = 'ScrollHintScrollContainer';
export default ScrollHintScrollContainer;
