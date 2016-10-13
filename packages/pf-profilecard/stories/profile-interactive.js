import { action } from '@kadira/storybook';
import uid from 'uid';
import { getTimestampWithOffset } from '../src/util/datetime';

// TODO use img-loader
// eslint-disable-next-line max-len
const avatarImage = require('file!./data/2.jpg');

const handleActionClick = ev => action('Card action clicked')(JSON.stringify(ev.detail));

export default function interActiveCard(dependencies) {
  const { React, ProfileCard } = dependencies;

  const randomUtcOffset = () => {
    let num = Math.floor(Math.random() * 12) + 1;
    num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

    return num * 60;
  };

  const locationStates = {
    Past: () => -1920,
    Future: () => 1920,
    Random: () => randomUtcOffset(),
    Sydney: () => 600,
  };

  const locationsStrings = {
    Past: 'Somewhere, Past',
    Future: 'Anywhere, Future',
    Random: 'Random Place, World',
    Sydney: 'Sydney, Australia',
  };

  class ProfileCardInteractive extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        utcOffset: 600,
        use24h: false,
        avatarUrl: avatarImage,
        email: '',
        presence: 'online',
        fullname: 'Natalie Lindsey',
        mention: 'natalie',
        role: 'Senior Developer',
        location: 'Sydney',

        hasAvatar: true,
        hasMeta: true,
        hasLocation: true,
        hasTime: true,
        hasLongName: false,
        hasLongRole: false,
        hasAltActions: false,
      };

      this.actions = [
        {
          label: 'View',
          event: 'view',
        },
        {
          label: 'Chat',
          event: 'chat',
        },
      ];
    }

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

    createRadioLocationAttribute(attribute) {
      const id = `label-${uid()}`;
      return (
        <label htmlFor={id}>
          <input
            id={id}
            type="radio"
            onChange={() => this.setState({
              location: attribute,
              utcOffset: locationStates[attribute](),
            })}
            checked={this.state.location === attribute}
          />
          {attribute}
        </label>
      );
    }

    render() {
      const customActions = [
        { event: 'foo', label: 'Foo' },
        { event: 'bar', label: 'Bar' },
        { event: 'baz', label: 'Baz' },
      ];

      const actions = this.state.hasAltActions ? customActions : this.actions;

      const role = this.state.hasLongRole ?
        'Sed do eiusmod tempor incididunt ut labore' :
        this.state.role;

      /* eslint-disable max-len */
      return (
        <div>
          <style>{'label {margin-right: 10px; -webkit-user-select: none;} legend {margin: 5px 0;}'}</style>

          <ProfileCard
            timestamp={this.state.hasTime ? getTimestampWithOffset(this.state.utcOffset) : null}
            use24h={this.state.use24h}
            avatarUrl={this.state.hasAvatar ? this.state.avatarUrl : ''}
            email={this.state.email}
            presence={this.state.presence}
            fullname={this.state.hasLongName ? `${this.state.fullname} Hathaway` : this.state.fullname}
            mention={this.state.mention}
            company={this.state.company}
            meta={this.state.hasMeta ? role : ''}
            location={this.state.hasLocation ? locationsStrings[this.state.location] : ''}
            actions={actions}
            onAction={handleActionClick}
          />

          <div>
            <br />
            <legend>
              {this.createCheckboxBooleanAttribute('use24h')}
              {this.createCheckboxBooleanAttribute('hasAvatar')}
              {this.createCheckboxBooleanAttribute('hasAltActions')}
              <br />
              {this.createCheckboxBooleanAttribute('hasMeta')}
              {this.createCheckboxBooleanAttribute('hasLocation')}
              {this.createCheckboxBooleanAttribute('hasTime')}
              <br />
              {this.createCheckboxBooleanAttribute('hasLongName')}
              {this.createCheckboxBooleanAttribute('hasLongRole')}
            </legend>
            <legend>
              {this.createRadioPresenceAttribute('online')}
              {this.createRadioPresenceAttribute('busy')}
              {this.createRadioPresenceAttribute('offline')}
              {this.createRadioPresenceAttribute('none')}
            </legend>
            <legend>
              {this.createRadioLocationAttribute('Past')}
              {this.createRadioLocationAttribute('Future')}
              {this.createRadioLocationAttribute('Random')}
              {this.createRadioLocationAttribute('Sydney')}
            </legend>
          </div>

        </div>
      );
    }
  }

  return ProfileCardInteractive;
}
