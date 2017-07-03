import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import ArrowDown from '@atlaskit/icon/glyph/arrow-down';
import ArrowUp from '@atlaskit/icon/glyph/arrow-up';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';
import Lozenge from '@atlaskit/lozenge';
import { akColorPrimary1, akColorPrimary2, akColorPrimary3, akColorN20 } from '@atlaskit/util-shared-styles';

import { name } from '../package.json';
import Avatar, { AvatarGroup } from '../src';
import { omit } from '../src/utils';
import nucleusImage from './nucleus.png';
import { AvatarCol, AvatarRow, DivPresence, Example, Note, Wrapper } from './styled';
import { AVATAR_SIZES } from '../src/styled/constants';

const avatarSource = 'https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg';
const tickUrl = require('url-loader!./tick.svg');

const HR = () => (
  <div style={{ border: 0, borderTop: '1px solid #ccc', marginBottom: '1em', marginTop: '1em' }} />
);
const DefaultAvatar = props => <AvatarCol><Avatar {...props} /></AvatarCol>;
const SquareAvatar = props => <DefaultAvatar appearance="square" {...props} />;
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
const AllAvatarSizes = (props) => {
  const modifiedProps = omit(props, 'icon', 'presence', 'status');
  return (
    <AvatarRow>
      <DefaultAvatar size="xxlarge" {...modifiedProps} />
      <DefaultAvatar size="xlarge" {...props} />
      <DefaultAvatar size="large" {...props} />
      <DefaultAvatar size="medium" {...props} />
      <DefaultAvatar size="small" {...props} />
      <DefaultAvatar size="xsmall" {...modifiedProps} />
    </AvatarRow>
  );
};

storiesOf(name, module)
  .add('Circle Avatars', () => (
    <Wrapper>
      <h5>Default</h5>
      <Note>&quot;medium&quot; size &mdash; no &quot;presence&quot;, or &quot;status&quot;</Note>
      <Avatar />

      <h5>With Presence</h5>
      <Note>Supports &quot;busy&quot;, &quot;offline&quot;, and &quot;online&quot;</Note>
      <AvatarRow>
        <DefaultAvatar src={avatarSource} size="large" />
        <DefaultAvatar src={avatarSource} size="large" presence="busy" />
        <DefaultAvatar src={avatarSource} size="large" presence="offline" />
        <DefaultAvatar src={avatarSource} size="large" presence="online" />
      </AvatarRow>

      <h5>All Sizes with Presence</h5>
      <Note>Sizes &quot;xsmall&quot; and &quot;xxlarge&quot; do NOT support Presence</Note>
      <AllAvatarSizes src={avatarSource} presence="online" />

      <h5>With Status</h5>
      <Note>Supports &quot;approved&quot;, &quot;declined&quot;, and &quot;locked&quot;</Note>
      <AvatarRow>
        <DefaultAvatar src={avatarSource} size="large" />
        <DefaultAvatar src={avatarSource} size="large" status="approved" />
        <DefaultAvatar src={avatarSource} size="large" status="declined" />
        <DefaultAvatar src={avatarSource} size="large" status="locked" />
      </AvatarRow>

      <h5>All Sizes with Status</h5>
      <Note>Sizes &quot;xsmall&quot; and &quot;xxlarge&quot; do NOT support Status</Note>
      <AllAvatarSizes src={avatarSource} status="approved" />
    </Wrapper>
  ))
  .add('Square Avatars', () => (
    <Wrapper>
      <h5>Default</h5>
      <Note>&quot;medium&quot; size &mdash; no &quot;presence&quot;, or &quot;status&quot;</Note>
      <AvatarRow>
        <SquareAvatar />
      </AvatarRow>

      <h5>With Presence</h5>
      <Note>Supports &quot;busy&quot;, &quot;offline&quot;, and &quot;online&quot;</Note>
      <AvatarRow>
        <SquareAvatar src={nucleusImage} size="large" />
        <SquareAvatar src={nucleusImage} size="large" presence="busy" />
        <SquareAvatar src={nucleusImage} size="large" presence="offline" />
        <SquareAvatar src={nucleusImage} size="large" presence="online" />
      </AvatarRow>

      <h5>All Sizes with Presence</h5>
      <Note>Sizes &quot;xsmall&quot; and &quot;xxlarge&quot; do NOT support Presence</Note>
      <AllAvatarSizes appearance="square" presence="online" src={nucleusImage} />

      <h5>With Status</h5>
      <Note>Supports &quot;approved&quot;, &quot;declined&quot;, and &quot;locked&quot;</Note>
      <AvatarRow>
        <SquareAvatar src={nucleusImage} size="large" />
        <SquareAvatar src={nucleusImage} size="large" status="approved" />
        <SquareAvatar src={nucleusImage} size="large" status="declined" />
        <SquareAvatar src={nucleusImage} size="large" status="locked" />
      </AvatarRow>

      <h5>All Sizes with Status</h5>
      <Note>Sizes &quot;xsmall&quot; and &quot;xxlarge&quot; do NOT support Status</Note>
      <AllAvatarSizes
        appearance="square"
        status="approved"
        src={nucleusImage}
      />
    </Wrapper>
    ))
  .add('Coloured Backgrounds', () => {
    const colors = [akColorPrimary1, akColorPrimary2, akColorN20, akColorPrimary3];
    const presences = [null, 'online', 'offline', 'busy'];
    const statuses = [null, 'approved', 'locked', 'declined'];
    const styles = {
      column: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
      },
      row: {
        alignItems: 'stretch',
        display: 'flex',
        height: 192,
        justifyContent: 'stretch',
        marginTop: '1em',
      },
    };
    const ColorColumn = props => (
      <div style={{ ...styles.column, backgroundColor: props.borderColor }}>
        <Avatar onClick={console.log} {...props} size="xlarge" />
        <Avatar onClick={console.log} {...props} />
      </div>
    );
    return (
      <Wrapper>
        <h4>Coloured Backgrounds</h4>
        <Note>
          Using the <code>borderColor</code> prop we can have avatars on any background color.
          Try focusing the avatars to see how the focus ring interacts with the background color.
        </Note>
        <div style={styles.row}>
          {colors.map((c, i) => (
            <ColorColumn key={i} borderColor={c} src={avatarSource} presence={presences[i]} />
          ))}
        </div>
        <div style={styles.row}>
          {colors.map((c, i) => (
            <ColorColumn key={i} borderColor={c} src={nucleusImage} appearance="square" status={statuses[i]} />
          ))}
        </div>
      </Wrapper>
    );
  })
  .add('Interactive Avatars', () => {
    const stackSourceURLs = [];
    const avatarSize = 'large';

    for (let i = 0; i < 20; i++) stackSourceURLs.push(i);

    return (
      <Wrapper>
        <h2>Interactive Avatars <Lozenge appearance="success" isBold>New</Lozenge></h2>
        <Note size="large">
          For most instances you will no-longer need to wrap <code>{'<Avatar/>'}</code>.
        </Note>
        <AvatarShowcase title="Button" description={<span>Provide <code>onClick</code> to {'<Avatar/>'} or <code>onClickAvatar</code> to {'<AvatarGroup/>'}</span>}>
          <Avatar src={avatarSource} onClick={console.info} size={avatarSize} />
        </AvatarShowcase>

        <AvatarShowcase title="Anchor" description={<span>Provide <code>href</code> to {'<Avatar/>'}</span>}>
          <Avatar
            href="http://atlaskit.atlassian.com"
            src={avatarSource}
            size={avatarSize}
            target="_blank"
          />
        </AvatarShowcase>

        <AvatarShowcase title="Tooltip" description={<span>Provide <code>name</code> to {'<Avatar/>'}</span>}>
          <Avatar src={avatarSource} name="Bill Murray" size={avatarSize} />
        </AvatarShowcase>

        <HR />

        <h5>Avatar States</h5>
        <Note>All states handled internal and can be provided by props.</Note>
        <AvatarShowcase title="Default" description="No state applied">
          <Avatar src={avatarSource} size="large" onClick={() => {}} label="default" />
        </AvatarShowcase>
        <AvatarShowcase title="Hover" description="akColorN70A applied as an overlay">
          <Avatar src={avatarSource} size="large" onClick={() => {}} isHover />
        </AvatarShowcase>
        <AvatarShowcase title="Active" description="akColorN70A applied as an overlay, and scaled down to 85%">
          <Avatar src={avatarSource} size="large" onClick={() => {}} isActive />
        </AvatarShowcase>
        <AvatarShowcase title="Focus" description="akColorB200 focus ring applied, border-width relative to avatar size">
          <Avatar src={avatarSource} size="large" onClick={() => {}} isFocus />
        </AvatarShowcase>
        <AvatarShowcase title="Selected" description="akColorN200A applied as an overlay">
          <Avatar src={avatarSource} size="large" onClick={() => {}} isSelected />
        </AvatarShowcase>
        <AvatarShowcase title="Disabled" description="70% white applied as an overlay">
          <Avatar src={avatarSource} size="large" onClick={() => {}} isDisabled />
        </AvatarShowcase>
      </Wrapper>
    );
  })
  .addCodeExampleStory('Avatar Tooltips', () => (
    <Wrapper>
      <h2>Avatar Tooltips <Lozenge appearance="success" isBold>New</Lozenge></h2>
      <Note size="large">
        Image receives alt-text and an aria-label, which describes the image to screenreaders.
      </Note>
      <Avatar
        href="//www.atlassian.com"
        name="Tooltip & Alt text"
        size="xlarge"
        src={avatarSource}
        target="_blank"
      />
    </Wrapper>
  ))
  .add('Avatar Groups', () => {
    class AvatarGroupExample extends Component {
      state = { gridWidth: 200, gridMax: 11, avatarCount: 20, sizeIndex: 2 }
      sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']
      limit = {
        gridMax: 30,
      }
      decrement = key => this.setState(state => ({ [key]: state[key] - 1 }))
      increment = key => this.setState(state => ({ [key]: state[key] + 1 }))
      render() {
        const { avatarCount, sizeIndex, gridMax, gridWidth } = this.state;
        const sizes = Object.keys(AVATAR_SIZES);
        const avatarSize = sizes[sizeIndex];
        const avatarPX = AVATAR_SIZES[avatarSize];

        const stackSourceURLs = [];
        for (let i = 0; i < avatarCount; i++) stackSourceURLs.push(i);

        return (
          <Wrapper>
            <h2>Avatar Groups <Lozenge appearance="success" isBold>New</Lozenge></h2>
            <Note size="large">Click the excess indicator to see the remaining avatars in a dropdown menu.</Note>
            <div style={{ display: 'flex', marginTop: '1em' }}>
              <div style={{ flex: 1 }}>
                <h5 style={{ marginBottom: '0.5em' }}>Avatar Size: {avatarSize}</h5>
                <ButtonGroup>
                  <Button isDisabled={avatarSize === 'small'} onClick={() => this.decrement('sizeIndex')} iconBefore={<ArrowDown size="small" label="Smaller" />}>Smaller</Button>
                  <Button isDisabled={avatarSize === 'xlarge'} onClick={() => this.increment('sizeIndex')} iconBefore={<ArrowUp size="small" label="Larger" />}>Larger</Button>
                </ButtonGroup>
              </div>
              <div style={{ flex: 1 }}>
                <h5 style={{ marginBottom: '0.5em' }}>Avatar Count: {avatarCount}</h5>
                <ButtonGroup>
                  <Button isDisabled={avatarCount <= 1} onClick={() => this.decrement('avatarCount')} iconBefore={<ArrowDown size="small" label="Less" />}>Less</Button>
                  <Button isDisabled={avatarCount >= 30} onClick={() => this.increment('avatarCount')} iconBefore={<ArrowUp size="small" label="More" />}>More</Button>
                </ButtonGroup>
              </div>
              <div style={{ flex: 1 }}>
                <h5 style={{ marginBottom: '0.5em' }}>Grid Max: {gridMax}</h5>
                <ButtonGroup>
                  <Button isDisabled={gridMax <= 1} onClick={() => this.decrement('gridMax')} iconBefore={<ArrowDown size="small" label="Less" />}>Less</Button>
                  <Button isDisabled={gridMax >= 30} onClick={() => this.increment('gridMax')} iconBefore={<ArrowUp size="small" label="More" />}>More</Button>
                </ButtonGroup>
              </div>
            </div>
            <h5>Grid</h5>
            <Note>
              Total {stackSourceURLs.length} / Max {gridMax}
            </Note>
            <input
              min="200"
              max="500"
              onChange={e => this.setState({ gridWidth: e.target.value })}
              step="10"
              title="Grid Width"
              type="range"
            />
            <div style={{ maxWidth: parseInt(gridWidth, 10), position: 'relative' }}>
              <AvatarGroup
                appearance="grid"
                onClickAvatar={console.log}
                onClickDropdownItem={console.log}
                // onClickMore={() => console.log('Click more "grid".')}
                data={stackSourceURLs.map(i => ({
                  key: i,
                  name: `Adorable Avatar ${i + 1}`,
                  src: `https://api.adorable.io/avatars/${avatarPX}/grid_${i}.png`,
                }))}
                maxCount={gridMax}
                size={avatarSize}
              />
              <span style={{ borderLeft: '1px solid #ccc', paddingLeft: '1em', fontSize: 11, position: 'absolute', right: 0, top: 0, color: '#999', transform: 'translateX(100%)' }}>{gridWidth}px</span>
            </div>
            <h5>Stack</h5>
            <Note>Total {stackSourceURLs.length} / Max 5</Note>
            <AvatarGroup
              onClickAvatar={console.log}
              onClickDropdownItem={console.log}
              // onClickMore={() => console.log('Click more "stack".')}
              data={stackSourceURLs.map(i => ({
                key: i,
                name: `Adorable Avatar ${i + 1}`,
                src: `https://api.adorable.io/avatars/${avatarPX}/stack_${i}.png`,
              }))}
              size={avatarSize}
            />
          </Wrapper>
        );
      }
    }
    return <AvatarGroupExample />;
  })
  .add('Loading an Image', () => {
    function getInitialState() {
      return {
        inputValue: 'https://pbs.twimg.com/profile_images/568401563538841600/2eTVtXXO_400x400.jpeg',
        imageUrl: '',
      };
    }

    const backgroundColor = akColorN20;
    const Btn = props => <button type="button" style={{ marginLeft: 5 }} {...props} />;

    // eslint-disable-next-line react/no-multi-comp
    class ExternalSrcAvatar extends React.PureComponent {
      state = getInitialState()
      changeUrl = event => this.setState({ inputValue: event.target.value })
      loadImage = (event) => {
        event.preventDefault();
        this.setState({ imageUrl: this.state.inputValue });
      }
      resetState = () => this.setState(getInitialState)
      render() {
        const { inputValue, imageUrl } = this.state;
        let avatarName = 'Default Avatar';
        if (imageUrl === getInitialState().inputValue) avatarName = 'Mike Cannon-Brookes';
        else if (imageUrl.length) avatarName = 'Custom Avatar';

        return (
          <form onSubmit={this.loadImage}>
            <div style={{ display: 'flex', marginBottom: '10px', marginTop: '10px' }}>
              <input
                onChange={this.changeUrl}
                style={{ flex: 1 }}
                type="text"
                value={inputValue}
              />
              <Btn type="submit">Load Image</Btn>
              <Btn onClick={this.resetState}>Reset</Btn>
            </div>
            <Avatar
              borderColor={backgroundColor}
              name={avatarName}
              size="xlarge"
              src={imageUrl}
            />
          </form>
        );
      }
    }

    return (
      <Wrapper style={{ backgroundColor }}>
        <h5>Loading an Image</h5>
        <Note>Try pasting a URL to see the loading behaviour:</Note>
        <ExternalSrcAvatar />
      </Wrapper>
    );
  })
  .add('Custom Presence', () => (
    <Wrapper>
      <h5>Custom Presence</h5>
      <Note>
        Replace presence with the <code>icon</code> property
      </Note>
      <Example>
        <h5>Image</h5>
        <Note>Using an image as the icon</Note>
        <AllAvatarSizes
          icon={<img role="presentation" src={tickUrl} style={{ height: '100%', width: '100%' }} />}
        />
      </Example>
      <Example>
        <h5>Div on Circle</h5>
        <Note>This example shows using a styled div as a presence.</Note>
        <AllAvatarSizes
          icon={<DivPresence>1</DivPresence>}
        />
      </Example>
      <Example>
        <h5>Div on Square</h5>
        <Note>This example shows using a styled div as a presence on a square avatar.</Note>
        <AllAvatarSizes
          appearance="square"
          icon={<DivPresence>1</DivPresence>}
        />
      </Example>
    </Wrapper>
  ));
