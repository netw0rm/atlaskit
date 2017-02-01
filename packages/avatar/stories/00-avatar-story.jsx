import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from '@atlaskit/util-readme';

import avatarStoryStyles from 'style!./stories.less';
import { name, description } from '../package.json';
import Avatar from '../src';

import AvatarOverviewExample from './examples/AvatarOverview'; // eslint-disable-line import/no-duplicates

/* eslint-disable import/first, import/no-duplicates */
import AvatarOverviewExampleRaw from '!raw!./examples/AvatarOverview';
/* eslint-enable import/first, import/no-duplicates */

const transparentAvatarUrl = require('url-loader!./face-w-transparency.png');
const tickUrl = require('url-loader!./tick.svg');
const tickWithBackgroundUrl = require('url-loader!./tick.png');

const avatarRowClass = avatarStoryStyles.rowOfAvatarsStory;
const storybookExampleClass = avatarStoryStyles.example;

const AllAvatarSizes = props => (
  <div className={avatarRowClass}>
    <Avatar size="small" {...props} />
    <Avatar size="medium" {...props} />
    <Avatar size="large" {...props} />
    <Avatar size="xlarge" {...props} />
  </div>
);

storiesOf(name, module)
  .add('Avatar — README', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={AvatarOverviewExampleRaw}>
          <AvatarOverviewExample />
        </Code>
        <Props component={Avatar} />
      </Readme>
    </div>
  ))
  .addCodeExampleStory('Avatar — docs example', () => <AvatarOverviewExample />, { scripts: [AvatarOverviewExampleRaw] })
  .add('Avatar — basic example', () => (
    <div>
      <p>By default an avatar should be medium sized and have no presence</p>
      <p><Avatar /></p>
    </div>
  ))
  .add('Avatar — transparency test', () => {
    const rainbowStyle = {
      background: 'linear-gradient(red, orange, yellow, green, blue, indigo, violet)',
      padding: '10px',
      marginTop: '10px',
    };
    const cubeStyle = {
      backgroundColor: '#556',
      // eslint-disable-next-line max-len
      backgroundImage: `linear-gradient(30deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),
      linear-gradient(150deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),
      linear-gradient(30deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),
      linear-gradient(150deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),
      linear-gradient(60deg, #99a 25%, transparent 25.5%, transparent 75%, #99a 75%, #99a),
      linear-gradient(60deg, #99a 25%, transparent 25.5%, transparent 75%, #99a 75%, #99a)`,
      backgroundSize: '80px 140px',
      backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
      padding: '10px',
      color: 'white',
    };
    const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='; // eslint-disable-line  max-len
    return (
      <div>
        <p>The below avatars are as follows:</p>
        <ul>
          <li>an avatar without any source image</li>
          <li>an avatar with a partially transparent image</li>
          <li>an avatar with a completely transparent image (use devtools to inspect)</li>
        </ul>
        <p>Note: there is no border around the images.</p>
        <div style={rainbowStyle}>
          <Avatar size="xlarge" />
          <Avatar size="xlarge" src={transparentAvatarUrl} />
          <Avatar size="xlarge" src={transparentPixel} />
        </div>
        <div style={cubeStyle}>
          <Avatar size="xlarge" />
          <Avatar size="xlarge" src={transparentAvatarUrl} />
          <Avatar size="xlarge" src={transparentPixel} />
        </div>
      </div>
    );
  })
  .add('Avatar — sizes', () => (
    <AllAvatarSizes />
  ))
  .add('Avatar — with online presence', () => (
    <div>
      <p>Presence icons should be allowed to be shown at any size,
        but are recommended only for <strong>medium</strong>
      </p>
      <AllAvatarSizes presence="online" />
    </div>
  ))
  .add('Avatar — various presences', () => (
    <div className={avatarRowClass}>
      <p>presence=&ldquo;none&rdquo; (default, same as not specifying it)</p>
      <p><Avatar size="large" presence="none" /></p>
      <p>presence=&ldquo;online&rdquo;</p>
      <p><Avatar size="large" presence="online" /></p>
      <p>presence=&ldquo;busy&rdquo;</p>
      <p><Avatar size="large" presence="busy" /></p>
      <p>presence=&ldquo;offline&rdquo;</p>
      <p><Avatar size="large" presence="offline" /></p>
    </div>
  ))
  .add('Avatar — custom presence', () => (
    <div>
      <p>
        As well as the presence attribute, avatars can also display custom content on their badge
        by composing them inside.
      </p>
      <p>
        No styling is applied to custom content by default, and it is up the consumer to make the
        content fit (height and width of 100% and a background color are a good start).
      </p>
      <div className={storybookExampleClass} >
        <div>
          These avatars have an image as their default content and have been styled
          with &quot;height: 100%; width: 100%;&quot;
        </div>
        <AllAvatarSizes>
          <img
            src={tickWithBackgroundUrl}
            role="presentation"
            style={{ height: '100%', width: '100%' }}
          />
        </AllAvatarSizes>
      </div>
      <div className={storybookExampleClass} >
        <div>
          These avatars show the behaviour of transparent nested images.
          Note there is no added background color
        </div>
        <AllAvatarSizes>
          <img
            src={tickUrl}
            role="presentation"
            style={{ height: '100%', width: '100%', color: 'green' }}
          />
        </AllAvatarSizes>
      </div>
      <div className={storybookExampleClass} >
        <div>
          These avatars have presence AND an image as a child. The expected behaviour is that the
          images will take precedence.
        </div>
        <AllAvatarSizes presence="online">
          <img
            src={tickWithBackgroundUrl}
            role="presentation"
            style={{ height: '100%', width: '100%' }}
          />
        </AllAvatarSizes>
      </div>
      <div className={storybookExampleClass} >
        <div>
          This example shows using a styled div as a presence.
        </div>
        <AllAvatarSizes presence="online">
          <div
            style={{
              background: 'linear-gradient(90deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)',
              height: '100%',
              width: '100%',
            }}
          />
        </AllAvatarSizes>
      </div>
      <div className={storybookExampleClass} >
        <div>
          Another example showing a styled div as the inserted content
        </div>
        <AllAvatarSizes presence="online">
          <div
            style={{
              background: 'blue',
              color: 'white',
              height: '100%',
              width: '100%',
            }}
          >
            <div
              style={{
                height: 'inherit',
                position: 'relative',
              }}
            >
              <span
                style={{
                  left: '50%',
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                  top: '50%',
                }}
              >
                ?
              </span>
            </div>
          </div>
        </AllAvatarSizes>
      </div>
    </div>
  ))
  .add('Avatar — from external source', () => {
    class ExternalSrcAvatar extends React.PureComponent {
      constructor(props) {
        super(props);
        this.changeUrl = this.changeUrl.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.state = {
          url: 'https://design.atlassian.com/images/avatars/project-128.png',
          avatar: <Avatar size="xlarge" label="This is an avatar!" />,
        };
      }
      loadImage(e) {
        e.preventDefault();
        this.setState({
          avatar: <Avatar size="xlarge" label="This is an avatar!" src={this.state.url} />,
        });
      }
      changeUrl(event) {
        this.setState({ url: event.target.value });
      }
      render() {
        return (
          <div>
            <form onSubmit={this.loadImage}>
              <label htmlFor="avatarUrl">
                <span>URL:</span>
                <input
                  type="text"
                  style={{ marginTop: '10px', width: '30em' }}
                  defaultValue={this.state.url}
                  onChange={this.changeUrl}
                />
                <button>Load Image</button>
              </label>
            </form>
            {this.state.avatar}
          </div>
        );
      }
    }

    return (
      <div className={avatarRowClass}>
        <p>Try loading an image from an external source to see the loading behaviour.</p>
        <ExternalSrcAvatar />
      </div>
    );
  })
  .add('Avatar — labels', () => (
    <div className={avatarRowClass}>
      <p>
        Just as the <code>alt</code> attribute is important on images, the <code>label</code> prop
        is important for avatars. The <code>label</code> prop allows you to convey information to
        people using a screen reader or other assistive technology.
      </p>
      <p>
        The text &ldquo;This is an avatar!&rdquo; should be read aloud when you tab to the below
        link-wrapped avatar while using a screen reader.
      </p>
      <p>
        <a href="http://www.atlassian.com">
          <Avatar size="xlarge" label="This is an avatar!" />
        </a>
      </p>
    </div>
  ))
  .add('Avatar — presence border color', () => (
    <div style={{ padding: '20px', backgroundColor: '#3a77d8' }}>
      <p style={{ color: 'white' }}>presenceBorderColor=&ldquo;black&rdquo;</p>
      <p>
        <Avatar size="xlarge" presence="online" presenceBorderColor="black" />
      </p>
      <p style={{ color: 'white' }}>presenceBorderColor=&ldquo;#3a77d8&rdquo;</p>
      <p>
        <Avatar size="xlarge" presence="offline" presenceBorderColor="#3a77d8" />
      </p>
    </div>
  ));
