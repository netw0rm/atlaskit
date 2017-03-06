/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akColorN30, akColorN300 } from '@atlaskit/util-shared-styles';
import { Root } from '../styles/base';

export const Wrapper = styled(Root)`
  display: flex;

  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(9, 30, 66, 0.2), 0 0 1px 0 rgba(9, 30, 66, 0.24);
`;

export const Thumbnail = styled.img`
  flex-shrink: 0;

  width: 116px;
  height: 116px;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;

  padding: 10px;
  background-color: ${akColorN30};
`;

export const Title = styled.div`
  .ellipsed-text {
    font-size: 14px;
  }
`;

export const Description = styled.div`
  .ellipsed-text {
    font-size: 12px;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export const Link = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }

  a {
    display: block;
    max-width: 150px;

    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${akColorN300};
  }
`;
