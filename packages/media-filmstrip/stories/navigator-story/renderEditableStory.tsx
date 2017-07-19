/* tslint:disable: variable-name */
import * as React from 'react';
import {action} from '@kadira/storybook';
import styled from 'styled-components';
import {Card} from '@atlaskit/media-card';
import RadioGroup from '@atlaskit/field-radio-group';
import Slider from '@atlaskit/field-range';
import {createStorybookContext, genericUrlPreviewId, genericLinkId, genericFileId} from '@atlaskit/media-test-helpers';
import {FilmStripNavigator} from '../../src';

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

export interface NavigatorStoryProps {
}

export interface NavigatorStoryState {
  widthType: 'auto' | 'number';
  width: number;
  cardCount: number;
}

export class NavigatorStory extends React.Component<NavigatorStoryProps, NavigatorStoryState> {

  state: NavigatorStoryState = {
    widthType: 'auto',
    width: 300,
    cardCount: 3
  };

  handleChangeWidthType = event => {
    this.setState({widthType: event.target.value});
  }

  handleChangeWidth = width => {
    this.setState({width});
  }

  handleChangeCardCount = cardCount => {
    this.setState({cardCount});
  }

  renderFilmstrip() {
    const {widthType, width, cardCount = 0} = this.state;

    const children: JSX.Element[] = [];
    for (let i = 0; i < cardCount; ++i) {
      children.push(React.cloneElement(cards[Math.floor((Math.random()) * cards.length)], {key: i}));
    }

    return (
      <div>
        <FilmStripNavigator width={widthType === 'auto' ? undefined : width}>
          {children}
        </FilmStripNavigator>
      </div>
    );
  }

  renderControls() {
    const {widthType, width, cardCount} = this.state;
    return (
      <div>

        <RadioGroup
          label="Width"
          items={[
            {value: 'auto', label: 'Auto', defaultSelected: true},
            {value: 'number', label: 'Number'},

          ]}
          onRadioChange={this.handleChangeWidthType}
        />
        {widthType === 'number' && <Slider value={width} min={0} max={1000} step={1} onChange={this.handleChangeWidth} />}

        <ControlLabel htmlFor="cardCount">Card count: </ControlLabel>
        <Slider id="cardCount" value={cardCount} min={0} max={25} step={1} onChange={this.handleChangeCardCount} />

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

export default () => <NavigatorStory/>;
