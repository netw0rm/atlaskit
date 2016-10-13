import { props } from 'skatejs';
import { waitUntil, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { name } from '../package.json';
import ProfileCard from '../src/index';
import {
  // getTimestampWithOffset,
  // formatWeekdayString,
  // formatTimeString,
  getTimeLabel,
} from '../src/util/datetime';
// import shadowStyles from '../src/wc/pf-profilecard-shadow.less';
// const styles = shadowStyles.locals;

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
const getActionButtons = (component) => (getShadowRoot(component).querySelectorAll('ak-button'));

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
    expect(newComponent.timestamp).to.equal(0, 'timestamp');
    expect(newComponent.use24h).to.equal(false, 'use24');
    expect(newComponent.actions).to.be.empty;

    ['avatarUrl', 'fullname', 'meta', 'nickname', 'location'].forEach((key) => {
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
          component.getAttribute('presence') === 'offline'
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

  describe('timestamp property', () => {
    it('should accept number and number strings as number', () => {
      ['100', 200].forEach((timestamp) => {
        props(component, { timestamp });
        expect(component.timestamp).to.equal(parseInt(timestamp, 10));
      });
    });

    it('should default to 0 on falsy values', () => {
      [undefined, null, false].forEach((timestamp) => {
        props(component, { timestamp });
        expect(component.timestamp).to.equal(0);
      });
    });

    it('should reject other values as undefined', () => {
      ['foo', [1, 2], NaN].forEach((timestamp) => {
        props(component, { timestamp });
        expect(component.timestamp).to.equal(undefined);
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

  describe('datetime.js helpers', () => {
    describe('#getTimeLabel()', () => {
      it('should return only time when timestamp matches current day', () => {
        const now = new Date();
        now.setHours(0);
        now.setMinutes(0);

        const ts = Math.floor(now.getTime() / 1000);
        expect(getTimeLabel(ts, true)).to.equal('00:00');
        expect(getTimeLabel(ts, false)).to.equal('12:00am');
      });

      it('should return weekday and time when timestamp does not match current day', () => {
        const now = new Date(2016, 4, 1, 8, 0, 0);

        const ts = Math.floor(now.getTime() / 1000);
        expect(getTimeLabel(ts, true)).to.equal('Sun 08:00');
        expect(getTimeLabel(ts, false)).to.equal('Sun 8:00am');
      });
    });
  });
});
