/* tslint:disable:variable-name */
import styled from 'styled-components';

export const CardListWrapper = styled.div`
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;

    li {
      padding-top: 5px;
    }

    li:first-child {
      padding-top: 0;
    }
  }

  .load-more-button {
    font-size: 12px;
    width: 100%;
    display: block;
  }
`;

export const Spinner = styled.div`
  background: data-uri("./icons/spinner.svg") no-repeat center;
  width: 30px;
  height: 30px;
`;

export const LoadMoreButtonContainer = styled.div`
  margin-top: 10px;
  text-align: center;
`;
