import {
  akColorN0,
  akColorN20,
  akColorN70,
  akColorN200,
  akColorN400,
  akColorN700,
  akColorN600,
  akColorN800,
  akColorB50,
  akColorB200,
  akColorB400,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const isChecked = props =>
  ['checkbox', 'radio'].indexOf(props.theme.type) > -1 && props.theme.isChecked;

const isActive = props =>
  (props.theme.type === 'link' && props.theme.isActive) || (props.theme.type === 'option' && props.theme.isSelected);

const getCheckRadioFill = (props) => {
  if (isChecked(props)) {
    return (props.theme.isDisabled ? akColorN700 : akColorN0);
  }
  return (props.theme.isDisabled ? 'transparent' : akColorN20);
};

const getCheckRadioColor = (props) => {
  if (isChecked(props)) {
    return (props.theme.isDisabled ? akColorN600 : akColorB400);
  }
  return (props.theme.isDisabled ? akColorN600 : akColorN20);
};

const akGridSize = 8;

export const ElementWrapper = styled.div`
  & > .element-content {
    align-items: center;
    background-color: ${props => (isActive(props) ? akColorN20 : null)};
    cursor: ${props => (props.theme.isDisabled ? 'not-allowed' : 'pointer')};
    color: ${props => (props.theme.isDisabled ? akColorN70 : akColorN800)};
    display: ${props => (props.theme.isHidden ? 'none' : 'flex')};
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
      background-color: ${props => (props.theme.isDisabled ? akColorN0 : akColorN20)};
      text-decoration: none;
      color: ${props => (props.theme.isDisabled ? akColorN70 : akColorN800)};
    }

    &:hover .checkradio {
      color: ${props => (isChecked(props) ? akColorB400 : 'rgba(137, 147, 164, 0.48)')};
      fill: ${props => (isChecked(props) ? akColorN0 : 'transparent')}
    }

    ${
      props => (!props.theme.isDisabled ?
        `&:active {
          background-color: ${akColorB50};
          color: ${akColorN800};
        }` : '')
     }

    $:active > .checkradio {
      color: ${props => (isChecked(props) ? akColorN400 : 'rgba(137, 147, 164, 0.48)')};
      fill: ${props => (isChecked(props) ? akColorN0 : 'transparent')}
    }
  }
`;

export const ElementSpan = styled.span``;

export const ElementAnchor = styled.a``;

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
