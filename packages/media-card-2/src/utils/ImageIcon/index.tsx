/* tslint:disable: variable-name */
import * as React from 'react';
import styled from 'styled-components';

export const Image = styled.img`
  width: 16px;
  height: 16px;
  border: none;
`;

export interface ImageIcon {
  url: string;
}

export class ImageIcon extends React.Component<ImageIcon, {}> {
  render(){
    const {url} = this.props;
    return (
      <Image src={url}/>
    );
  }
}
