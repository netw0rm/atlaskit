/* tslint:disable:variable-name */
import styled, {keyframes} from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Container = styled.div`
  width: ${akGridSizeUnitless * 32}px;
  box-sizing: border-box;
  * {box-sizing: border-box;}
`;

export const SliderContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  margin-top: ${akGridSizeUnitless}px;
`;

export const FileInput = styled.input`
  display: none;
`;

export const ImageUploader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;
const droppingAnimation = `
  border-color: #0e56c4;
  background-color: #ddecfe;
  animation: ${spin} 8s linear infinite;
`;
export const DragZone = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  position: relative;

  &:before {
    content: '';
    border: 2px dashed #d0d6d0;
    border-radius: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  &.isDroppingFile {
    &:before {
      ${droppingAnimation}
    }
  }
`;

export const DragZoneImage = styled.img`
  width: 100px;
`;

export const DragZoneText = styled.div`
  text-align: center;
`;
