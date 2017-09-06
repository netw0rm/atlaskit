import styled from 'styled-components';
import {
  akGridSize,
  akColorN0,
  akColorN30,
  akColorN50,
} from '@atlaskit/util-shared-styles';

// tslint:disable-next-line:variable-name
export const CheckBoxWrapper = styled.span`
  position: absolute;
  top: 0;
  left: ${akGridSize};
  bottom: 0;
  width: 16px;

  & > input[type="checkbox"] {
    position: absolute;
    outline: none;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    left: 0;
    top: 50%;
    transform: translateY(-50%);

    + label {
      box-sizing: border-box;
      display: block;
      padding: 4px;
      position: relative;
      width: 100%;
      cursor: pointer;

      &::after {
        background: ${akColorN0};
        background-size: 16px;
        border-color: transparent;
        border-radius: 3px;
        border-style: solid;
        border-width: 1px;
        border-color: ${akColorN50};
        box-sizing: border-box;
        content: '';
        height: 16px;
        left: 50%;
        position: absolute;
        transition: border-color 0.2s ease-in-out;
        top: 18px;
        width: 16px;
        transform: translate(-50%, -50%);
      }

    }
    &:not([disabled]) + label:hover::after {
      background: ${akColorN30};
      transition: border 0.2s ease-in-out;
    }
    &[disabled] + label {
      opacity: 0.5;
    }
    &:checked {
      + label::after {
        background: url(data:image/svg+xml;charset=utf-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICA8cmVjdCB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHJ4PSIyIiBmaWxsPSIjMDA1MkNDIj48L3JlY3Q+DQogIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik05LjM3NCA0LjkxNEw1LjQ1NiA4LjgzMmEuNzY5Ljc2OSAwIDAgMS0xLjA4OCAwTDIuNjI2IDcuMDkxYS43NjkuNzY5IDAgMSAxIDEuMDg4LTEuMDg5TDQuOTEyIDcuMmwzLjM3NC0zLjM3NGEuNzY5Ljc2OSAwIDEgMSAxLjA4OCAxLjA4OCI+PC9wYXRoPg0KPC9zdmc+) no-repeat 0 0;
        background-size: 16px;
        border: 0;
        border-color: transparent;
      }
      &:not([disabled]) + label:hover::after {
        background: url(data:image/svg+xml;charset=utf-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICA8cmVjdCB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHJ4PSIyIiBmaWxsPSIjMDc0N0E2Ij48L3JlY3Q+DQogIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik05LjM3NCA0LjkxNEw1LjQ1NiA4LjgzMmEuNzY5Ljc2OSAwIDAgMS0xLjA4OCAwTDIuNjI2IDcuMDkxYS43NjkuNzY5IDAgMSAxIDEuMDg4LTEuMDg5TDQuOTEyIDcuMmwzLjM3NC0zLjM3NGEuNzY5Ljc2OSAwIDEgMSAxLjA4OCAxLjA4OCI+PC9wYXRoPg0KPC9zdmc+) no-repeat 0 0;
        background-size: 16px;
      }
    }
  }
`;
