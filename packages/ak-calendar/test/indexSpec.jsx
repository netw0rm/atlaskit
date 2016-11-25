import 'akutil-polyfills';
import chai, { expect } from 'chai';
import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import { getMonthName } from '../src/util';

import { name } from '../package.json';
import { AkCalendar } from '../src';
import Announcer from '../src/Announcer';
import DateComponent from '../src/Date';

chai.use(chaiEnzyme());

const now = new Date();
const nowMonth = now.getMonth() + 1;
const nowYear = now.getFullYear();

describe(name, () => {
  it('should render the component', () => {
    const wrapper = shallow(<AkCalendar />);
    expect(wrapper).to.be.present();
    expect(wrapper.find(Announcer)).to.have.lengthOf(1);
    expect(wrapper.find(DateComponent)).to.be.present();
  });

  it('should highlight current date', () => {
    const wrapper = shallow(<AkCalendar />);
    expect(wrapper.find('div[aria-label="calendar"]').at(0))
      .to.include.text(`${getMonthName(nowMonth)} ${nowYear}`);
  });

  it('should call onSelect', (done) => {
    const wrapper = shallow(<AkCalendar
      month={1}
      year={2016}
      onSelect={({ day, month, year, iso }) => {
        expect(day).to.equal(1);
        expect(month).to.equal(1);
        expect(year).to.equal(2016);
        expect(iso).to.equal('2016-01-01');
        done();
      }}
    />);
    wrapper.find({ children: 1, sibling: false }).simulate('click', {
      day: 1,
      month: 1,
      year: 2016,
    });
  });

  it('specifying selected days should selecte the specified days', () => {
    const wrapper = shallow(<AkCalendar
      month={1}
      year={2016}
      selected={['2016-01-01', '2016-01-02']}
    />);

    expect(wrapper.find({
      children: 1,
      selected: true,
      sibling: false,
    })).to.have.lengthOf(1);

    expect(wrapper.find({
      children: 2,
      selected: true,
      sibling: false,
    })).to.have.lengthOf(1);
  });
});
