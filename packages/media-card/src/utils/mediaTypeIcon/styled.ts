/* tslint:disable:variable-name */
import styled from 'styled-components';
import {
  akColorY200,
  akColorP200,
  akColorB300
} from '@atlaskit/util-shared-styles';

const colors = {
  image: akColorY200,
  audio: akColorP200,
  video: '#ff7143',
  doc: akColorB300,
  unknown: '#3dc7dc'
};

export interface IconWrapperProps {
  type: string;
}

export const IconWrapper = styled.div`
  display: inline-flex;
  color: ${({type}: IconWrapperProps) => colors[type] || colors.unknown};
`;
