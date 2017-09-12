import styled from 'styled-components';
import {
  akBorderRadius,
  akGridSizeUnitless,
  akColorN20,
  akColorN50A,
  akColorN60A,
} from '@atlaskit/util-shared-styles';
import { ComponentClass } from 'react';

// tslint:disable-next-line:variable-name
export const ContentWrapper = styled.div`
  margin: 0;
  word-wrap: break-word;
  min-width: 0;
  flex: 1 1 auto;
`;

// tslint:disable-next-line:variable-name
export const Wrapper = styled.div`
  display: flex;
  flex-direction: ${ props => props.theme.appearance === 'card'
    ? 'column'
    : 'row'
  };

  background-color: ${akColorN20};
  border-radius: ${akBorderRadius};
  margin: ${akGridSizeUnitless}px 0;
  padding: ${akGridSizeUnitless}px ${akGridSizeUnitless}px;
  min-height: 36px;
  box-sizing: border-box;
  box-shadow: ${props => props.theme.appearance === 'card'
    ? `0 1px 1px ${akColorN50A}, 0 0 1px 0 ${akColorN60A}`
    : 'none'
  };

  &:hover {
    box-shadow: ${props => props.theme.appearance === 'card'
      ? `0 4px 8px -2px ${akColorN60A}, 0 0 1px ${akColorN60A}`
      : 'none'
    };
    transition: box-shadow 0.2s ease-in-out;
  }
` as ComponentClass<any>;

// tslint:disable-next-line:variable-name
export const ParticipantWrapper = styled.div`
  margin: -2px 8px;
`;

// tslint:disable-next-line:variable-name
export const CardHeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  min-height: 24px;
`;
