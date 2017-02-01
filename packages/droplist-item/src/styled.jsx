import {
  akColorN0,
  akColorN20,
  akColorN70,
  akColorN200,
  akColorN400,
  akColorN600,
  akColorN800,
  akColorB50,
  akColorB200,
  akColorB400,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const isChecked = props =>
  ['checkbox', 'radio'].indexOf(props.elementType) > -1 && props.isChecked;

const isActive = props =>
  (props.elementType === 'link' && props.isActive) || (props.elementType === 'option' && props.isSelected);

const getCheckRadioFill = (props) => {
  if (isChecked(props)) {
    return (props.isDisabled ? 'transparent' : akColorN0);
  }
  return (props.isDisabled ? 'transparent' : akColorN20);
};

const getCheckRadioColor = (props) => {
  if (isChecked(props)) {
    return (props.isDisabled ? akColorN600 : akColorB400);
  }
  return (props.isDisabled ? akColorN600 : akColorN20);
};

const akGridSize = 8;

export const ElementWrapper = styled.div`
  & > .element-content {
    align-items: center;
    background-color: ${props => (isActive(props) ? akColorN20 : 'transparent')};
    cursor: ${props => (props.isDisabled ? 'not-allowed' : 'pointer')};
    color: ${props => (props.isDisabled ? akColorN70 : akColorN800)};
    display: ${props => (props.isHidden ? 'none' : 'flex')};
    flex-wrap: nowrap;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: normal;
    line-height: 1;
    padding: 0 ${akGridSize * 3}px;
    text-decoration: none;

    & > .checkradio {
      margin: 0 ${akGridSize}px;
      display: flex;
      color: ${getCheckRadioColor};
      fill: ${getCheckRadioFill};

      & + .content {
        margin: 0;
      }
    }

    &:focus {
      box-shadow: 0 0 0 2px ${akColorB200};
      outline: none;
      outline-offset: 0;
      position: relative;
    }

    &:hover {
      background-color: ${props => (props.isDisabled ? akColorN0 : akColorN20)};
      text-decoration: none;
      color: ${props => (props.isDisabled ? akColorN70 : akColorN800)};
    }

    ${
      props => (!props.isDisabled ?
        `
          &:hover .checkradio {
            color: ${(isChecked(props) ? akColorB400 : 'rgba(137, 147, 164, 0.48)')};
            fill: ${(isChecked(props) ? akColorN0 : 'transparent')}
          }
          &:active {
            background-color: ${akColorB50};
            color: ${akColorN800};
          }
        ` : '')
     }

    $:active > .checkradio {
      color: ${props => (isChecked(props) ? akColorN400 : 'rgba(137, 147, 164, 0.48)')};
      fill: ${props => (isChecked(props) ? akColorN0 : 'transparent')}
    }
  }
`;

export const Content = styled.span`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 ${akGridSize}px;
  padding: 9px 0;

  &:first-child {
    margin: 0;
  }
`;

export const BeforeContent = styled.span`
  display: flex;
`;

export const AfterContent = styled.span`
  align-items: center;
`;

export const SecondaryTextSpan = styled.span`
  color: ${akColorN200};
`;
