import styled from 'styled-components';

// tslint:disable-next-line:variable-name
export const Table = styled.table`
  border-collapse: collapse;
  margin: 1em 0;
  width: auto;

  & {
    tbody {
      border-bottom: none;
    }
    th, td {
      min-width: 1em;
      vertical-align: top;
      border: 1px solid #ddd;
      padding: 3px 5px;
    }
    th {
      font-weight: bold;
      text-align: left;
    }
    .selectedCell {
      position: relative;
    }
    /* Give selected cells a blue overlay */
    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0; right: 0; top: 0; bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }
  }
`;
