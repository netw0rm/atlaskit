import styled from 'styled-components';
import { akColorN800, akColorN300, akColorN40, akColorB500 } from '@atlaskit/util-shared-styles';

const borderColor = akColorN40;

export const Link = styled.a`
  color: white;

  &:hover {
    color: white;
    text-decoration: underline !important;
  }
`;

export const LoginList = styled.ul`
  list-style: none;
  position: absolute;
  z-index: 9;
  top: 100%;
  right: 0;
  background-color: white !important;
  margin: 0;
  border-radius: 3px;
  border: 1px solid ${borderColor};
  color: ${akColorN800};
  cursor: default;
  transform: translateY(5px);
  overflow: hidden;

  li {
    > * {
      padding: 0 10px;
    }

    a {
      display: block;
      color: ${akColorN800};
    }
  }
`;

export const AvatarWrapper = styled.div`
  cursor: pointer;
  position: relative;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${borderColor};
`;

export const UserName = styled.div`
  text-transform: capitalize;
`;

export const UserEmail = styled.div`
  color: ${akColorN300};
`;

export const UserInfo = styled.div`
  margin-left: 10px;
`;

export const AvatarElementWrapper = styled.div`
  > * {
    border-radius: 100%;
    border: 5px solid transparent;
    transition: border-color .2s;
  }

  &:hover, &.active {
    > * {
      border-color: ${akColorB500};
    }
  }
`;

export const UserInfoItem = styled.li`
  margin: 0;
`;

export const ListLink = styled.li`
  padding: 5px 0;
  cursor: pointer;
  transition: background-color .2s;

  &:hover {
    background-color: ${akColorB500};
    a {color: white !important;}
  }

  a {
    transition: color .2s
  }
`;
