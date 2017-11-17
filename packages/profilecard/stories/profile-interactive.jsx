import avatarImage from 'file!./data/2.jpg';
import { action } from '@kadira/storybook';
import uid from 'uid';
import styled from 'styled-components';
import {
  AtlasKitThemeProvider,
  colors,
  themed,
} from '@atlaskit/theme';

const StoryWrapper = styled.div`
  label {
    color: ${themed({ light: colors.N800, dark: colors.N0 })};
    margin-right: 10px;
    -webkit-user-select: none;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    float: left;
  }
`;

const handleActionClick = title => action(`${title} button clicked`);

const random = int => Math.floor(Math.random() * (int + 1));

const getTimeString = (showWeekday) => {
  const minFormat = new Intl.NumberFormat('us-EN', { minimumIntegerDigits: 2 });
  const hours = random(23);
  const minutes = random(59);
  const meridiem = ['am', 'pm'][Math.floor(hours / 12)];
  const weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][random(6)];
  const weekdayStr = showWeekday ? `${weekday} ` : '';

  return `${weekdayStr}${hours === 0 ? 12 : hours % 12}:${minFormat.format(minutes)}${meridiem}`;
};

export default function interActiveCard(dependencies) {
  const { React, AkProfilecard } = dependencies;

  class ProfilecardInteractive extends React.PureComponent {
    state = {
      avatarUrl: avatarImage,
      email: 'nlindsey@example.com',
      presence: 'available',
      fullName: 'Natalie Lindsey',
      nickname: 'natalie',
      meta: 'Senior Developer',
      location: 'Sydney, Australia',
      timeString: getTimeString(),

      isBot: false,
      isActive: true,
      isCensored: false,

      hasDarkTheme: false,
      hasWeekday: false,
      hasAvatar: true,
      hasMeta: true,
      hasLocation: true,
      hasTime: true,
      hasLongName: false,
      hasLongRole: false,
      hasAltActions: false,
      hasNoActions: false,
      hasLoadingState: false,
      hasErrorState: false,
    }

    actions = [
      {
        label: 'View profile',
        id: 'view-profile',
        callback: handleActionClick('View profile'),
      },
    ]

    createCheckboxBooleanAttribute(attribute) {
      const id = `label-${uid()}`;
      return (
        <label htmlFor={id}>
          <input
            checked={this.state[attribute]}
            id={id}
            onChange={() => this.setState({ [attribute]: !this.state[attribute] })}
            type="checkbox"
          />
          {attribute}
        </label>
      );
    }

    createRadioPresenceAttribute(attribute) {
      const id = `label-${uid()}`;
      return (
        <label htmlFor={id}>
          <input
            checked={this.state.presence === attribute}
            id={id}
            onChange={() => this.setState({ presence: attribute })}
            type="radio"
          />
          {attribute}
        </label>
      );
    }

    render() {
      const customActions = [
        { label: 'Foo', id: 'foo', callback: handleActionClick('Foo') },
        { label: 'Bar', id: 'bar', callback: handleActionClick('Bar') },
        { label: 'Baz', id: 'baz', callback: handleActionClick('Baz') },
      ];

      const actions = this.state.hasAltActions ? customActions : this.actions;

      const meta = this.state.hasLongRole ?
        'Sed do eiusmod tempor incididunt ut labore' :
        this.state.meta;

      /* eslint-disable max-len */
      return (
        <AtlasKitThemeProvider
          mode={this.state.hasDarkTheme ? 'dark' : 'light'}
        >
          <StoryWrapper>
            <AkProfilecard
              isLoading={this.state.hasLoadingState}
              hasError={this.state.hasErrorState}
              actions={this.state.hasNoActions ? [] : actions}
              isBot={this.state.isBot}
              isActive={this.state.isActive}
              isCensored={this.state.isCensored}
              avatarUrl={this.state.hasAvatar ? this.state.avatarUrl : ''}
              companyName={this.state.company}
              email={this.state.email}
              fullName={this.state.hasLongName ? `${this.state.fullName} Hathaway ${this.state.fullName}` : this.state.fullName}
              location={this.state.hasLocation ? this.state.location : ''}
              meta={this.state.hasMeta ? meta : ''}
              nickname={this.state.nickname}
              presence={this.state.presence}
              timestring={this.state.hasTime ? getTimeString(this.state.hasWeekday) : ''}
              clientFetchProfile={handleActionClick('Retry')}
            />

            <div style={{ marginTop: '16px' }}>
              <ul>
                <li>{this.createCheckboxBooleanAttribute('hasAvatar')}</li>
                <li>{this.createCheckboxBooleanAttribute('hasAltActions')}</li>
                <li>{this.createCheckboxBooleanAttribute('hasNoActions')}</li>
                <li>{this.createCheckboxBooleanAttribute('hasMeta')}</li>
                <li>{this.createCheckboxBooleanAttribute('hasLocation')}</li>
                <li>{this.createCheckboxBooleanAttribute('hasTime')}</li>
              </ul>

              <ul>
                <li>{this.createCheckboxBooleanAttribute('hasLongName')}</li>
                <li>{this.createCheckboxBooleanAttribute('hasLongRole')}</li>
                <li>{this.createCheckboxBooleanAttribute('hasWeekday')}</li>
              </ul>

              <ul>
                <li>{this.createCheckboxBooleanAttribute('hasLoadingState')}</li>
                <li>{this.createCheckboxBooleanAttribute('hasErrorState')}</li>
                <li>{this.createCheckboxBooleanAttribute('isBot')}</li>
                <li>{this.createCheckboxBooleanAttribute('isActive')}</li>
                <li>{this.createCheckboxBooleanAttribute('isCensored')}</li>
                <li>{this.createCheckboxBooleanAttribute('hasDarkTheme')}</li>
              </ul>

              <ul>
                <li>{this.createRadioPresenceAttribute('available')}</li>
                <li>{this.createRadioPresenceAttribute('busy')}</li>
                <li>{this.createRadioPresenceAttribute('unavailable')}</li>
                <li>{this.createRadioPresenceAttribute('focus')}</li>
                <li>{this.createRadioPresenceAttribute('none')}</li>
              </ul>
            </div>

          </StoryWrapper>
        </AtlasKitThemeProvider>
      );
    }
  }

  return ProfilecardInteractive;
}
