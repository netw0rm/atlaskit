import styled from 'styled-components';

export default styled.div`
  display: inline-flex;
  justify-content: space-between;

  & > * {
    color: lightcoral;
    flex: 1 0 auto;
    margin: 0 2px;
  }
`;
