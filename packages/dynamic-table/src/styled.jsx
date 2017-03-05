import styled, { css } from 'styled-components';
import { akColorN10, akColorN40, akColorN60, akColorN300, akGridSize } from '@atlaskit/util-shared-styles';

import { ASC, DESC } from './internal/constants';

const gridUnit = parseInt(akGridSize, 10);
const baselineUnit = gridUnit / 2;

const truncateStyle = ({ width, isFixedSize, shouldTruncate }) => css`
    ${width ? css`width: ${width}%;` : ''}
    ${isFixedSize ? css`overflow: hidden;` : ''};
    ${isFixedSize && shouldTruncate ? css`
        white-space: nowrap;
        text-overflow: ellipsis;
    ` : ''}
`;

const onClickStyle = ({ onClick }) => onClick && css`
    &:hover {
        cursor: pointer;
    }
`;

const arrowsStyle = ({ isSortable, sortOrder }) => {
  if (!isSortable) return '';

  const pseudoBase = css`
    font-size: 15px;
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    right: -${gridUnit}px;
    border: 3px solid transparent;
  `;

  return css`
        & > span {
            position: relative;
            &:before {
                ${pseudoBase};
                content: ' ';
                bottom: 8px;
                border-bottom: 3px solid ${sortOrder === ASC ? akColorN300 : akColorN40}; 
            };
            &:after {
                ${pseudoBase};
                content: ' ';
                bottom: 0;  
                border-top: 3px solid ${sortOrder === DESC ? akColorN300 : akColorN40}; 
                
            };
        }
        
        &:hover > span {
            &:before {
                border-bottom: 3px solid ${sortOrder === ASC ? akColorN300 : akColorN60}; 
            }
            &:after {
                border-top: 3px solid ${sortOrder === DESC ? akColorN300 : akColorN60}; 
            }
        }
    `;
};

const cellStyle = css`
    padding: ${baselineUnit}px ${gridUnit}px;
    border: none;
    text-align: left;    
    &:first-child {
        padding-left: 0;
    }
    &:last-child {
        padding-right: 0;
    }
`;

export const Table = styled.table`
    ${({ isFixedSize }) => (isFixedSize && css`table-layout: fixed;`)};
    width: 100%;
    border-collapse: collapse;
`;

export const Caption = styled.caption`
  font-size: 1.42857143em;
  font-style: inherit;
  font-weight: 500;
  letter-spacing: -0.008em;
  line-height: 1.2;
  margin-top: ${baselineUnit * 7}px;
  margin-bottom: ${gridUnit}px;
  text-align: left;
`;

export const TableHead = styled.thead`
    border-bottom: 2px solid #DFE1E6;
`;

export const TableHeadCell = styled.th`
    ${props => onClickStyle(props)}
    ${props => truncateStyle(props)}
    ${props => arrowsStyle(props)}
    ${() => cellStyle}
    position: relative;
    vertical-align: top;
    text-align: left;
    border: none;
    font-size: 12px;
    color: ${akColorN300};
    fontWeight: 600;
`;

export const TableBodyRow = styled.tr`
    ${props => onClickStyle(props)}
    &:hover {
        background: ${akColorN10};
    }
`;

export const TableBodyCell = styled.td`
    ${props => onClickStyle(props)}
    ${props => truncateStyle(props)}
    ${() => cellStyle}  
`;
