
/* tslint:disable:variable-name */
import styled from 'styled-components';

export const containerForWidgetStyles = `
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2147483647;
  top: 0;
  left: 0;

  pointer-events: none;
`;

export const widgetWrapperStyles = {
  textAlign: 'center',
  borderRadius: '3px',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  pointerEvents: 'all',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  boxShadow: 'black 1px 1px 7px -2px'
};

export const FilmstripWrapper = styled.div`
  display: none;
  width: 100%;
  margin: 5px;
  padding: 0 5px;
  border-top: 1px solid #ccc;
  cursor: default;
`;

export const DragHandler = styled.div`
  height: 25px;
  width: 100%;
  background: red;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  border-radius: 3px 3px 0 0;
`;
