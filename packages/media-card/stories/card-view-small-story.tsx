import * as React from 'react';
import {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {CardViewSmall} from '../src';
import {tallImage, smallImage, smallTransparentImage, wideImage, wideTransparentImage} from './images';
import {StoryList} from '@atlaskit/media-test-helpers';

const onClick = (event: Event) => {
  action('click')();
};

const onRetry = () => {
  action('try again')();
};

const menuActions = [
  {label: 'Open', handler: () => { action('open')(); }},
  {label: 'Close', handler: () => { action('close')(); }}
];

class DelayedLoadingCard extends Component<{}, {}> {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  componentDidMount() {
    const delay = this.props.delay || 500;
    this.interval = setTimeout(() => this.setState({loading: false}), delay);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const dataURI = this.props.dataURI || tallImage;

    return <CardViewSmall
      loading={this.state.loading}
      mediaName="loading image"
      mediaType="image"
      mediaSize={32831}
      dataURI={dataURI}
      onClick={onClick}
    />;
  }
}

storiesOf('CardViewSmall', {})
  .add('Media types', () => (
    <StoryList>
      {[{
        title: 'audio',
        content: <div>
          <CardViewSmall
            loading={false}
            mediaName="sea_creatures_foo.mp3"
            mediaType="audio"
            mediaSize={32831}
            onClick={onClick}
          />
          <CardViewSmall
            loading={false}
            mediaName="sea_creatures.mp3"
            mediaType="audio"
            mediaSize={32831}
            dataURI={smallImage}
            onClick={onClick}
          />
        </div>
      }, {
        title: 'document',
        content: <div>
          <CardViewSmall
            loading={false}
            mediaName="sea_creatures.mp3"
            mediaType="doc"
            mediaSize={32831}
            onClick={onClick}
          />
          <CardViewSmall
            loading={false}
            mediaName="sea_creatures.mp3"
            mediaType="doc"
            mediaSize={32831}
            dataURI={smallImage}
            onClick={onClick}
          />
        </div>
      }, {
        title: 'video',
        content: <div>
          <CardViewSmall
            loading={false}
            mediaName="sea_creatures.mp3"
            mediaType="video"
            mediaSize={32831}
            onClick={onClick}
          />
          <CardViewSmall
            loading={false}
            mediaName="sea_creatures.mp3"
            mediaType="video"
            mediaSize={32831}
            dataURI={smallImage}
            onClick={onClick}
          />
        </div>
      }, {
        title: 'image',
        content: <div>
          <CardViewSmall
            loading={false}
            mediaName="sea_creatures.mp3"
            mediaType="image"
            mediaSize={32831}
            onClick={onClick}
          />
          <CardViewSmall
            loading={false}
            mediaName="sea_creatures.mp3"
            mediaType="image"
            mediaSize={32831}
            dataURI={smallImage}
            onClick={onClick}
          />
        </div>
      }, {
        title: 'unknown',
        content: <div>
          <CardViewSmall
            loading={false}
            mediaName="sea_creatures.mp3"
            mediaType="unknown"
            mediaSize={32831}
            onClick={onClick}
          />
          <CardViewSmall
            loading={false}
            mediaName="sea_creatures.mp3"
            mediaType="unknown"
            mediaSize={32831}
            dataURI={smallImage}
            onClick={onClick}
          />
        </div>
      }]}
    </StoryList>
  ))
  .add('Images', () => {
    const cards = [
      {
        title: 'Tall image',
        content: <CardViewSmall
                  loading={false}
                  mediaName="nature.png"
                  mediaType="image"
                  mediaSize={32831}
                  dataURI={tallImage}
                  onClick={onClick}
        />
      },
      {
        title: 'Small image',
        content: <CardViewSmall
          loading={false}
          mediaName="nature.png"
          mediaType="image"
          mediaSize={32831}
          dataURI={smallImage}
          onClick={onClick}
        />
      },
      {
        title: 'Small transparent image',
        content: <CardViewSmall
          loading={false}
          mediaName="nature.png"
          mediaType="image"
          mediaSize={32831}
          dataURI={smallTransparentImage}
          onClick={onClick}
        />
      },
      {
        title: 'Wide image',
        content: <CardViewSmall
          loading={false}
          mediaName="nature.png"
          mediaType="image"
          mediaSize={32831}
          dataURI={wideImage}
          onClick={onClick}
        />
      },
      {
        title: 'Wide transparent image',
        content: <CardViewSmall
          loading={false}
          mediaName="nature.png"
          mediaType="image"
          mediaSize={32831}
          dataURI={wideTransparentImage}
          onClick={onClick}
        />
      }
    ];

    return <StoryList>{cards}</StoryList>;
  })
  .add('Loading', () => {
    const loadingCards = Array.apply(null, {length: 10}).map((k, i) => {
      const delay = i * 100 + 1000;
      const dataURI = i % 2 === 0 ? tallImage : smallTransparentImage;
      return <DelayedLoadingCard dataURI={dataURI} delay={delay}/>;
    });

    return <StoryList>
      {[{
        title: 'Infinite loading',
        content: <CardViewSmall
          loading={true}
          mediaName="annual_report_2016_06_32.doc"
          mediaType="doc"
          mediaSize={32831}
          onClick={onClick}
        />
      }, {
        title: 'Loading 1sec',
        content: <DelayedLoadingCard />
      }, {
        title: 'Multiple cards',
        content: loadingCards
      }]}
    </StoryList>;
  })
  .add('Menu actions', () => (
    <StoryList>
      {[{
        title: 'Default',
        content: <CardViewSmall
          loading={false}
          mediaName="sea_creatures.mp3"
          mediaType="audio"
          mediaSize={32831}
          onClick={onClick}
          menuActions={menuActions}
        />
      }]}
    </StoryList>
  ))
  .add('Error with handler', () => (
    <CardViewSmall
      onClick={onClick}
      error={'Could not load file'}
      onRetry={{handler: onRetry}}
    />
  ))
  .add('Error without handler', () => (
    <CardViewSmall
      onClick={onClick}
      error={'Could not load file'}
    />
  ))
  .add('Different file sizes', () => (
    <StoryList>
      {[{
        title: 'File size: B',
        content: <CardViewSmall
          loading={false}
          mediaName="nature.png"
          mediaType="image"
          mediaSize={100} // 100 B
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: 'File size: kB',
        content: <CardViewSmall
          loading={false}
          mediaName="nature.png"
          mediaType="image"
          mediaSize={153600} // 150 kB
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: 'File size: MB',
        content: <CardViewSmall
          loading={false}
          mediaName="nature.png"
          mediaType="image"
          mediaSize={12897490} // 12.3 MB
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: 'File size: GB',
        content: <CardViewSmall
          loading={false}
          mediaName="nature.png"
          mediaType="image"
          mediaSize={1395864375} // 1.3 GB
          dataURI={tallImage}
          onClick={onClick}
        />
      }]}
    </StoryList>
  ))
  .add('Mixed', () => (
    <StoryList>
      {[{
        title: 'Mixed cards',
        content: <div>
          <CardViewSmall
            loading={false}
            mediaName="sea_creatures.mp3"
            mediaType="audio"
            mediaSize={32831}
            onClick={onClick}
          />
          <CardViewSmall
            loading={true}
            mediaName="loading"
            mediaType="doc"
            mediaSize={32831}
            onClick={onClick}
          />
          <CardViewSmall
            loading={false}
            mediaName="video.mp4"
            mediaType="video"
            mediaSize={32831}
            onClick={onClick}
          />
          <CardViewSmall
            loading={false}
            mediaName="huge_image.png"
            mediaType="image"
            mediaSize={1395864375}
            dataURI={tallImage}
            onClick={onClick}
          />
          <CardViewSmall
            loading={false}
            mediaName="huge_image.png"
            mediaType="image"
            mediaSize={1395864375}
            onClick={onClick}
          />
          <DelayedLoadingCard />
          <CardViewSmall
            loading={false}
            mediaName="nature.png"
            mediaType="image"
            mediaSize={32831}
            dataURI={smallTransparentImage}
            onClick={onClick}
          />
          <DelayedLoadingCard delay={2500}/>
          <CardViewSmall
            loading={false}
            mediaName="nature.png"
            mediaType="image"
            mediaSize={32831}
            dataURI={wideImage}
            onClick={onClick}
          />
          <DelayedLoadingCard delay={2800} dataURI={wideImage}/>
          <CardViewSmall
            onClick={onClick}
            error={'Could not load file'}
            onRetry={{handler: onRetry}}
          />
        </div>
      }]}
    </StoryList>
  ));
