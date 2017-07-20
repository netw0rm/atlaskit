/* tslint:disable: variable-name */
import * as React from 'react';
import {action} from '@kadira/storybook';
import styled from 'styled-components';
import RadioGroup from '@atlaskit/field-radio-group';
import Slider from '@atlaskit/field-range';
import Button from '@atlaskit/button';
import {Card} from '@atlaskit/media-card';
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
  index: number;
  goToIndex: number;
  widthType: 'auto' | 'number';
  width: number;
  children: JSX.Element[];
}

export class NavigatorStory extends React.Component<NavigatorStoryProps, NavigatorStoryState> {

  state: NavigatorStoryState = {
    index: 0,
    goToIndex: Math.floor(cards.length / 2),
    widthType: 'auto',
    width: 300,
    children: cards
  };

  handleGoToFirst = () => {
    this.setState({index: 0});
  }

  handleGoToLast = () => {
    this.setState(({children}) => ({index: children.length - 1}));
  }

  handleGoToIndex = () => {
    this.setState(({goToIndex}) => ({index: goToIndex}));
  }

  handleChangeGoToIndex = goToIndex => {
    this.setState({goToIndex});
  }

  handleChangeWidthType = event => {
    this.setState({widthType: event.target.value});
  }

  handleChangeWidth = width => {
    this.setState({width});
  }

  handleChangeCardCount = cardCount => {
    const children: JSX.Element[] = [];
    for (let i = 0; i < cardCount; ++i) {
      children.push(React.cloneElement(cards[Math.floor((Math.random()) * cards.length)], {key: i}));
    }
    this.setState({children});
  }

  renderFilmstrip() {
    const {index, widthType, width, children} = this.state;
    return (
      <div>
        <FilmStripNavigator index={index} width={widthType === 'auto' ? undefined : width}>
          {children}
        </FilmStripNavigator>
      </div>
    );
  }

  renderControls() {
    const {goToIndex, widthType, width, children} = this.state;
    return (
      <div>

        <ControlLabel>Go to: </ControlLabel>
        <Button onClick={this.handleGoToFirst}>First</Button>
        <Button onClick={this.handleGoToLast}>Last</Button>
        <br/>
        <Button onClick={this.handleGoToIndex}>Go to:</Button>
        <Slider value={goToIndex} min={0} max={children.length - 1} step={1} onChange={this.handleChangeGoToIndex} />

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

export default () => <NavigatorStory/>;
