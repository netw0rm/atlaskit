/* tslint:disable:variable-name */
import * as React from 'react';
import {Component} from 'react';
import styled from 'styled-components';
import {
  akBorderRadius
} from '@atlaskit/util-shared-styles';

export const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  /* Is needed so image is not selected, when dragged */
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;          /* Likely future */      
`;

const Mask = styled.div`
  position: absolute;
  top: 20px;
  bottom: 20px;
  left: 20px;
  right: 20px;
  box-shadow: 0 0 0 100px rgba(255,255,255,.5);
`;

const RectMask = styled(Mask)`
  border-radius: ${akBorderRadius};
`;

const CircularMask = styled(Mask)`
  border-radius: 500px;
`;

const DragContainer = styled.div`
  position: absolute;
  width: 100%;
  height:100%;
  cursor: move;
`;

export interface ImageCropperProp {
  imageSource: string;
  imageWidth: number;
  containerSize?: number;
  isCircularMask?: boolean;
  top: number;
  left: number;
}

export class StatelessImageCropper extends Component<ImageCropperProp, {}> {
  static defaultProps = {
    containerSize: 200,
    isCircleMask: false,
  };

  render(){
    const {
      isCircularMask,
      containerSize,
      top,
      left,
      imageSource,
      imageWidth
    } = this.props;

    const containerStyle = {
      width: `${containerSize}px`,
      height: `${containerSize}px`,
    };

    const imageStyle = {
      width: `${imageWidth}px`,
      top: `${top}px`,
      left: `${left}px`,
    };

    return <Container style={containerStyle}>
      <Image src={imageSource} style={imageStyle} />
      {isCircularMask ? <CircularMask /> : <RectMask />}
      <DragContainer />
    </Container>;
  }
}
