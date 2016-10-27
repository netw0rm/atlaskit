import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { props } from 'skatejs';

import { initDropdown, tearDownComponent } from '../_helpers';
import getDropdownMaxheight from '../../src/internal/getDropdownMaxheight';


chai.use(chaiAsPromised);
chai.should();

describe('getDropdownMaxheight', () => {
  let component;
  beforeEach(() => initDropdown().then((newComponent) => {
    component = newComponent;
  }));
  afterEach(() => tearDownComponent(component));

  it('should return `auto` when dropdown is positioned to the side', () => {
    props(component, { position: 'right bottom' });

    expect(getDropdownMaxheight(component)).to.equal('auto');
  });

  it('should return height in pixels when dropdown is positioned normally', () => {
    expect(/^[0-9]+px/.test(getDropdownMaxheight(component))).to.equal(true);
  });
});
