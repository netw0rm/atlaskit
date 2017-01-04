import chai from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import Group from 'ak-droplist-group';
import Trigger from 'ak-droplist-trigger';
import Item from 'ak-droplist-item';
import Layer from 'ak-layer';

import { name } from '../package.json';
import { locals as styles } from '../src/styles.less';

import Droplist from '../src';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

const { expect } = chai;

const itemsList = [
  {
    heading: 'test1',
    items: [
      {
        content: 'Some text',
      },
    ],
  },
  {
    heading: 'test2',
    items: [],
  },
];

describe(name, () => {
  it('should be possible to create a component', () => {
    expect(shallow(<Droplist>test</Droplist>)).to.exist;
  });

  describe('render', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Droplist items={itemsList} isOpen>text</Droplist>);
    });

    it('should render Layer component', () => {
      expect(wrapper.find(`.${styles.dropWrapper}`)).to.exist;
      const layer = wrapper.find(`.${styles.dropWrapper}`).children().first();
      const layerNode = layer.node;
      expect(layerNode instanceof Layer).to.be.true;
      expect(layer).to.have.exactly(1).descendants(`.${styles.dropContent}`);
      expect(layer).to.have.exactly(1).descendants(`.${styles.dropTrigger}`);
    });

    it('should pass required properties to Layer', () => {
      const layer = wrapper.find(`.${styles.dropWrapper}`).children().first();
      expect(layer).to.have.prop('offset', '0 4');
      expect(layer).to.have.prop('position', 'bottom left');
      expect(layer).to.have.prop('content');
    });

    it('should render groups from the first-level children', () => {
      const content = wrapper.find(`.${styles.dropContent}`);
      expect(content.children().nodes[0] instanceof Group).to.be.true;
      expect(content.children().nodes[1] instanceof Group).to.be.true;
    });

    it('should render items inside groups', () => {
      const content = wrapper.find(`.${styles.dropContent}`);
      const group = content.children().nodes[0];
      expect(group.props.children[0].type === Item).to.be.true;
    });

    it('should render trigger', () => {
      const triggerWrapper = wrapper.find(`.${styles.dropTrigger}`);
      const trigger = triggerWrapper.children().nodes[0];

      expect(trigger instanceof Trigger).to.be.true;
      expect(triggerWrapper).to.have.text('text');
    });
  });

  describe('onOpenChange', () => {
    it('should be open when the isOpen property set to true', () => {
      expect(mount(<Droplist items={itemsList}>text</Droplist>)).to.not.have.descendants(`.${styles.dropContent}`);
      expect(mount(<Droplist items={itemsList} isOpen>text</Droplist>)).to.have.exactly(1).descendants(`.${styles.dropContent}`);
    });

    it('interacting with trigger should call onOpenChange callback', () => {
      const spy = sinon.spy();
      const wrapper = mount(<Droplist items={itemsList} onOpenChange={spy}>test</Droplist>);
      const trigger = wrapper.find(`.${styles.dropTrigger}`).children().first();
      trigger.simulate('click');
      expect(spy.called).to.equal(true);
      expect(spy.callCount).to.equal(1);
    });
  });

  describe('onItemActivated', () => {
    it('should be called when an item was activated', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1', type: 'checkbox' },
        ],
      }];
      const spy = sinon.spy();
      const wrapper = mount(<Droplist items={items} isOpen onItemActivated={spy}>
        test</Droplist>);
      const item = wrapper.find('[data-role="droplistItem"]');
      item.simulate('click');
      expect(spy.called).to.equal(true);
    });

    it('should pass the item when activated', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1' },
        ],
      }];
      let attrs;
      const wrapper = mount(<Droplist items={items} isOpen onItemActivated={a => (attrs = a)}>
        test</Droplist>);
      const item = wrapper.find('[data-role="droplistItem"]');
      item.simulate('click');
      expect(attrs).to.exist;
      expect(attrs.item).to.exist;
      expect(attrs.item).to.equal(items[0].items[0]);
      expect(attrs.item).to.deep.equal({ content: 'item 1' });
    });
  });

  describe('focus', () => {
    describe('getPrevFocusable', () => {
      it('should return previous item when passed an item', () => {
        const items = [{
          heading: 'group',
          items: [{ content: '0' }, { content: '1' }, { content: '2' }],
        }];

        const wrapper = mount(<Droplist items={items} isOpen>test</Droplist>);

        expect(wrapper.instance().getPrevFocusable(1)).to.equal(0);
      });

      it('should skip hidden items', () => {
        const items = [{
          heading: 'group',
          items: [{ content: '0' }, { content: '1' }, { content: '2', isHidden: true }, { content: '3', isHidden: true }, { content: '4' }],
        }];

        const wrapper = mount(<Droplist items={items} isOpen>test</Droplist>);

        expect(wrapper.instance().getPrevFocusable(4)).to.equal(1);
      });

      it('should return the first item if there is nothing before', () => {
        const items = [{
          heading: 'group',
          items: [{ content: '0' }, { content: '1' }, { content: '2' }],
        }];

        const wrapper = mount(<Droplist items={items} isOpen>test</Droplist>);

        expect(wrapper.instance().getPrevFocusable(0)).to.equal(0);
      });

      it('should return the first non-hidden item if the first item is hidden', () => {
        const items = [{
          heading: 'group',
          items: [{ content: '0', isHidden: true }, { content: '1', isHidden: true }, { content: '2' }],
        }];

        const wrapper = mount(<Droplist items={items} isOpen>test</Droplist>);

        expect(wrapper.instance().getPrevFocusable(2)).to.equal(2);
      });
    });

    describe('getNextFocusable', () => {
      it('should return the first item when called without an argument', () => {
        const items = [{
          heading: 'group',
          items: [{ content: '0' }, { content: '1' }],
        }];

        const wrapper = mount(<Droplist items={items} isOpen>test</Droplist>);

        expect(wrapper.instance().getNextFocusable()).to.equal(0);
      });

      it('if the first item is hidden it should return next available item', () => {
        const items = [{
          heading: 'group',
          items: [{ content: '0', isHidden: true }, { content: '1', isHidden: true }, { content: '2' }],
        }];

        const wrapper = mount(<Droplist items={items} isOpen>test</Droplist>);

        expect(wrapper.instance().getNextFocusable()).to.equal(2);
      });

      it('should return next item when passed an item', () => {
        const items = [{
          heading: 'group',
          items: [{ content: '0' }, { content: '1' }, { content: '2' }],
        }];

        const wrapper = mount(<Droplist items={items} isOpen>test</Droplist>);

        expect(wrapper.instance().getNextFocusable(1)).to.equal(2);
      });

      it('should skip hidden items', () => {
        const items = [{
          heading: 'group',
          items: [{ content: '0' }, { content: '1' }, { content: '2', isHidden: true }, { content: '3', isHidden: true }, { content: '4' }],
        }];

        const wrapper = mount(<Droplist items={items} isOpen>test</Droplist>);

        expect(wrapper.instance().getNextFocusable(1)).to.equal(4);
      });

      it('should return the latest item if there is nothing beyond', () => {
        const items = [{
          heading: 'group',
          items: [{ content: '0' }, { content: '1' }, { content: '2' }],
        }];

        const wrapper = mount(<Droplist items={items} isOpen>test</Droplist>);

        expect(wrapper.instance().getNextFocusable(2)).to.equal(2);
      });

      it('should return the latest non-hidden item if the latest item is hidden', () => {
        const items = [{
          heading: 'group',
          items: [{ content: '0' }, { content: '1' }, { content: '2' }, { content: '3', isHidden: true }, { content: '4', isHidden: true }],
        }];

        const wrapper = mount(<Droplist items={items} isOpen>test</Droplist>);

        expect(wrapper.instance().getNextFocusable(2)).to.equal(2);
      });
    });
  });
});
