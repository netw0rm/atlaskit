import chai from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import AkFieldBase, { Label } from 'ak-field-base';
import Droplist from 'ak-droplist';
import Group from 'ak-droplist-group';
import Item from 'ak-droplist-item';

import styles from 'style!../src/styles.less';
import { StatelessSelect } from '../src';

import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

const { expect } = chai;

describe(name, () => {
  describe('render', () => {
    it('sanity check', () => {
      expect(shallow(<StatelessSelect />)).to.exist;
    });

    it('should render with correct CSS class name', () => {
      expect(mount(<StatelessSelect />)).to.have.exactly(1).descendants(`.${styles.selectWrapper}`);
    });

    it('should render Label when the prop is set', () => {
      expect(mount(<StatelessSelect />)).to.not.have.descendants(Label);
      expect(mount(<StatelessSelect label="test" />)).to.have.exactly(1).descendants(Label);
    });

    it('should render Droplist', () => {
      expect(mount(<StatelessSelect />)).to.have.exactly(1).descendants(Droplist);
    });

    it('should render Fieldbase inside Droplist', () => {
      expect(mount(<StatelessSelect />)).to.have.exactly(1).descendants(AkFieldBase);
      expect(mount(<StatelessSelect />).find(Droplist)).to.have.exactly(1).descendants(AkFieldBase);
    });

    it('should render placeholder in trigger if there is no selected item', () => {
      expect(mount(<StatelessSelect placeholder="test" />)).to.have.text('test');
    });

    it('should render selected items`s content instead of placeholder', () => {
      const select = mount(<StatelessSelect placeholder="test" selectedItem={{ content: 'selected' }} />);
      expect(select).to.not.have.text('test');
      expect(select).to.have.text('selected');
    });

    it('should render groups and items inside Droplist (when open)', () => {
      const selectItems = [
        {
          heading: 'test',
          items: [
            { value: 1, content: '1' },
            { value: 2, content: '2' },
          ],
        },
      ];
      const select = mount(<StatelessSelect items={selectItems} isOpen />);
      expect(select).to.have.exactly(1).descendants(Group);
      expect(select).to.have.exactly(2).descendants(Item);
      expect(select.find(Group)).to.have.exactly(2).descendants(Item);
    });

    it('should set isActive property to the selected item', () => {
      const selectItems = [
        {
          heading: 'test',
          items: [
            { value: 1, content: '1' },
            { value: 2, content: '2' },
          ],
        },
      ];
      const select = mount(<StatelessSelect items={selectItems} selectedItem={{ value: 1, content: '1' }} isOpen />);
      expect(select.find(Item).first().props().isActive).to.equal(true);
    });
  });

  describe('props managements', () => {
    it('should pass props to Label', () => {
      const select = mount(<StatelessSelect label="test" isRequired id="test2" />);
      const labelProps = select.find(Label).props();
      expect(labelProps.isRequired).to.equal(true);
      expect(labelProps.label).to.equal('test');
      expect(labelProps.htmlFor).to.equal('test2');
    });

    it('should pass props to Droplist', () => {
      const func = () => {};
      const select = mount(<StatelessSelect position="top right" isOpen onOpenChange={func} />);
      const droplistProps = select.find(Droplist).props();
      expect(droplistProps.position).to.equal('top right');
      expect(droplistProps.isOpen).to.equal(true);
      expect(droplistProps.onOpenChange).to.equal(func);
    });

    it('should pass props to fieldBase', () => {
      const select = mount(<StatelessSelect isDisabled isInvalid />);
      const fieldbaseProps = select.find(AkFieldBase).props();
      expect(fieldbaseProps.isDisabled).to.equal(true);
      expect(fieldbaseProps.isInvalid).to.equal(true);
    });
  });

  describe('callbacks', () => {
    it('should call onSelected when an item is activated', () => {
      const selectItems = [
        {
          heading: 'test',
          items: [
            { value: 1, content: '1' },
            { value: 2, content: '2' },
          ],
        },
      ];
      const spy = sinon.spy();
      const select = mount(<StatelessSelect items={selectItems} isOpen onSelected={spy} />);
      select.find(Item).first().props().onActivate();
      expect(spy.callCount).to.equal(1);
    });
  });
});
