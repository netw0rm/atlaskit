import chai from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';

import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

const Component = () => <div className="test">test</div>;

describe(name, () => {
  it('should work', () =>
    expect(mount(<Component />)).to.have.className('test')
  );
});
