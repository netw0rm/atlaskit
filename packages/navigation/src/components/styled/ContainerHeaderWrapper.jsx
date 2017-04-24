import styled from 'styled-components';
import { akGridSize, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { animationTime, colors, layout, resizeAnimationTime } from '../../shared-variables';

const keylineHeight = 2;
const paddingOpen = (() => {
  const paddingLeft = layout.padding.side + (akGridSizeUnitless * 1.75);
  const paddingRight = layout.padding.side + (akGridSizeUnitless * 1.5);
  const paddingBottom = `${(akGridSizeUnitless * 1.5) - keylineHeight}px`;

  return `${layout.padding.top}px ${paddingLeft}px ${paddingBottom} ${paddingRight}px`;
});
const paddingClosed = `0 ${akGridSizeUnitless * 2.5}px 0 ${akGridSizeUnitless * 0.5}px`;
const supportsStickyCondition = '@supports(position: sticky) or (position: -webkit-sticky)';

const ContainerHeaderWrapper = styled.div`
  // the keyline will be drawn over the margin
  margin-bottom: ${keylineHeight}px;
  padding: ${paddingOpen};
  transition: padding ${animationTime};

  ${supportsStickyCondition} {
    // use the background color of the parent
    background-color: inherit;
    position: sticky;
    top: 0px;
    z-index: 2;

    // keyline
    &::after {
      background-color: ${props => (props.isContentScrolled ? colors[props.appearance].keyline : 'none')}
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
    ${supportsStickyCondition} {
      background-color: transparent;
      position: static;

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
