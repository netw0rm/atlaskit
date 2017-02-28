import * as React from 'react';
import {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {CardView} from '../src';
import tallImageDataUri from './tall-image';
import styles from './styles';

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
  .add('Media types', () => (
    <ul style={styles.statesWrapper}>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>Image type</div>
        <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my image.png"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>Image type, no preview</div>
        <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="image with no preview.png"
          mediaType="image"
          mediaSize={32831}
          dataURI={null}
          onClick={onClick}
        />
      </li>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>Video type</div>
        <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my video.mpg"
          mediaType="video"
          mediaSize={32831}
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>Doc type</div>
        <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my doc.docx"
          mediaType="doc"
          mediaSize={32831}
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>Audio type</div>
        <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my audio file.mp3"
          mediaType="audio"
          mediaSize={32831}
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>Unknown type</div>
        <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my unknown file.kpf"
          mediaType="unknown"
          mediaSize={32831}
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
    </ul>
  ))
  .add('Different name lengths', () => (
    <ul style={styles.statesWrapper}>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>Sort name</div>
        <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="My awesome file.tsx"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>2 lines name</div>
        <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="Hey guys this is my awesome file.tsx"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>Long name</div>
        <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="Lorem ipsum Nulla veniam exercitation duis sit ut in sed consectetur dolore cupidatat ut pariatur.js"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>Large width</div>
        <CardView
          width={380}
          loading={false}
          selectable={false}
          selected={false}
          mediaName="Lorem ipsum nulla veniam exercitation duis sit ut in sed consectetur dolore cupidatat ut pariatur.json"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>Long name with large width</div>
        <CardView
          width={380}
          loading={false}
          selectable={false}
          selected={false}
          mediaName="Lorem ipsum nulla veniam exercitation duis sit ut in sed consectetur dolore cupidatat sedconsectetur dolore cupidatat seddolore cupidatat sed sed consectetur dolore cupidatat ut pariatur.json"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
    </ul>
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
      dataURI={tallImageDataUri}
      onClick={onClick}
    />
  ))
  .add('Different file sizes', () => (
    <ul style={styles.statesWrapper}>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>File size: bytes</div>
        <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my image.png"
          mediaType="image"
          mediaSize={100} // 100 B
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>File size: kB</div>
        <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my image.png"
          mediaType="image"
          mediaSize={153600} // 150 kB
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>File size: MB</div>
        <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my image.png"
          mediaType="image"
          mediaSize={12897490} // 12.3 MB
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>File size: GB</div>
        <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="this is my image.png"
          mediaType="image"
          mediaSize={1395864375} // 1.3 GB
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
    </ul>
  ))
  .add('With Progress', () => (
    <CardView
      loading={false}
      selectable={false}
      selected={false}
      mediaName="with_progress.png"
      mediaType="image"
      mediaSize={32831}
      dataURI={tallImageDataUri}
      progress={0.5}
      onClick={onClick}
    />
  ))
  .add('Loading states', () => {
    class LoadingWrapper extends Component<{}, {}> {
      constructor(props) {
        super(props);
        this.state = {loading: true};
      }

      componentDidMount() {
        this.interval = setTimeout(() => this.setState({loading: false}), 1000);
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
          dataURI={tallImageDataUri}
          onClick={onClick}
        />;
      }
    }

    return <ul style={styles.statesWrapper}>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>Infinite loading</div>
        <CardView
          loading={true}
          selectable={false}
          selected={false}
          mediaName="loading.png"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>Loading 1sec</div>
        <LoadingWrapper />
      </li>
    </ul>;
  })
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
