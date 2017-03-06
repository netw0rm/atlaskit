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

 // min-width required in Details to get proper text wrapping in IE11
export const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;
  min-width: 150px;

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
    word-wrap: break-word;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
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

export const Menu = styled.div`
  position: relative;
`;

export const DropdownWrapper = styled.div`
  display: block;
  position: absolute;
  left: calc(100% - 37px);
  top: 105%;

  z-index: 100;
`;
