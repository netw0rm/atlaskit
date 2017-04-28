import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { name } from '../package.json';
import Avatar from '../src';
import nucleusImage from './nucleus.png';
import lockImage from './lock.png';
import { AvatarRow, Example } from './styled';

const transparentAvatarUrl = require('url-loader!./face-w-transparency.png');
const tickUrl = require('url-loader!./tick.svg');
const tickWithBackgroundUrl = require('url-loader!./tick.png');

const DefaultAvatar = props => (
  <div style={{ display: 'inline-block', marginLeft: '10px' }}>
    <Avatar {...props} />
  </div>
);

const AllAvatarSizes = props => (
  <AvatarRow>
    <DefaultAvatar size="xsmall" {...props} />
    <DefaultAvatar size="small" {...props} />
    <DefaultAvatar size="medium" {...props} />
    <DefaultAvatar size="large" {...props} />
    <DefaultAvatar size="xlarge" {...props} />
  </AvatarRow>
);

storiesOf(name, module)
  .add('A default avatar', () => (
    <div>
      <p>By default an avatar should be medium sized and have no presence</p>
      <DefaultAvatar />
    </div>
  ))
  .add('Avatars on colored background', () => {
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
        <div>
          Here we have a xlarge avatar, an avatar with partial transparency, and a completely
          transparent image. No border is shown around them.
        </div>
        <div style={rainbowStyle}>
          <DefaultAvatar size="xlarge" />
          <DefaultAvatar size="xlarge" src={transparentAvatarUrl} />
          <DefaultAvatar size="xlarge" src={transparentPixel} />
        </div>
        <div style={cubeStyle}>
          <DefaultAvatar size="xlarge" />
          <DefaultAvatar size="xlarge" src={transparentAvatarUrl} />
          <DefaultAvatar size="xlarge" src={transparentPixel} />
        </div>
      </div>
    );
  })
  .add('All avatar sizes', () => (
    <AllAvatarSizes />
  ))
  .add('All avatars with online presence', () => (
    <div>
      <div>Presence icons should be allowed to be shown at any size,
        but are recommended only for <strong>medium</strong>
      </div>
      <div><b>Edit:</b> Presence icons should not be shown for the xsmall size</div>
      <AllAvatarSizes presence="online" />
    </div>
  ))
  .add('All presences', () => (
    <AvatarRow>
      <DefaultAvatar size="large" presence="none" />
      <DefaultAvatar size="large" presence="online" />
      <DefaultAvatar size="large" presence="busy" />
      <DefaultAvatar size="large" presence="offline" />
    </AvatarRow>
  ))
  .add('Square avatars', () => {
    const lock = <img src={lockImage} style={{ height: '100%', width: '100%' }} alt="Lock" />;
    return (
      <Example>
        <DefaultAvatar
          appearance="square"
          icon={lock}
          size="xsmall"
          src={nucleusImage}
        />
        <DefaultAvatar
          appearance="square"
          icon={lock}
          size="small"
          src={nucleusImage}
        />
        <DefaultAvatar
          appearance="square"
          icon={lock}
          size="medium"
          src={nucleusImage}
        />
        <DefaultAvatar
          appearance="square"
          icon={lock}
          size="large"
          src={nucleusImage}
        />
        <DefaultAvatar
          appearance="square"
          icon={lock}
          size="xlarge"
          src={nucleusImage}
        />
      </Example>
    );
  })
  .add('Avatars with custom presence', () => (
    <div>
      <div>As well as the presence attribute, avatars can also display custom content on their badge
        by composing them inside. <br />
        No styling is applied to custom content by default and it is up the consumer to make the
        content fit (height and width of 100% and a background color
        are a good start)
      </div>
      <Example>
        <div>
          These avatars have an image as their default content and have been styled
          with &quot;height: 100%; width: 100%;&quot;
        </div>
        <AllAvatarSizes
          icon={
            <img
              src={tickWithBackgroundUrl}
              role="presentation"
              style={{ height: '100%', width: '100%' }}
            />
          }
        />
      </Example>
      <Example>
        <div>
          These avatars show the behaviour of transparent nested images.
          Note there is no added background color
        </div>
        <AllAvatarSizes
          icon={
            <img
              src={tickUrl}
              role="presentation"
              style={{ height: '100%', width: '100%', color: 'green' }}
            />
          }
        />
      </Example>
      <Example>
        <div>
          These avatars have presence AND an image as a child. The expected behaviour is that the
          images will take precedence.
        </div>
        <AllAvatarSizes
          icon={
            <img
              src={tickWithBackgroundUrl}
              role="presentation"
              style={{ height: '100%', width: '100%' }}
            />
          }
          presence="online"
        />
      </Example>
      <Example>
        <div>
          This example shows using a styled div as a presence.
        </div>
        <AllAvatarSizes
          icon={
            <div
              style={{
                backgroundColor: 'green',
                height: '100%',
                width: '100%',
                textAlign: 'center',
                color: 'white',
                marginTop: '1px',
                lineHeight: '100%',
                fontSize: '1em',
              }}
            >
              1
            </div>
          }
          presence="online"
        />
      </Example>
      <Example>
        <div>
          This example shows using a styled div as a presence on a square avatar.
        </div>
        <AllAvatarSizes
          appearance="square"
          src={nucleusImage}
          icon={
            <div
              style={{
                backgroundColor: 'green',
                height: '100%',
                width: '100%',
                textAlign: 'center',
                color: 'white',
                lineHeight: '100%',
                fontSize: '1em',
              }}
            >
              1
            </div>
          }
          presence="online"
        />
      </Example>
      <Example>
        <AllAvatarSizes presence="online">
          <img
            src={tickWithBackgroundUrl}
            role="presentation"
            style={{ height: '100%', width: '100%' }}
          />
        </AllAvatarSizes>
      </Example>
      <Example>
        <div>
          This example shows using a styled div as a presence.
        </div>
        <AllAvatarSizes presence="online">
          <div
            style={{
              backgroundColor: 'green',
              height: '100%',
              width: '100%',
              textAlign: 'center',
              color: 'white',
              marginTop: '1px',
              lineHeight: '100%',
              fontSize: '1em',
            }}
          >
            1
          </div>
        </AllAvatarSizes>
      </Example>
      <Example>
        <div>
          Another example showing a styled div as the inserted content
        </div>
        <AllAvatarSizes
          icon={
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'grey',
                display: 'inline-block',
              }}
            >
              <div
                style={{
                  width: '60%',
                  height: '20%',
                  background: 'red',
                  position: 'relative',
                  top: '45%',
                  left: '20%',
                  transform: 'rotate(50deg)',
                }}
              />
            </div>
          }
          presence="online"
        />
      </Example>
    </div>
  ))
  .add('Avatar loaded from external source', () => {
    class ExternalSrcAvatar extends React.PureComponent {
      constructor(props) {
        super(props);
        this.changeUrl = this.changeUrl.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.state = {
          url: 'https://docs.atlassian.com/aui/latest/docs/images/avatar-96.png',
          avatar: <DefaultAvatar size="xlarge" label="This is an avatar!" />,
        };
      }
      loadImage() {
        this.setState({
          avatar: <DefaultAvatar size="xlarge" label="This is an avatar!" src={this.state.url} />,
        });
      }
      changeUrl(event) {
        this.setState({ url: event.target.value });
      }
      render() {
        return (
          <div>
            <div>
              <label htmlFor="avatarUrl">
                <span>URL:</span>
                <input
                  type="text"
                  style={{ marginTop: '10px' }}
                  defaultValue={this.state.url}
                  onChange={this.changeUrl}
                />
                <input type="button" value="Load Image" onClick={this.loadImage} />
              </label>
            </div>
            {this.state.avatar}
          </div>
        );
      }
    }

    return (
      <AvatarRow>
        <div>
          Try loading an image from an external source to see the loading behaviour.
        </div>
        <ExternalSrcAvatar />
      </AvatarRow>
    );
  })
  .add('Avatar with a label', () => (
    <AvatarRow>
      <div>
        This image should have an aria-label that should be read out when tabbing to the link
          around it and also an alt text.
      </div>
      <a href="//www.atlassian.com"><DefaultAvatar size="xlarge" label="This is an avatar!" /></a>
    </AvatarRow>
  ))
  .addCodeExampleStory('Avatar with a custom border', () => (
    <div style={{ padding: '20px', backgroundColor: '#3a77d8' }}>
      <DefaultAvatar size="xlarge" presence="online" presenceBorderColor="#3a77d8" />
      <DefaultAvatar size="xlarge" presence="offline" presenceBorderColor="#3a77d8" />
      <DefaultAvatar
        src={nucleusImage}
        appearance="square"
        size="xlarge"
        icon={<img src={lockImage} style={{ height: '100%', width: '100%' }} alt="Lock" />}
        presenceBorderColor="#3a77d8"
      />
    </div>
  ));
