import { mount } from 'enzyme';
import React from 'react';
import SecondaryActions from '../src/components/js/SecondaryActions';

describe('<SecondaryActions />', () => {
  describe('renders', () => {
    it('renders accountItem when passed', () => {
      // eslint-disable-next-line
      const accountItem = ({ appearance }) => <span className="ACCOUNT_ITEM">{appearance}</span>;
      expect(mount(<SecondaryActions accountItem={accountItem} appearance="appearance prop" />)
        .contains(accountItem({ appearance: 'appearance prop' }))).to.equal(true);
    });
    it('renders helpItem when passed', () => {
      // eslint-disable-next-line
      const helpItem = ({ appearance }) => <span className="HELP_ITEM">{appearance}</span>;
      expect(mount(<SecondaryActions helpItem={helpItem} appearance="appearance prop" />)
        .contains(helpItem({ appearance: 'appearance prop' }))).to.equal(true);
    });
  });
});
