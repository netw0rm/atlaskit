import 'akutil-polyfills';
import chai, { expect } from 'chai';
import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import { getMonthName } from '../src/util';

import Calendar from '../src';
import Announcer from '../src/index.Announcer';
import DateComponent from '../src/index.Date';

chai.use(chaiEnzyme());

const now = new Date();
const nowMonth = now.getMonth() + 1;
const nowYear = now.getFullYear();

describe(name, () => {
  it('should render the component', () => {
    const wrapper = shallow(<Calendar />);
    expect(wrapper).to.be.present();
    expect(wrapper.find(Announcer)).to.have.lengthOf(1);
    expect(wrapper.find(DateComponent)).to.be.present();
  });

  it('should highlight current date', () => {
    const wrapper = shallow(<Calendar />);
    expect(wrapper.find('caption div').at(1))
      .to.include.text(`${getMonthName(nowMonth)} ${nowYear}`);
  });

  it('should call onSelect', (done) => {
    const wrapper = shallow(<Calendar
      onSelect={({ day, month, year }) => {
        expect(day).to.equal(5);
        expect(month).to.equal(nowMonth);
        expect(year).to.equal(nowYear);
        done();
      }}
    />);
    wrapper.find({ day: 5, sibling: false }).simulate('click');
  });

  it('selected days should have selected class', () => {
    const wrapper = shallow(<Calendar
      month={1}
      year={2016}
      selected={['2016-01-01']}
    />);

    const selected = wrapper.find({
      day: 1,
      selected: true,
      sibling: false,
    });
    expect(selected).to.have.lengthOf(1);
  });
});
