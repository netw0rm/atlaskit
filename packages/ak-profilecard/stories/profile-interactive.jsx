import avatarImage from 'file!./data/2.jpg';
import { action } from '@kadira/storybook';
import uid from 'uid';

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
      email: '',
      presence: 'available',
      fullName: 'Natalie Lindsey',
      nickname: 'natalie',
      meta: 'Senior Developer',
      location: 'Sydney, Australia',
      timeString: getTimeString(),

      hasWeekday: false,
      hasAvatar: true,
      hasMeta: true,
      hasLocation: true,
      hasTime: true,
      hasLongName: false,
      hasLongRole: false,
      hasAltActions: false,
    }

    actions = [
      {
        label: 'View profile',
        callback: handleActionClick('View profile'),
      },
    ]

    createCheckboxBooleanAttribute(attribute) {
      const id = `label-${uid()}`;
      return (
        <label htmlFor={id}>
          <input
            id={id}
            type="checkbox"
            onChange={() => this.setState({ [attribute]: !this.state[attribute] })}
            checked={this.state[attribute]}
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
            id={id}
            type="radio"
            onChange={() => this.setState({ presence: attribute })}
            checked={this.state.presence === attribute}
          />
          {attribute}
        </label>
      );
    }

    render() {
      const customActions = [
        { label: 'Foo', callback: handleActionClick('Foo') },
        { label: 'Bar', callback: handleActionClick('Bar') },
        { label: 'Baz', callback: handleActionClick('Baz') },
      ];

      const actions = this.state.hasAltActions ? customActions : this.actions;

      const meta = this.state.hasLongRole ?
        'Sed do eiusmod tempor incididunt ut labore' :
        this.state.meta;

      /* eslint-disable max-len */
      return (
        <div>
          <style>{'label {margin-right: 10px; -webkit-user-select: none;} legend {margin: 5px 0;}'}</style>

          <AkProfilecard
            avatarUrl={this.state.hasAvatar ? this.state.avatarUrl : ''}
            email={this.state.email}
            fullName={this.state.hasLongName ? `${this.state.fullName} Hathaway ${this.state.fullName}` : this.state.fullName}
            nickname={this.state.nickname}
            companyName={this.state.company}
            meta={this.state.hasMeta ? meta : ''}
            timestring={this.state.hasTime ? getTimeString(this.state.hasWeekday) : ''}
            location={this.state.hasLocation ? this.state.location : ''}
            presence={this.state.presence}
            actions={actions}
          />

          <div>
            <br />
            <legend>
              {this.createCheckboxBooleanAttribute('hasAvatar')}
              {this.createCheckboxBooleanAttribute('hasAltActions')}
              {this.createCheckboxBooleanAttribute('hasWeekday')}
              <br />
              {this.createCheckboxBooleanAttribute('hasMeta')}
              {this.createCheckboxBooleanAttribute('hasLocation')}
              {this.createCheckboxBooleanAttribute('hasTime')}
              <br />
              {this.createCheckboxBooleanAttribute('hasLongName')}
              {this.createCheckboxBooleanAttribute('hasLongRole')}
            </legend>
            <legend>
              {this.createRadioPresenceAttribute('available')}
              {this.createRadioPresenceAttribute('busy')}
              {this.createRadioPresenceAttribute('unavailable')}
              {this.createRadioPresenceAttribute('none')}
            </legend>
          </div>

        </div>
      );
    }
  }

  return ProfilecardInteractive;
}
