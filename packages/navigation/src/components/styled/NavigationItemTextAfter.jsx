import styled from 'styled-components';

export default styled.div`
  position: relative;
  z-index: 1;

  [data-__ak-navigation-container-closed="true"] & {
    opacity: 0;
  }
`;
