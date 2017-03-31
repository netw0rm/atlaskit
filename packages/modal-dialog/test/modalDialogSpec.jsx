import React from 'react';
import { shallow, mount } from 'enzyme';

import ModalDialog from '../src';
import styles from '../src/style.less';

describe('ak-modal-dialog', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      const wrapper = shallow(<ModalDialog />);
      wrapper.should.be.an.instanceof(Object);
      wrapper.unmount();
    });
  });

  describe('props', () => {
    describe('isOpen', () => {
      it('should be hidden by default', () => {
        const wrapper = shallow(<ModalDialog />);
        wrapper.text().should.be.equal('');
        wrapper.unmount();
      });
      it('should be visible when open = true', () => {
        const wrapper = shallow(<ModalDialog isOpen />);
        wrapper.text().should.not.equal('');
        wrapper.unmount();
      });
      it('should become hidden when open changed from true -> false', () => {
        const wrapper = shallow(<ModalDialog isOpen />);
        wrapper.setProps({ isOpen: false });
        wrapper.text().should.be.equal('');
        wrapper.unmount();
      });
    });

    describe('width', () => {
      const { locals, locals: { modalPositioner, medium } } = styles;
      const allowedWidths = ['small', 'medium', 'large', 'x-large'];
      const hasClass = (wrapper, className) => wrapper.find(`.${modalPositioner}`).hasClass(className);

      it('should be "medium" by default', () => {
        const wrapper = shallow(<ModalDialog isOpen />);
        hasClass(wrapper, medium).should.equal(true);
        wrapper.unmount();
      });

      it('should support a custom pixel width as string', () => {
        const wrapper = shallow(<ModalDialog isOpen width="300px" />);
        expect(wrapper.find(`.${modalPositioner}`).props().style).to.deep.equal({ width: '300px' });
        wrapper.unmount();
      });

      it('should support a custom pixel width as string', () => {
        const wrapper = shallow(<ModalDialog isOpen width="75%" />);
        expect(wrapper.find(`.${modalPositioner}`).props().style).to.deep.equal({ width: '75%' });
        wrapper.unmount();
      });

      it('should support a custom integer width', () => {
        const wrapper = shallow(<ModalDialog isOpen width={300} />);
        expect(wrapper.find(`.${modalPositioner}`).props().style).to.deep.equal({ width: 300 });
        wrapper.unmount();
      });

      allowedWidths.forEach((width) => {
        it(`width = "${width}" is applied uniquely`, () => {
          const wrapper = shallow(<ModalDialog isOpen width={width} />);
          hasClass(wrapper, locals[width]).should.equal(true);
          wrapper.unmount();

          // Check that other widths aren't applied
          allowedWidths.filter(w => w !== width).forEach((otherWidth) => {
            const wrapper2 = shallow(<ModalDialog isOpen width={width} />);
            hasClass(wrapper, otherWidth).should.equal(false);
            wrapper2.unmount();
          });
        });
      });
    });

    describe('header', () => {
      it('should render when set', () => {
        const wrapper = shallow(
          <ModalDialog
            header={
              <span>My header</span>
            }
            isOpen
          />
        );
        wrapper.contains(<span>My header</span>).should.be.equal(true);
        wrapper.unmount();
      });
    });

    describe('footer', () => {
      it('should render when set', () => {
        const wrapper = shallow(
          <ModalDialog
            footer={
              <span>My footer</span>
            }
            isOpen
          />
        );
        wrapper.contains(<span>My footer</span>).should.be.equal(true);
        wrapper.unmount();
      });
    });

    describe('children', () => {
      it('should render when set', () => {
        const wrapper = shallow(
          <ModalDialog isOpen>
            <form>This is <strong>my</strong> form</form>
          </ModalDialog>
        );
        wrapper.contains(<form>This is <strong>my</strong> form</form>).should.be.equal(true);
        wrapper.unmount();
      });
    });

    describe('onDialogDismissed', () => {
      it('should trigger when blanket clicked', () => {
        const spy = sinon.spy();
        const wrapper = mount(<ModalDialog isOpen onDialogDismissed={spy} />);
        wrapper.find(`.${styles.locals.modalWrapper}`).children().first().simulate('click');
        expect(spy.callCount).to.equal(1);
        wrapper.unmount();
      });

      it('should trigger when blanket clicked below dialog (modalPositioner)', () => {
        const spy = sinon.spy();
        const wrapper = mount(<ModalDialog isOpen onDialogDismissed={spy} />);
        wrapper.find(`.${styles.locals.modalPositioner}`).simulate('click');
        expect(spy.callCount).to.equal(1);
        wrapper.unmount();
      });

      it('should not trigger when blanket content clicked', () => {
        const spy = sinon.spy();
        const wrapper = mount(
          <ModalDialog isOpen onDialogDismissed={spy}>
            <span className="my-content" />
          </ModalDialog>
        );
        wrapper.find('.my-content').simulate('click');
        expect(spy.callCount).to.equal(0);
        wrapper.unmount();
      });
    });
  });

  describe('rounded body', () => {
    it('should be rounded on top only when header omitted but footer supplied', () => {
      const wrapper = mount(<ModalDialog isOpen footer="Footer" />);
      expect(wrapper.find(`.${styles.locals.withoutHeader}`).length).to.equal(1);
      expect(wrapper.find(`.${styles.locals.withoutFooter}`).length).to.equal(0);
      wrapper.unmount();
    });

    it('should be rounded on bottom only when footer omitted but header supplied', () => {
      const wrapper = mount(<ModalDialog isOpen header="Header" />);
      expect(wrapper.find(`.${styles.locals.withoutHeader}`).length).to.equal(0);
      expect(wrapper.find(`.${styles.locals.withoutFooter}`).length).to.equal(1);
      wrapper.unmount();
    });

    it('should be rounded on top + bottom when header and footer omitted', () => {
      const wrapper = mount(<ModalDialog isOpen />);
      expect(wrapper.find(`.${styles.locals.withoutHeader}`).length).to.equal(1);
      expect(wrapper.find(`.${styles.locals.withoutFooter}`).length).to.equal(1);
      wrapper.unmount();
    });
  });

  describe('scrolling header/footer keylines', () => {
    it('should enable header keyline only when header provided', () => {
      const wrapper = mount(<ModalDialog isOpen />);
      expect(wrapper.find(`.${styles.locals.withHeader}`).length).to.equal(0);
      wrapper.setProps({ header: 'Header' });
      expect(wrapper.find(`.${styles.locals.withHeader}`).length).to.equal(1);
      wrapper.unmount();
    });

    it('should enable footer keyline only when footer provided', () => {
      const wrapper = mount(<ModalDialog isOpen />);
      expect(wrapper.find(`.${styles.locals.withFooter}`).length).to.equal(0);
      wrapper.setProps({ footer: 'Header' });
      expect(wrapper.find(`.${styles.locals.withFooter}`).length).to.equal(1);
      wrapper.unmount();
    });
  });
});
