import * as React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {CardViewSmall} from '../src';
import {tallImage, smallImage, smallTransparentImage, wideImage, wideTransparentImage} from './images';
import StoryList from './story-list';
import styles from './styles';

const onClick = (event: Event) => {
  action('click')();
};

const onRetry = () => {
  action('try again')();
};

storiesOf('CardViewSmall', {})
  .add('Document', () => (
    <CardViewSmall
      loading={false}
      mediaName="sea_creatures.mp3"
      mediaType="audio"
      mediaSize={32831}
      onClick={onClick}
    />
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
  .add('Loading', () => (
    <CardViewSmall
      loading={true}
      mediaName="annual_report_2016_06_32.doc"
      mediaType="doc"
      mediaSize={32831}
      onClick={onClick}
    />
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
    <ul style={styles.statesWrapper}>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>File size: B</div>
        <CardViewSmall
          loading={false}
          mediaName="nature.png"
          mediaType="image"
          mediaSize={100} // 100 B
          dataURI={tallImage}
          onClick={onClick}
        />
      </li>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>File size: kB</div>
        <CardViewSmall
          loading={false}
          mediaName="nature.png"
          mediaType="image"
          mediaSize={153600} // 150 kB
          dataURI={tallImage}
          onClick={onClick}
        />
      </li>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>File size: MB</div>
        <CardViewSmall
          loading={false}
          mediaName="nature.png"
          mediaType="image"
          mediaSize={12897490} // 12.3 MB
          dataURI={tallImage}
          onClick={onClick}
        />
      </li>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>File size: GB</div>
        <CardViewSmall
          loading={false}
          mediaName="nature.png"
          mediaType="image"
          mediaSize={1395864375} // 1.3 GB
          dataURI={tallImage}
          onClick={onClick}
        />
      </li>
    </ul>
  ));
