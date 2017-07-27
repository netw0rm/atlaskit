import { css } from 'styled-components';
import { ASC, DESC } from '../internal/constants';
import { PKG_NM } from './theme';
import { theme, themeValue } from '../../../theme/src';

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

export const arrowsStyle = (props) => {
  const { isSortable, sortOrder } = props;
  const { arrow } = theme(props)[PKG_NM];

  if (!isSortable) return '';

  const pseudoBase = css`
    border: 3px solid transparent;
    display: block;
    height: 0;
    position: absolute;
    right: -${themeValue('base.gridSize')}px;
    width: 0;
  `;

  return css`
    & > span {
      position: relative;
        &:before {
          ${pseudoBase};
            border-bottom: 3px solid ${sortOrder === ASC
              ? arrow.color.selected
              : arrow.color.default
            };
            bottom: 8px;
            content: ' ';
          };
        &:after {
          ${pseudoBase};
          border-top: 3px solid ${sortOrder === DESC
            ? arrow.color.selected
            : arrow.color.default
          };
          bottom: 0;
          content: ' ';
        };
      }

      &:hover > span {
        &:before {
          border-bottom: 3px solid ${sortOrder === ASC
            ? arrow.color.selected
            : arrow.color.hover
          };
        }
        &:after {
          border-top: 3px solid ${sortOrder === DESC
            ? arrow.color.selected
            : arrow.color.hover
          };
        }
      }
    `;
};

export const cellStyle = css`
    border: none;
    padding: ${p => theme(p)[PKG_NM].baselineUnit}px ${themeValue('base.gridSize')}px;
    text-align: left;

    &:first-child { padding-left: 0; }
    &:last-child { padding-right: 0; }
`;
