import * as React from 'react';
import {CardView} from '@atlaskit/media-card';
import {minimalLinkDetailsContainingASmartCard} from '@atlaskit/media-test-helpers';
import {FilmstripView} from '../../src/filmstripView';

export interface StoryProps {
}

export interface StoryState {
  animate: boolean;
  offset: number;
}

export class Story extends React.Component<StoryProps, StoryState> {

  state: StoryState = {
    animate: false,
    offset: 0
  };

  handleSizeChange = ({offset}) => this.setState({offset});
  handleScrollChange = ({offset, animate}) => this.setState({offset, animate});

  render() {
    const {animate, offset} = this.state;
    return (
      <div>
        <h1>Children</h1>
        <p>This storybook renders different types of children to assert that they render OK inside the filmstrip.</p>
        <FilmstripView animate={animate} offset={offset} onSize={this.handleSizeChange} onScroll={this.handleScrollChange}>

          {/* I added this to demonstrate the line-height + color issue. See https://product-fabric.atlassian.net/browse/MSW-98 */}
          <CardView status="complete" metadata={minimalLinkDetailsContainingASmartCard}/>
          <CardView status="complete" metadata={minimalLinkDetailsContainingASmartCard}/>

        </FilmstripView>
      </div>
    );
  }

}

export default () => <Story/>;
