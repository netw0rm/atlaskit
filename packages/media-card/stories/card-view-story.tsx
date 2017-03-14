import * as React from 'react';
import {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {CardView} from '../src';
import {tallImage, wideImage, wideTransparentImage, smallImage} from './images';
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

storiesOf('CardView', {})
  .add('Ellipsify', () => (
    <StoryList>
      {[{
        title: 'ellipsis on long title',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum laoreet pellentesque tellus, a malesuada mauris laoreet sit amet. Donec vel purus odio. Aliquam pretium nulla non tellus viverra, eu commodo risus ornare. Curabitur rhoncus neque vitae volutpat pretium. Aliquam eu sollicitudin lorem. Sed vitae ante eu magna egestas venenatis dignissim."
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: 'html entity escaping',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="<script>alert('foo');</script>"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImage}
          onClick={onClick}
        />
      }]}
    </StoryList>
  ))
  .add('Media types', () => (
    <StoryList>
      {[{
        title: 'Image type',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my image.png"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: 'Image type, no preview',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="image with no preview.png"
          mediaType="image"
          mediaSize={32831}
          dataURI={undefined}
          onClick={onClick}
        />
      }, {
        title: 'Video type',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my video.mpg"
          mediaType="video"
          mediaSize={32831}
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: 'Doc type',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my doc.docx"
          mediaType="doc"
          mediaSize={32831}
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: 'Audio type',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my audio file.mp3"
          mediaType="audio"
          mediaSize={32831}
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: 'Unknown type',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my unknown file.kpf"
          mediaType="unknown"
          mediaSize={32831}
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
      }]}
    </StoryList>
  ))
  .add('No preview', () => (
    <StoryList>
      {[{
        title: 'Image',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="No preview image"
          mediaType="image"
          mediaSize={32831}
          dataURI={null}
          onClick={onClick}
        />
      }, {
        title: 'Video',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="No preview video"
          mediaType="video"
          mediaSize={32831}
          dataURI={null}
          onClick={onClick}
        />
      }, {
        title: 'Audio',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="No preview audio"
          mediaType="audio"
          mediaSize={32831}
          dataURI={null}
          onClick={onClick}
        />
      }, {
        title: 'Video + menu actions',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="No preview audio"
          mediaType="video"
          mediaSize={32831}
          dataURI={null}
          onClick={onClick}
          menuActions={menuActions}
        />
      }]}
    </StoryList>
  ))
  .add('Selectable', () => {
    class SelectableWrapper extends Component<{}, {}> {
      constructor(props) {
        super(props);
        this.state = {selected: false};
      }

      toggleSelection = () => {
        this.setState({selected: !this.state.selected});
      }

      render() {
        return <CardView
          loading={false}
          selectable={true}
          selected={this.state.selected}
          mediaName="No preview image"
          mediaType="image"
          mediaSize={32831}
          dataURI={wideImage}
          onClick={this.toggleSelection}
        />;
      }
    }

    return <StoryList>
      {[{
        title: 'Not selected',
        content: <CardView
          loading={false}
          selectable={true}
          selected={false}
          mediaName="Select me please"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: 'Selected',
        content: <CardView
          loading={false}
          selectable={true}
          selected={true}
          mediaName="Im a selected card"
          mediaType="image"
          mediaSize={32831}
          dataURI={wideImage}
          onClick={onClick}
        />
      }, {
        title: 'Selected + menu actions',
        content: <CardView
          loading={false}
          selectable={true}
          selected={true}
          mediaName="Selected with actions"
          mediaType="image"
          mediaSize={32831}
          dataURI={wideTransparentImage}
          onClick={onClick}
          menuActions={menuActions}
        />
      }, {
        title: 'Not selected + menu actions',
        content: <CardView
          loading={false}
          selectable={true}
          selected={false}
          mediaName="Not selected with actions"
          mediaType="image"
          mediaSize={32831}
          dataURI={smallImage}
          onClick={onClick}
          menuActions={menuActions}
        />
      }, {
        title: 'No URI + selected',
        content: <CardView
          loading={false}
          selectable={true}
          selected={true}
          mediaName="I have no URI :("
          mediaType="image"
          mediaSize={32831}
          dataURI={null}
          onClick={onClick}
        />
      }, {
        title: 'No URI + unselected',
        content: <CardView
          loading={false}
          selectable={true}
          selected={false}
          mediaName="I have no URI :("
          mediaType="image"
          mediaSize={32831}
          dataURI={null}
          onClick={onClick}
        />
      }, {
        title: 'No URI + unselected + menu actions',
        content: <CardView
          loading={false}
          selectable={true}
          selected={false}
          mediaName="🌋 👽"
          mediaType="image"
          mediaSize={32831}
          dataURI={null}
          onClick={onClick}
          menuActions={menuActions}
        />
      }, {
        title: 'No URI + selected + menu actions',
        content: <CardView
          loading={false}
          selectable={true}
          selected={true}
          mediaName="😵🤖"
          mediaType="image"
          mediaSize={32831}
          dataURI={null}
          onClick={onClick}
          menuActions={menuActions}
        />
      }, {
        title: 'Handle state change',
        content: <SelectableWrapper />
      }]}
    </StoryList>;
  })
  .add('Different name lengths', () => (
    <StoryList>
      {[{
        title: 'Short name',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="My awesome file.tsx"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: '2 lines name',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="Hey guys this is my awesome file.tsx"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: 'Long name',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="Lorem ipsum Nulla veniam exercitation duis sit ut in sed consectetur dolore cupidatat ut pariatur.js"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: 'Large width',
        content: <CardView
          width={380}
          loading={false}
          selectable={false}
          selected={false}
          mediaName="Lorem ipsum nulla veniam exercitation duis sit ut in sed consectetur dolore cupidatat ut pariatur.json"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: 'Long name with large width',
        content: <CardView
          width={380}
          loading={false}
          selectable={false}
          selected={false}
          mediaName="Lorem ipsum nulla veniam exercitation duis sit ut in sed consectetur dolore cupidatat sedconsectetur dolore cupidatat seddolore cupidatat sed sed consectetur dolore cupidatat ut pariatur.json"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImage}
          onClick={onClick}
        />
      }]}
    </StoryList>
  ))
  .add('Custom sized', () => (
    <CardView
      height={250}
      width={380}
      loading={false}
      selectable={false}
      selected={false}
      mediaName="some image"
      mediaType="image"
      mediaSize={32831}
      dataURI={tallImage}
      onClick={onClick}
    />
  ))
  .add('Different file sizes', () => (
    <StoryList>
      {[{
        title: 'File size: bytes',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my image.png"
          mediaType="image"
          mediaSize={100} // 100 B
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: 'File size: kB',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my image.png"
          mediaType="image"
          mediaSize={153600} // 150 kB
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: 'File size: MB',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my image.png"
          mediaType="image"
          mediaSize={12897490} // 12.3 MB
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: 'File size: GB',
        content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my image.png"
          mediaType="image"
          mediaSize={1395864375} // 1.3 GB
          dataURI={tallImage}
          onClick={onClick}
        />
      }]}
    </StoryList>
  ))
  .add('With Progress', () => (
    <CardView
      loading={false}
      selectable={false}
      selected={false}
      mediaName="with_progress.png"
      mediaType="image"
      mediaSize={32831}
      dataURI={tallImage}
      progress={0.5}
      onClick={onClick}
    />
  ))
  .add('Loading states', () => {
    interface LoadingWrapperState {
      loading: boolean;
    }

    class LoadingWrapper extends Component<{}, LoadingWrapperState> {
      interval: number;

      constructor(props) {
        super(props);
        this.state = {loading: true};
      }

      componentDidMount() {
        this.interval = window.setTimeout(() => this.setState({loading: false}), 1000);
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }

      render() {
        return <CardView
          loading={this.state.loading}
          selectable={false}
          selected={false}
          mediaName="loading.png"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImage}
          onClick={onClick}
        />;
      }
    }

    return <StoryList>
      {[{
        title: 'Infinite loading',
        content: <CardView
          loading={true}
          selectable={false}
          selected={false}
          mediaName="loading.png"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: 'Loading 1sec',
        content: <LoadingWrapper />
      }]}
    </StoryList>;
  })
  .add('Menu action', () => (
    <StoryList>
       {[{
         title: 'Default',
         content: <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my image.png"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImage}
          onClick={onClick}
          menuActions={menuActions}
         />
       }]}
    </StoryList>
  ))
  .add('Error', () => (
    <CardView
      mediaName="with_progress.wav"
      mediaType="audio"
      mediaSize={32831}
      onClick={onClick}
      error={'Could not load file'}
    />
  ))
  .add('Error with long name', () => (
    <CardView
      mediaName="Screen_shot_2016_at_10.45.32_AM.jpg"
      mediaType="image"
      mediaSize={32831}
      onClick={onClick}
      error={'Could not load file'}
    />
  ))
  .add('Error with long name and spaces', () => (
    <CardView
      mediaName="Screen Shot 2016 at 10.45.32 AM.jpg"
      mediaType="image"
      mediaSize={32831}
      onClick={onClick}
      error={'Could not load file'}
    />
  ))
  .add('Error with handler, menu actions', () => (
    <CardView
      mediaName="with_progress.wav"
      mediaType="audio"
      mediaSize={32831}
      onClick={onClick}
      error={'Could not load file'}
      onRetry={{handler: onRetry}}
      menuActions={menuActions}
    />
  ))
  .add('Error with handler, menu actions, custom size', () => (
    <CardView
      height={250}
      width={380}
      mediaName="with_progress.wav"
      mediaType="audio"
      mediaSize={32831}
      onClick={onClick}
      error={'Could not load file'}
      onRetry={{handler: onRetry}}
      menuActions={menuActions}
    />
  ))
  .add('Error with handler, no menu actions', () => (
    <CardView
      mediaName="with_progress.wav"
      mediaType="audio"
      mediaSize={32831}
      onClick={onClick}
      error={'Could not load file'}
      onRetry={{handler: onRetry}}
    />
  ));
