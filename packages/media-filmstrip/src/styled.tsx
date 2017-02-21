/* tslint:disable:variable-name */
import styled from 'styled-components';

export const FilmStripViewWrapper = styled.div`
  position: relative;
  background: #172b4d;
  overflow: hidden;
  padding: 10px;
  border-radius: 3px;
`;

export const FilmStripList = styled.ul`
  margin: 0;
  padding: 0;
  display: inline-flex;
  flex-direction: row;
  line-height: 0;
  transition: transform .5s cubic-bezier(0.77, 0, 0.175, 1);

  li {
    list-style-type: none;
    margin: 0;
    padding-left: 8px;

    &:first-child {
      padding-left: 0;
    }
  }
`;

export const ArrowWrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border-radius: 100%;
  display: flex;
  cursor: pointer;
  transition: all .3s;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.6);
  color: #c0c0c0;

  &:hover{
    color: black;
    box-shadow: 0 0 6px rgba(0,0,0,.16), 0 6px 12px rgba(0,0,0,.32);
  }
`;

export const ArrowLeftWrapper = styled(ArrowWrapper)`
  left: 15px;
`;

export const ArrowRightWrapper = styled(ArrowWrapper)`
  right: 15px;
`;
