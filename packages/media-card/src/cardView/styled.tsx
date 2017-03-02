/* tslint:disable:variable-name */
import styled from 'styled-components';
import { Root } from '../styles/base';

export const Card = styled(Root)`
  background: #fff;
  display: table;
  font-family: sans-serif;
  border-radius: 3px;
  cursor: pointer;
  line-height: normal;
  position: relative;
  box-shadow: 0 1px 1px rgba(9, 30, 66, 0.2), 0 0 1px 0 rgba(9, 30, 66, 0.24);
  
  .wrapper {
    background: #E5E8EC;
    display: block;
    height: inherit;
    overflow: hidden;
    position: relative;
    border-radius: 3px;

    .img-wrapper{
      position: relative;
      width: inherit;
      height: inherit;
      display: block;

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        max-height: 100%;
        max-width: 100%;
        display: block;
        transform: translate(-50%, -50%);
      }
    }
  }
`;
