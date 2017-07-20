/* tslint:disable:variable-name */
import * as React from 'react';
import styled from 'styled-components';
import {storiesOf} from '@kadira/storybook';
import * as chroma from 'chroma-js';
import {FilmstripView} from '../src/filmstripView';

const colors = chroma.scale(['#fafa6e','#2A4858']).mode('lch').colors(10);

interface BoxProps {
  color: string;
}

const Box = styled.div`
  width: 175px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-weight: bold;
  color: white;
  background-color: ${({color}: BoxProps) => color};
`;

interface FilmstripViewExampleProps {
}

interface FilmstripViewExampleState {
  position: number;
  children?: any[];
}

class FilmstripViewExample extends React.Component<FilmstripViewExampleProps, FilmstripViewExampleState> {

  state = {
    position: 0,
    children: colors.map((color, index) => (
      <Box key={index} color={color}>#{index}</Box>
    ))
  };

  handleSize = ({position}) => {
    this.setState({position});
  }

  handleScroll = ({position}) => {
    this.setState({position});
  }

  render() {
    const {position, children} = this.state;
    return (
      <FilmstripView position={position} onSize={this.handleSize} onScroll={this.handleScroll}>
        {children}
      </FilmstripView>
    );
  }

}

storiesOf('Carousel', module)
  .add('foo', () => <FilmstripViewExample/>)
;

