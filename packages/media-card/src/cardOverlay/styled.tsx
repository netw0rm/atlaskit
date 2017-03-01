/* tslint:disable:variable-name */
import styled from 'styled-components';
import {rgba, centerX, easeOutCubic, borderRadius, size} from '../styles/base';
import { akColorN70, akColorB200, akColorN0, akColorN500, akColorN800, akColorN900, akColorB400 } from '@atlaskit/util-shared-styles';

export const MoreBtn = styled.div`
  ${centerX()}
  ${borderRadius()}
  float: right;
  width: 36px;
  height: 26px;
  color: ${akColorN500};

  &:hover {
    background-color: rgba(9, 30, 66, 0.06);
  }

  &.active {
    background-color: white !important;

    span {
      color: #253858;
    }
  }
`;

export const DeleteBtn = styled.div`
  ${borderRadius()}
  ${size(26)}
  display: none;
  float: right;
  color: white;
  justify-content: center;

  &:hover {
    background-color: rgba(9, 30, 66, 0.06);
  }
`;

export const FileTypeIcon = styled.div`
  float: left;
  margin-right: 6px;
  position: relative;
  top: 1px;

  &.audio {
    color: #8777D9;
  }

  &.doc {
    color: #0065ff;
  }

  &.image {
    color: #ffc400;
  }

  &.video {
    color: #ff7143;
  }

  &.unknown {
    color: #3dc7dc;
  }

  span{
    width: 12px !important;
    height: 12px !important;
  }
`;

export const TickBox = styled.div`
  ${size(14)}
  background-color: ${akColorN70};
  position: absolute;
  top: 8px;
  right: 8px;
  border-radius: 20px;
  z-index: 20;
  display: flex;
  color: ${akColorN0};
`;

export const Overlay = styled.div`
  ${borderRadius()}
  width: 100%;
  height: 100%;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  border: 2px solid transparent;
  transition: .3s background ${easeOutCubic};

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
  
  &:not(.show-on-hover) {
    &:hover {
      background-color: ${rgba(akColorN900, 0.06)};
    }

    &.selectable {
      &.selected {
        background-color: ${akColorB200};
        
        &:hover {
          // Not working fine
          background-color: ${rgba(akColorN900, 0.16)};
        }

        .title, .bottom-row, .file-size, .more-btn {
          color: ${akColorN0};
        }
      }
    }
  }

  &.show-on-hover {
    overflow: hidden;
    
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
        ${centerX()}
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
  
  .ellipsed-text {
    // color: ${akColorN0};
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

export const ErrorIconWrapper = styled.div`
  display: flex;
  color: #ff991f;
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
  float: left;
  font-size: 12px;
  color: #5E6C84;
  text-transform: lowercase;
`;

export const Metadata = styled.div`
  &.has-progress {
    display: none;
  }
`;
