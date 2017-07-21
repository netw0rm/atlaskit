/* tslint:disable: variable-name */
import * as React from 'react';
import {action} from '@kadira/storybook';
import styled from 'styled-components';
import {AkFieldRadioGroup as RadioGroup} from '@atlaskit/field-radio-group';
import Slider from '@atlaskit/field-range';
import Button from '@atlaskit/button';
import {Card} from '@atlaskit/media-card';
import {createStorybookContext, genericUrlPreviewId, genericLinkId, genericFileId} from '@atlaskit/media-test-helpers';
import {FilmstripView} from '../../src/filmstripView';

const StoryWrapper = styled.div`
  padding: 1em;
`;

const Separator = styled.hr`
  margin: 1em 0;
  border: 1px solid #ccc;
`;

const ControlLabel = styled.label`
  display: block;
  margin-top: 1em;
  font-weight: bold;
`;

const context = createStorybookContext();

const exampleActions = [
  {label: 'View', handler: action('View')}
];

const cards = [
  <Card context={context} identifier={genericUrlPreviewId} actions={exampleActions}/>,
  <Card context={context} identifier={genericLinkId} actions={exampleActions}/>,
  <Card context={context} identifier={genericFileId} actions={exampleActions}/>
];

export interface ViewStoryProps {
}

export interface ViewStoryState {
  position: number;
  positions: {left: number; right: number}[];
  minPosition: number;
  maxPosition: number;
  containerWidth: string | number;
  children: JSX.Element[];
}

export class ViewStory extends React.Component<ViewStoryProps, ViewStoryState> {

  state: ViewStoryState = {
    position: 0,
    positions: [],
    minPosition: 0,
    maxPosition: 0,
    containerWidth: 'auto',
    children: cards.map((card, index) => React.cloneElement(card, {key: index}))
  };

  handleSizeChange = ({position, positions, minPosition, maxPosition}) => {
    this.setState({position, positions, minPosition, maxPosition});
  }

  handleScrollChange = ({position}) => {
    this.setState({position});
  }

  handleGoToStart = () => {
    this.setState(({minPosition}) => ({position: minPosition}));
  }

  handleGoToEnd = () => {
    this.setState(({maxPosition}) => ({position: maxPosition}));
  }

  handleGoTo = position => {
    this.setState({position});
  }

  handleChangeWidthType = event => {
    const type = event.target.value;
    if (type === 'auto') {
      this.setState({containerWidth: 'auto'});
    } else {
      this.setState({containerWidth: 600});
    }
  }

  handleChangeContainerWidth = containerWidth => {
    this.setState({containerWidth});
  }

  handleChangeCardCount = cardCount => {
    const children: JSX.Element[] = [];
    for (let i = 0; i < cardCount; ++i) {
      children.push(React.cloneElement(cards[Math.floor((Math.random()) * cards.length)], {key: i}));
    }
    this.setState({children});
  }

  renderFilmstrip() {
    const {position, containerWidth, children} = this.state;
    return (
      <div style={{width: containerWidth}}>
        <FilmstripView position={position} onSize={this.handleSizeChange} onScroll={this.handleScrollChange}>
          {children}
        </FilmstripView>
      </div>
    );
  }

  renderControls() {
    const {containerWidth, position, minPosition, maxPosition, children} = this.state;
    return (
      <div>

        <ControlLabel>Position: </ControlLabel>
        <Button onClick={this.handleGoToStart} isSelected={position === minPosition}>Start</Button>
        <Button onClick={this.handleGoToEnd} isSelected={position === maxPosition}>End</Button>
        <br/>
        <Slider step={1} min={minPosition} max={maxPosition} value={position} onChange={this.handleGoTo} />

        <RadioGroup
          label="Width"
          items={[
            {value: 'auto', label: 'Auto', isSelected: containerWidth === 'auto'},
            {value: 'number', label: 'Number', isSelected: containerWidth !== 'auto'},

          ]}
          onRadioChange={this.handleChangeWidthType}
        />
        {containerWidth !== 'auto' && <Slider value={containerWidth} min={0} max={1000} step={1} onChange={this.handleChangeContainerWidth} />}

        <ControlLabel htmlFor="cardCount">Card count: </ControlLabel>
        <Slider id="cardCount" value={children.length} min={0} max={25} step={1} onChange={this.handleChangeCardCount} />

      </div>
    );
  }

  render() {
    return (
      <StoryWrapper>
        <h1>Make your own 🍽</h1>
        <Separator/>
        {this.renderFilmstrip()}
        <Separator/>
        {this.renderControls()}
      </StoryWrapper>
    );
  }

}

export default () => <ViewStory/>;
