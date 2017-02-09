import styled from 'styled-components';

export const TopRow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 8px 0 8px;
`;

export const TopRowTitle = styled.div`
  box-sizing: border-box;
  word-wrap: break-word;
  color: #091E42;
  font-size: 12px;
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
export const LeftColumn = styled.div`
  width: 100%;
  display: table-cell;
  position: relative;
  box-sizing: border-box;
  vertical-align: middle;
  padding: 0 5px 0 5px;

  .file-type-icon {
    float: left;
    margin-right: 6px;
    position: relative;
    top: 7px;
  }
`;
export const Metadata = styled.div`

`;
export const FileTypeIcon = styled.div`
  width: 12px;
  height: 12px;

  &.audio {
    background: data-uri("./icons/audio.svg") no-repeat center;
  }

  &.doc {
    background: data-uri("./icons/doc.svg") no-repeat center;
  }

  &.image {
    background: data-uri("./icons/image.svg") no-repeat center;
  }

  &.unknown {
    background: data-uri("./icons/unknown.svg") no-repeat center;
  }

  &.video {
    background: data-uri("./icons/video.svg") no-repeat center;
  }
`;

export const FileSize = styled.div`
  float: left;
  font-size: 12px;
  color: #5E6C84;
`;

export const RightColumn = styled.div`
  display: table-cell;
`;

export const Highlight = `
  .top-row {
    .title {
      color: #0065FF;
    }
  }

  .bottom-row {
    .more-btn {
      display: block;
    }

    .delete-btn {
      display: block;
    }
  }
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

  &:hover {${Highlight}}
`;