/* tslint:disable:variable-name */
import styled, {keyframes, css} from 'styled-components';

export const Spinner = styled.div`
  background: data-uri("./icons/spinner.svg") no-repeat center;
  width: 30px;
  height: 30px;
`;

export const CardListWrapper = styled.div`
  display: table;
`;

const cardEntryAnimation = keyframes`
  0% {
   opacity: 0;
    transform: translateY(-100%) scale(0.5);
    position: relative;
    z-index: 1;

    /* magic number that looks good. Close to the height of a small card (42px), but works for the larger (104px) cards too */
    margin-top: -37px;
  }
  50% {
    margin-top: 0;
  }
  70% {
    transform: translateY(0) scale(0.5);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    margin-top: 0;
  }
`;

export const CardListItemWrapper = styled.div`

  padding-top: 5px;
  &:first-child {
    padding-top: 0;
  }

  ${({animateIn}) => animateIn && css`animation: ${cardEntryAnimation} 0.75s forwards;`}}

`;
