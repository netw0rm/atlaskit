import { props } from 'skatejs';
import { waitUntil, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { name } from '../package.json';
import { ProfileCard } from '../src';
import { modifyResponse } from '../src/api/profile-client';
import shadowStyles from '../src/wc/pf-profilecard-shadow.less';

const styles = shadowStyles.locals;


chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

// Mock values
const presenceStates = [
  'none',
  'online',
  'busy',
  'offline',
];
const cardActions = [
  {
    event: 'view',
    label: 'View',
  },
  {
    event: 'chat',
    label: 'Chat',
  },
];

// Helper functions
const getActionButtons = component => (
  getShadowRoot(component)
  .querySelector(`.${styles.pfCardActions}`)
  .children
);

/* Create profile card in div, append to body and return reference to both.
   Ensure the component has been rendered before tests start */
function setupCard() {
  const component = new ProfileCard();
  const componentHasShadowRoot = () => !!getShadowRoot(component);
  component.src = '';
  document.body.appendChild(component);
  // We return a promise here so we can do more than just the default setting up
  return waitUntil(() => componentHasShadowRoot).then(() => component);
}

function tearDownCard(component) {
  document.body.removeChild(component);
}

describe('pf-profilecard', () => {
  let component;

  beforeEach(() => setupCard().then(newComponent => (component = newComponent)));
  afterEach(() => tearDownCard(component));

  it('should be possible to create a component', () => {
    let newComponent;

    expect(() => {
      newComponent = new ProfileCard();
    }).to.not.throw(Error);
    expect(newComponent.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });

  it('should have all the expected default properties after creation', () => {
    const newComponent = new ProfileCard();

    expect(newComponent.presence).to.equal('none', 'presence');
    expect(newComponent.actions).to.be.empty;

    ['avatarUrl', 'fullname', 'meta', 'nickname', 'location', 'timestring'].forEach((key) => {
      expect(newComponent[key]).to.equal('', key);
    });
  });

  describe('presence property', () => {
    presenceStates.forEach((presence) => {
      it(`should accept all valid values (presence = ${presence})`, () => {
        const presenceAttributeIsSet = () => (
          component.getAttribute('presence') === presence
        );
        props(component, { presence });

        return waitUntil(presenceAttributeIsSet).should.be.fulfilled;
      });
    });

    ['', 'gone', 'unavailable', 'here'].forEach((presence) => {
      it(`should revert to default value on invalid values (presence = ${presence})`, () => {
        const presenceAttributeIsSet = () => (
          component.getAttribute('presence') === 'none'
        );
        props(component, { presence });

        return waitUntil(presenceAttributeIsSet).should.be.fulfilled;
      });
    });
  });

  describe('fullname property', () => {
    it('should accept truthy values as strings', () => {
      [true, 'John', 12].forEach((fullname) => {
        props(component, { fullname });
        expect(component.fullname).to.equal(fullname.toString());
      });
    });

    it('should default to empty string on falsy values', () => {
      [undefined, null].forEach((fullname) => {
        props(component, { fullname });
        expect(component.fullname).to.equal('');
      });
    });
  });

  describe('nickname property', () => {
    it('should accept truthy values as strings', () => {
      ['foo', 'bar', 12].forEach((nickname) => {
        props(component, { nickname });
        expect(component.nickname).to.equal(nickname.toString());
      });
    });

    it('should default to empty string on falsy values', () => {
      [undefined, null].forEach((nickname) => {
        props(component, { nickname });
        expect(component.nickname).to.equal('');
      });
    });
  });

  describe('location property', () => {
    it('should accept truthy values as strings', () => {
      ['foo', 'bar', 12].forEach((location) => {
        props(component, { location });
        expect(component.location).to.equal(location.toString());
      });
    });

    it('should default to empty string on falsy values', () => {
      [undefined, null].forEach((location) => {
        props(component, { location });
        expect(component.location).to.equal('');
      });
    });
  });

  describe('timestring property', () => {
    it('should accept truthy values as strings', () => {
      ['foo', 'bar', 12].forEach((timestring) => {
        props(component, { timestring });
        expect(component.timestring).to.equal(timestring.toString());
      });
    });

    it('should default to empty string on falsy values', () => {
      [undefined, null].forEach((timestring) => {
        props(component, { timestring });
        expect(component.timestring).to.equal('');
      });
    });
  });

  describe('actions property', () => {
    it('should render ak-button components', () => {
      const ComponentIsRendered = () => (
        component.getAttribute('defined') !== false
      );

      props(component, { actions: cardActions });
      return waitUntil(ComponentIsRendered).then(() => {
        const buttons = getActionButtons(component);
        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal(cardActions[0].label);
        expect(buttons[1].textContent).to.equal(cardActions[1].label);
      });
    });
  });

  describe('profile-client', () => {
    describe('#modifyResponse', () => {
      it('should remove certain properties from the data object', () => {
        const data = {
          remoteWeekdayIndex: 'shouldberemoved',
          remoteWeekdayString: 'shouldberemoved',
          remoteTimeString: 'shouldberemoved',
          id: 'shouldberemoved',
        };

        const result = modifyResponse(data);

        expect(result.remoteWeekdayIndex).to.be.undefined;
        expect(result.remoteWeekdayString).to.be.undefined;
        expect(result.remoteTimeString).to.be.undefined;
        expect(result.id).to.be.undefined;
      });

      it('should rename "remoteTimeString" property to "timestring"', () => {
        const data = {
          remoteTimeString: '10:23am',
        };

        const result = modifyResponse(data);

        expect(result.timestring).to.equal('10:23am');
      });

      it('should not modify "timestring" property if remote and local date share the same weekday index', () => {
        const data = {
          remoteTimeString: '0:00pm',
          remoteWeekdayString: 'Mon',
          remoteWeekdayIndex: new Date().getDay().toString(),
        };

        const result = modifyResponse(data);

        expect(result.timestring).to.equal('0:00pm');
      });

      it('should prefix "timestring" property with weekday if local dates weekday index is different', () => {
        const data = {
          remoteTimeString: '0:00pm',
          remoteWeekdayString: 'Mon',
          remoteWeekdayIndex: 12,
        };

        const result = modifyResponse(data);

        expect(result.timestring).to.equal('Mon 0:00pm');
      });
    });
  });
});
