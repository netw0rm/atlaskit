/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

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

export const DragZone = styled.div`
  border: 2px dashed #ccc;
  border-radius: 100%;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

export const DragZoneImage = styled.img`
  width: 100px;
`;

export const DragZoneText = styled.div`
  text-align: center;
`;
