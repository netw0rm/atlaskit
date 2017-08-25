/* tslint:disable:variable-name */
import styled from 'styled-components';
import {
  akColorP200,
  akColorB300,
  akColorY200
} from '@atlaskit/util-shared-styles';

const colors = {
  audio: akColorP200,
  doc: akColorB300,
  image: akColorY200,
  video: '#ff7143',
  unknown: '#3dc7dc',
};

interface IconWrapperProps {
  type?: string;
}

export const IconWrapper = styled.div`
  display: inline-flex;
  color: ${({type}: IconWrapperProps) => colors[type || 'unknown']};
`;
