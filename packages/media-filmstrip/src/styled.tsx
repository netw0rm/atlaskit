/* tslint:disable:variable-name */
import styled from 'styled-components';

export const FilmStripViewWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  display: inline-flex;

  &:hover .arrow{
    opacity: 1;
  }
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
  top: 50%;
  transform: translateY(-50%);
  background-color: #eee;
  border-radius: 100%;
  display: flex;
  cursor: pointer;
  transition: all .3s;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.6);
  color: black;
  width: 30px;
  height: 30px;
  justify-content: center;
  opacity: 0;

  &:hover{
    color: black;
    background-color: #dadddd;
  }
`;

export const ArrowLeftWrapper = styled(ArrowWrapper)`
  left: 10px;
`;

export const ArrowRightWrapper = styled(ArrowWrapper)`
  right: 10px;
`;

export const Shadow = styled.div`
  position: absolute;
  z-index: 10;
  height: 100%;
  top: 0;
  width: 25px;
`;

export const ShadowLeft = styled(Shadow)`
  left: 0;
  background: linear-gradient(to right, white, rgba(255, 255, 255, 0.2));
`;

export const ShadowRight = styled(Shadow)`
  right: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.2), white);
`;
