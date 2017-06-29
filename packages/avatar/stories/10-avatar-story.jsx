import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { name } from '../package.json';
import Avatar, { AvatarGroup } from '../src';
import nucleusImage from './nucleus.png';
import lockImage from './lock.png';
import { AvatarCol, AvatarColLabel, AvatarRow, DivPresence, Example, Note, Wrapper } from './styled';

const transparentAvatarUrl = require('url-loader!./face-w-transparency.png');
const tickUrl = require('url-loader!./tick.svg');
const tickWithBackgroundUrl = require('url-loader!./tick.png');

const DefaultAvatar = props => (
  <AvatarCol>
    <Avatar {...props} />
  </AvatarCol>
);
const SquareAvatar = props => (
  <AvatarCol>
    <Avatar appearance="square" src={nucleusImage} {...props} />
  </AvatarCol>
);
const AvatarShowcase = ({ children, description, title }) => (
  <div style={{ alignItems: 'center', display: 'flex', marginBottom: '1em' }}>
    <div style={{ marginRight: '1em' }}>
      {children}
    </div>
    <div style={{ flex: 1 }}>
      <h5>{title}</h5>
      <Note>{description}</Note>
    </div>
  </div>
);
const LabelledAvatar = ({ label, ...props }) => (
  <AvatarCol>
    <Avatar {...props} />
    <AvatarColLabel>{label}</AvatarColLabel>
  </AvatarCol>
);

const AllAvatarSizes = props => (
  <AvatarRow>
    <DefaultAvatar size="xxlarge" {...props} />
    <DefaultAvatar size="xlarge" {...props} />
    <DefaultAvatar size="large" {...props} />
    <DefaultAvatar size="medium" {...props} />
    <DefaultAvatar size="small" {...props} />
    <DefaultAvatar size="xsmall" {...props} />
  </AvatarRow>
);

const CustomAvatar = props => (
  <Avatar
    key={props.src}
    rel="noopener noreferrer"
    size="large"
    target="_blank"
    {...props}
  />
);

storiesOf(name, module)
  .add('Circle Avatars', () => (
    <Wrapper>
      <h5>Default</h5>
      <Note>&quot;medium&quot; size &mdash; no &quot;presence&quot;, or &quot;status&quot;</Note>
      <AvatarRow>
        <DefaultAvatar />
      </AvatarRow>

      <h5>With Presence</h5>
      <Note>Supports &quot;busy&quot;, &quot;offline&quot;, and &quot;online&quot;</Note>
      <AvatarRow>
        <DefaultAvatar size="large" />
        <DefaultAvatar size="large" presence="busy" />
        <DefaultAvatar size="large" presence="offline" />
        <DefaultAvatar size="large" presence="online" />
      </AvatarRow>

      <h5>All Sizes with Presence</h5>
      <Note>Sizes &quot;xsmall&quot; and &quot;xxlarge&quot; do NOT support Presence</Note>
      <AllAvatarSizes presence="online" />

      <h5>With Status</h5>
      <Note>Supports &quot;approved&quot;, &quot;declined&quot;, and &quot;locked&quot;</Note>
      <AvatarRow>
        <DefaultAvatar size="large" />
        <DefaultAvatar size="large" status="approved" />
        <DefaultAvatar size="large" status="declined" />
        <DefaultAvatar size="large" status="locked" />
      </AvatarRow>

      <h5>All Sizes with Status</h5>
      <Note>Sizes &quot;xsmall&quot; and &quot;xxlarge&quot; do NOT support Status</Note>
      <AllAvatarSizes status="approved" />
    </Wrapper>
  ))
  .add('Square Avatars', () => {
    const icon = <img alt="Lock" src={lockImage} style={{ height: '100%', width: '100%' }} />;

    return (
      <Wrapper>
        <h5>Default</h5>
        <Note>&quot;medium&quot; size &mdash; no &quot;presence&quot;, or &quot;status&quot;</Note>
        <AvatarRow>
          <SquareAvatar />
        </AvatarRow>

        <h5>With Presence</h5>
        <Note>Supports &quot;busy&quot;, &quot;offline&quot;, and &quot;online&quot;</Note>
        <AvatarRow>
          <SquareAvatar size="large" />
          <SquareAvatar size="large" presence="busy" />
          <SquareAvatar size="large" presence="offline" />
          <SquareAvatar size="large" presence="online" />
        </AvatarRow>

        <h5>With Custom Presence Icon</h5>
        <Note>Sizes &quot;xsmall&quot; and &quot;xxlarge&quot; do NOT support Presence</Note>
        <AllAvatarSizes
          appearance="square"
          icon={icon}
          src={nucleusImage}
        />

        <h5>With Status</h5>
        <Note>Supports &quot;approved&quot;, &quot;declined&quot;, and &quot;locked&quot;</Note>
        <AvatarRow>
          <SquareAvatar size="large" />
          <SquareAvatar size="large" status="approved" />
          <SquareAvatar size="large" status="declined" />
          <SquareAvatar size="large" status="locked" />
        </AvatarRow>

        <h5>All Status Sizes</h5>
        <Note>Sizes &quot;xsmall&quot; and &quot;xxlarge&quot; do NOT support Status</Note>
        <AllAvatarSizes
          appearance="square"
          status="approved"
          src={nucleusImage}
        />
      </Wrapper>
    );
  })
  .add('Avatar Groups', () => {
    const gridMax = 14;
    const stackSourceURLs = [];
    const avatarSize = 'medium';

    for (let i = 0; i < 20; i++) stackSourceURLs.push(i);

    return (
      <Wrapper>
        <h5>Avatar Groups</h5>
        <Note>{`Check sizes aren't being skewed - using "${avatarSize}".`}</Note>
        <Avatar size={avatarSize} />
        <h5>Grid</h5>
        <Note>Total {stackSourceURLs.length} / Max {gridMax}</Note>
        <AvatarGroup
          appearance="grid"
          data={stackSourceURLs.map(i => ({ src: `https://api.adorable.io/avatars/40/grid_${i}.png`, name: `Adorable Avatar ${i}` }))}
          maxCount={gridMax}
          size={avatarSize}
        />
        <h5>Stacked</h5>
        <Note>Total {stackSourceURLs.length} / Max 5</Note>
        <AvatarGroup
          data={stackSourceURLs.map(i => ({ src: `https://api.adorable.io/avatars/40/stack_${i}.png`, name: `Adorable Avatar ${i}` }))}
          onClickAvatar={console.info}
          onClickDropdownItem={console.info}
          size={avatarSize}
        />
        <h5>Custom Component for Avatar</h5>
        <Note>These Avatars are each wrapped in an anchor</Note>
        <AvatarGroup
          avatarComponent={CustomAvatar}
          data={stackSourceURLs.map(i => ({
            href: 'http://atlaskit.atlassian.com',
            name: `Adorable Avatar ${i}`,
            src: `https://api.adorable.io/avatars/40/render_${i}.png`,
            isSelected: i === 3,
            isDisabled: i === 2,
            target: '_blank',
            presence: 'busy',
          }))}
          onClickAvatar={item => console.info(item)}
          onClickDropdownItem={item => console.info(item)}
          size={avatarSize}
        />
      </Wrapper>
    );
  })
  .add('Avatar States', () => {
    const src = 'https://www.fillmurray.com/85/85';

    return (
      <Wrapper>
        <h5>Avatar States</h5>
        <Note>Side by side comparison. All descriptions below.</Note>
        <AvatarRow>
          <LabelledAvatar src={src} size="large" onClick={() => {}} label="default" />
          <LabelledAvatar src={src} size="large" onClick={() => {}} label="hover" isHover />
          <LabelledAvatar src={src} size="large" onClick={() => {}} label="active" isActive />
          <LabelledAvatar src={src} size="large" onClick={() => {}} label="focus" isFocus />
          <LabelledAvatar src={src} size="large" onClick={() => {}} label="selected" isSelected />
          <LabelledAvatar src={src} size="large" onClick={() => {}} label="disabled" isDisabled />
        </AvatarRow>
        <div style={{ border: 0, borderTop: '1px solid #ccc', marginBottom: '1em', marginTop: '1em' }} />
        <AvatarShowcase title="Default" description="No state applied">
          <Avatar src={src} size="large" onClick={() => {}} label="default" />
        </AvatarShowcase>
        <AvatarShowcase title="Hover" description="akColorN70A applied as an overlay">
          <Avatar src={src} size="large" onClick={() => {}} isHover />
        </AvatarShowcase>
        <AvatarShowcase title="Active" description="akColorN70A applied as an overlay, and scaled down to 85%">
          <Avatar src={src} size="large" onClick={() => {}} isActive />
        </AvatarShowcase>
        <AvatarShowcase title="Focus" description="akColorB200 focus ring applied, width depends relative to avatar size">
          <Avatar src={src} size="large" onClick={() => {}} isFocus />
        </AvatarShowcase>
        <AvatarShowcase title="Selected" description="akColorN200A applied as an overlay">
          <Avatar src={src} size="large" onClick={() => {}} isSelected />
        </AvatarShowcase>
        <AvatarShowcase title="Disabled" description="70% white applied as an overlay">
          <Avatar src={src} size="large" onClick={() => {}} isDisabled />
        </AvatarShowcase>
      </Wrapper>
    );
  })
  .add('Loading an Image', () => {
    function getInitialState() {
      return {
        inputValue: 'https://docs.atlassian.com/aui/latest/docs/images/avatar-96.png',
        imageUrl: '',
      };
    }

    const Button = props => <button type="button" style={{ marginLeft: 5 }} {...props} />;

    class ExternalSrcAvatar extends React.PureComponent {
      state = getInitialState()
      changeUrl = event => this.setState({ inputValue: event.target.value })
      loadImage = (event) => {
        event.preventDefault();
        this.setState({ imageUrl: this.state.inputValue });
      }
      resetState = () => this.setState(getInitialState)
      render() {
        return (
          <form onSubmit={this.loadImage}>
            <div style={{ display: 'flex', marginBottom: '10px', marginTop: '10px' }}>
              <input
                onChange={this.changeUrl}
                style={{ flex: 1 }}
                type="text"
                value={this.state.inputValue}
              />
              <Button type="submit">Load Image</Button>
              <Button onClick={this.resetState}>Reset</Button>
            </div>
            <DefaultAvatar size="xlarge" label="This is an avatar!" src={this.state.imageUrl} />
          </form>
        );
      }
    }

    return (
      <Wrapper>
        <h5>Loading an Image</h5>
        <Note>Try pasting a URL to see the loading behaviour:</Note>
        <ExternalSrcAvatar />
      </Wrapper>
    );
  })
  .add('With a Label', () => (
    <Wrapper style={{ backgroundColor: '#F4F5F7' }}>
      <h5>With a Label</h5>
      <Note>
        Image receives alt-text and an aria-label, which describes the image to screenreaders.
      </Note>
      <a href="//www.atlassian.com" target="_blank" rel="noopener noreferrer">
        <Avatar
          label="This is the avatar label"
          size="xlarge"
          src="https://pbs.twimg.com/profile_images/876950629507354624/ELcIuekN_400x400.jpg"
        />
      </a>
    </Wrapper>
  ))
  .add('Avatars with custom presence', () => (
    <Wrapper>
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
          icon={<DivPresence>1</DivPresence>}
          presence="online"
        />
      </Example>
      <Example>
        <div>
          This example shows using a styled div as a presence on a square avatar.
        </div>
        <AllAvatarSizes
          appearance="square"
          icon={<DivPresence>1</DivPresence>}
          presence="online"
          src={nucleusImage}
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
          <DivPresence>1</DivPresence>
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
    </Wrapper>
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
      <Wrapper>
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
      </Wrapper>
    );
  })
  .addCodeExampleStory('Avatar with a custom border', () => (
    <div style={{ padding: '20px', backgroundColor: '#3a77d8' }}>
      <DefaultAvatar size="xlarge" presence="online" borderColor="#3a77d8" />
      <DefaultAvatar size="xlarge" presence="offline" borderColor="#3a77d8" />
      <DefaultAvatar
        src={nucleusImage}
        appearance="square"
        size="xlarge"
        icon={<img src={lockImage} style={{ height: '100%', width: '100%' }} alt="Lock" />}
        borderColor="#3a77d8"
      />
    </div>
  ));
