import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { verticalPadding } from '../styled/constants';

const AvatarSectionDiv = styled.div`
  align-self: stretch;
  display: flex;
  margin-right: ${akGridSizeUnitless * 2}px;
  [dir="rtl"] & {
    margin-left: ${akGridSizeUnitless * 2}px;
    margin-right: 0;
  }
`;

const NestedCommentsDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${verticalPadding}px;
`;

const Container = styled.div`
  display: flex;
  padding-top: ${verticalPadding}px;

  /* We need both selectors as there is not a common wrapper component around
  comments. We also provide isFirst as an escape hatch. */
  &:first-child,
  &:first-of-type {
    padding-top: 0;
  }
`;

const MainSection = styled.div`
  flex: 1 1 100%;
  margin-top: ${akGridSizeUnitless * 0.25}px;
  min-width: 0;
  word-wrap: break-word;
`;

export {
  AvatarSectionDiv,
  Container,
  MainSection,
  NestedCommentsDiv,
};
