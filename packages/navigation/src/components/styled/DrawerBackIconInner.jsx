import {
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

export default styled.div`
    align-items: center;
    display: flex;
    transform: ${({ isVisible }) => (isVisible ? 'translateX(0)' : `translateX(${-akGridSizeUnitless * 2}px)`)};
    transition: transform 220ms;
`;
