/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akColorN50 } from '@atlaskit/util-shared-styles';

const getHeightOfLocalUploadContainer = ({hasCards}) => {
  return `height: ${hasCards ? '200px' : '100%'}`;
};

export const Wrapper = styled.div`
  height: 400px;
  margin: 20px 0;
`;

export const LocalUpload = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border: dashed 2px ${akColorN50};
  border-radius: 3px;

  margin-bottom: 20px;
  ${getHeightOfLocalUploadContainer}
`;

export const UploadLocalBanner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LocalUploadPrompt = styled.p`
  margin-bottom: 20px;
`;

export const CardGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CardWrapper = styled.div`
  margin: 5px;
`;
