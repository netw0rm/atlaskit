import { css } from 'styled-components';
import { ASC, DESC } from '../internal/constants';
import Theme from './theme';

export const { spacing } = Theme.$;
export const baselineUnit = spacing / 2;

export const truncateStyle = ({ width, isFixedSize, shouldTruncate }) => css`
  ${width ? css`width: ${width}%;` : ''}
  ${isFixedSize ? css`overflow: hidden;` : ''};
  ${isFixedSize && shouldTruncate ? css`
    text-overflow: ellipsis;
    white-space: nowrap;
  ` : ''}
`;

export const onClickStyle = ({ onClick }) => onClick && css`
  &:hover {
    cursor: pointer;
  }
`;

export const arrowsStyle = ({ isSortable, sortOrder }) => {
  if (!isSortable) return '';

  const pseudoBase = css`
    border: 3px solid transparent;
    display: block;
    height: 0;
    position: absolute;
    right: -${spacing}px;
    width: 0;
  `;

  return css`
    & > span {
      position: relative;
        &:before {
          ${pseudoBase};
            border-bottom: 3px solid ${sortOrder === ASC
              ? Theme.arrow.color.selected
              : Theme.arrow.color.default
            };
            bottom: 8px;
            content: ' ';
          };
        &:after {
          ${pseudoBase};
          border-top: 3px solid ${sortOrder === DESC
            ? Theme.arrow.color.selected
            : Theme.arrow.color.default
          };
          bottom: 0;
          content: ' ';
        };
      }

      &:hover > span {
        &:before {
          border-bottom: 3px solid ${sortOrder === ASC
            ? Theme.arrow.color.selected
            : Theme.arrow.color.hover
          };
        }
        &:after {
          border-top: 3px solid ${sortOrder === DESC
            ? Theme.arrow.color.selected
            : Theme.arrow.color.hover
          };
        }
      }
    `;
};

export const cellStyle = css`
    border: none;
    padding: ${baselineUnit}px ${spacing}px;
    text-align: left;

    &:first-child { padding-left: 0; }
    &:last-child { padding-right: 0; }
`;
