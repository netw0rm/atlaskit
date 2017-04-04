/* tslint:disable:variable-name */
import styled from 'styled-components';
import {rgba, centerX, easeOutCubic, borderRadius, size, transition, ellipsis} from '../../../styles';
import { akColorN70, akColorB200, akColorN0, akColorN800, akColorN900, akColorB400 } from '@atlaskit/util-shared-styles';

export const TickBox = styled.div`
  ${size(14)}
  ${transition()}
  background-color: ${rgba('#ffffff', 0.5)};
  position: absolute;
  top: 8px;
  right: 8px;
  border-radius: 20px;
  z-index: 20;
  color: #798599; // TODO FIL-3884: Align color with new design
  display: flex;
  opacity: 0;

  &.selected {
    opacity: 1;
    color: white;
    background-color: #0052CC; // TODO FIL-3884: Align with tickbox icons
  }
`;

export const Overlay = styled.div`
  ${borderRadius}
  width: 100%;
  height: 100%;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  border: 2px solid transparent;
  transition: .3s background ${easeOutCubic}, .3s border-color;

  &:hover, &.active {
    .top-row {
      .title {
        color: ${akColorB400};
      }
    }

    .bottom-row {
      .delete-btn {
        display: flex;
      }
    }
  }

  .file-type-icon {
    display: block;
  }
  
  &:not(.persistent) {
    &:hover {
      background-color: ${rgba(akColorN900, 0.06)};
    }

    &.selectable {
      &.selected {
        background-color: ${akColorB200};
        
        &:hover {
          // TODO FIL-3884 add new overlay with rgba(akColorN900, 0.16)
        }

        .title, .bottom-row, .file-size, .more-btn {
          color: ${akColorN0};
        }
      }
    }
  }

  &.persistent {
    &:not(.active) {
      overflow: hidden;
    }
    
    .top-row {
      .title {
        transition: opacity .3s;
        opacity: 0;
        color: white;
        font-size: 12px;
        visibility: hidden;
      }
    }

    .bottom-row {
      opacity: 0;
      transition: transform .2s, opacity .5s;
      transform: translateY(100%);

      .file-type-icon {
        display: none;
      }

      .file-size {
        color: white;
        display: none;
      }

      .more-btn {
        color: ${akColorN0};
        display: none;

        &:hover {
          background-color: rgba(9, 30, 66, 0.20);
        }
      }

      .delete-btn {
        display: none;

        &:hover {
          background-color: rgba(9, 30, 66, 0.20);
        }
      }
    }

    &:hover, &.active {
      background-color: ${rgba(akColorN900, 0.5)};

      .title {
        opacity: 1;
        visibility: visible;
      }

      .file-type-icon, .file-size {
        display: block;
      }

      .more-btn {
        ${centerX}
        color: ${akColorN0};
      }

      .delete-btn {
        display: flex;
      }

      .bottom-row {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Selectable */
    &.selectable {
      &:hover {
        .tickbox {
          opacity: 1;
        }
      }

      &.selected {
        border-color: ${akColorB200} !important;

        .tickbox {
          background-color: ${akColorB200} !important;
          border-color: ${akColorB200} !important;
          color: white;
        }
      }
    }

    /* In progress*/
    &.in-progress {
      .bottom-row {
        .file-type-icon {
          display: none;
        }

        .file-size {
          display: none;
        }
      }
    }
  }

  &.error {
    .top-row{
      overflow: visible;
    }
    &:hover, &.active {
      .top-row {
        .title {
          color: ${akColorN800};
        }
      }
    }
  }
`;

export const ErrorLine = styled.div`
  display: block;
  height: 24px;
  display: flex;
  align-items: center;
`;

export const LeftColumn = styled.div`
  width: 100%;
  display: table-cell;
  position: relative;
  box-sizing: border-box;
  vertical-align: middle;
  padding: 0 5px 0 5px;
`;

export const TopRow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 8px 0 8px;
`;

export const BottomRow = styled.div`
  position: absolute;
  display: table;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  height: 28px;
  line-height: 26px;
  padding: 0 2px 0 2px;
`;

export const RightColumn = styled.div`
  display: table-cell;
`;

export const ErrorMessage = styled.div`
  display: inline-block;
  vertical-align: middle;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: bold;
  color: ${akColorN70};
  font-size: 12px;
  line-height: 15px;
  overflow: hidden;
  max-width: ~"calc(100% - 24px)";
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Retry = styled.div`
  position: absolute;
  box-sizing: border-box;
  padding: 0 7px 7px 0;
  bottom: 0;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: bold;
  color: ${akColorB400};
  font-size: 12px;
  line-height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DropdownWrapper = styled.div`
  position: absolute;
  z-index: 100;
  left: calc(100% - 40px);
  top: 100%;
  display: block;
`;

export const TitleWrapper = styled.div`
  box-sizing: border-box;
  word-wrap: break-word;
  color: ${akColorN800};
  font-size: 12px;
  line-height: 18px;
`;

export const FileSize = styled.div`
  ${ellipsis('100px')}
  font-size: 12px;
  color: #5E6C84;
`;

export const Metadata = styled.div`
  &.has-progress {
    display: none;
  }
`;

export const ExpandIconWrapper = styled.div`
  color: white;
  position: absolute;
  top: 0;
  right: 0;
`;
