/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akColorN70 } from '@atlaskit/util-shared-styles';

export const MoreBtn = styled.div`
  display: none;
  float: right;
  width: 36px;
  height: 26px;
  border-radius: 3px;

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
  display: none;
  float: right;
  width: 26px;
  height: 26px;
  border-radius: 3px;
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
  position: absolute;
  top: 8px;
  right: 8px;
  width: 14px;
  height: 14px;
  border: 2px solid white;
  border-radius: 20px;
  z-index: 20;
  display: none;
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
  border: 2px solid transparent;

  &:hover, &.active {
    .top-row {
      .title {
        color: #0065FF;
      }
    }

    .left-column{
      opacity: 1;
      transform: translateY(0);
    }

    .bottom-row {
      .more-btn {
        display: flex;
        justify-content: center;
      }

      .delete-btn {
        display: flex;
      }
    }
  }
  
  &.video, &.doc, &.unknown {
    .file-type-icon {
      display: block;
    }
  }
  /* Image */
  &.image {
    .top-row {
      .title {
        color: white;
        font-size: 12px;
        visibility: hidden;
      }
    }

    .bottom-row {
      .file-type-icon {
        display: none;
      }

      .file-size {
        color: white;
        display: none;
      }

      .more-btn {
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
      background-color: rgba(9, 30, 66, 0.5);

      .title {
        visibility: visible;
        transform: translateY(0);
        opacity: 1;
      }

      .file-type-icon {
        display: block;
      }

      .file-size {
        display: block;
      }

      .more-btn {
        display: flex;
        justify-content: center;
        color: white;
      }

      .delete-btn {
        display: flex;
      }
    }

    /* Selectable */
    &.selectable {
      &:hover, &.active {
        .tickbox {
          display: block;
        }
      }

      &.selected {
        border-color: #3384FF !important;

        .tickbox {
          display: flex !important;
          background-color: #3384FF !important;
          border-color: #3384FF !important;
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
  /* Error state */
  &.error {
    .top-row{
      overflow: visible;
    }
    &:hover, &.active {
      .top-row {
        .title {
          color: #091E42;
        }
      }
    }
  }

  .file-type-icon {
    display: none;
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
  opacity: 0;
  transform: translateY(25px);
  transition: all .3s;
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
  color: #0065FF;
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
  color: #091E42;
  font-size: 12px;
  line-height: 18px;
  transform: translateY(-25px);
  transition: all .3s;
  opacity: 0;
`;

export const FileSize = styled.div`
  float: left;
  font-size: 12px;
  color: #5E6C84;
`;

export const Metadata = styled.div`
  &.has-progress {
    display: none;
  }
`;
