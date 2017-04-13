import styled from 'styled-components';
import { akGridSize, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { animationTime, container, resizeAnimationTime } from '../../shared-variables';

const keylineHeight = 2;
const intGridSize = Number(akGridSizeUnitless);
const paddingBottom = `${(intGridSize * 1.5) - keylineHeight}px`;
const paddingOpen = `${container.padding.top}px ${container.padding.side + (intGridSize * 1.75)}px ${paddingBottom} ${container.padding.side + (intGridSize * 1.5)}px`;
const paddingClosed = `0 ${intGridSize * 2.5}px 0 ${intGridSize * 0.5}px`;

const ContainerHeaderWrapper = styled.div`
  transition: padding ${animationTime};
  padding: ${paddingOpen};

  // the keyline will be drawn over the margin
  margin-bottom: ${keylineHeight}px;

  @supports ( position: sticky ) or ( position: -webkit-sticky ) {
    // use the background color of the parent
    background-color: inherit;
    position: sticky;
    top: 0px;
    z-index: 2;

    // keyline
    &::after {
      background-color: ${props => (props.isContentScrolled ? container.colors[props.appearance].keyline : 'none')}
      bottom: -${keylineHeight}px;
      border-radius: 1px;
      content: "";
      height: ${keylineHeight}px;
      left: ${akGridSize};
      position: absolute;
      right: ${akGridSize};
      transition: background-color ${resizeAnimationTime}
    }
  }

  [data-__ak-navigation-container-closed="true"] & {
    padding: ${paddingClosed};

    // undoing position: sticky
    @supports ( position: sticky ) or ( position: -webkit-sticky ) {
      position: static;
      background-color: transparent;

      &::after {
        display: none;
      }
    }
  }
`;

ContainerHeaderWrapper.defaultProps = {
  appearance: 'container',
};

export default ContainerHeaderWrapper;
