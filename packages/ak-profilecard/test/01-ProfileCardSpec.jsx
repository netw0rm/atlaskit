import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';
import styles from '../src/styles/profilecard.less';

import { AkProfilecard } from '../src';
import presences from '../src/internal/presences';

const { expect } = chai;
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('ak-profilecard', () => {
  describe('AkProfilecard', () => {
    it('should be possible to create a component', () => {
      const card = shallow(<AkProfilecard />);
      expect(card).to.exist;
    });

    describe('fullName property', () => {
      const fullName = 'This is an avatar!';
      const card = shallow(<AkProfilecard fullName={fullName} />);

      it('should show the full name on the card if property is set', () => {
        const el = card.find(`.${styles.locals.detailsFullname}`);
        expect(el).to.have.text(fullName);
      });

      it('should render empty element for full name if not set', () => {
        card.setProps({ fullName: undefined });
        const el = card.find(`.${styles.locals.detailsFullname}`);
        expect(el).to.be.blank();
      });
    });

    describe('presence property', () => {
      describe('presence properties should render label', () => {
        const presenceWithoutNone = Object.keys(presences).filter(p => p !== 'none');

        presenceWithoutNone.forEach((presence) => {
          it(`should render label with content ${presence}`, () => {
            const card = mount(<AkProfilecard presence={presence} />);
            const el = card.find(`.${styles.locals.presence}`);
            expect(el).to.be.present();
            expect(el).to.have.text(presences[presence]);
          });
        });
      });

      it('should not render a presence label if property is not set', () => {
        const card = mount(<AkProfilecard />);
        const el = card.find(`.${styles.locals.presence}`);
        expect(el).to.not.be.present();
      });
    });

    describe('actions property', () => {
      const actions = [
        {
          label: 'one',
        },
        {
          label: 'two',
        },
        {
          label: 'three',
        },
      ];
      const card = shallow(<AkProfilecard actions={actions} />);

      it('should render an action button for every item in actions property', () => {
        const actionsWrapper = card.find(`.${styles.locals.actionsWrapper}`);
        const buttonTexts = card.find('AkButton').children().map(node => node.text());

        expect(actionsWrapper.children()).to.have.length(actions.length);
        expect(buttonTexts).to.eql(actions.map(action => action.label));
      });

      it('should call callback handler when action button is clicked', () => {
        const spy = sinon.spy();
        card.setProps({ actions: [{
          label: 'test',
          callback: spy,
        }] });
        const actionsWrapper = card.find(`.${styles.locals.actionsWrapper}`);
        actionsWrapper.find('AkButton').first().simulate('click');
        expect(spy).to.have.been.calledOnce;
      });

      it('should not render any action buttons if actions property is not set', () => {
        card.setProps({ actions: undefined });
        const actionsWrapper = card.find(`.${styles.locals.actionsWrapper}`);
        expect(actionsWrapper.children().length).to.equal(0);
      });
    });
  });
});
