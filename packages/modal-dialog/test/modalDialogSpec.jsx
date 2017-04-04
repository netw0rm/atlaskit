import sinon from 'sinon';

import React from 'react';
import { shallow, mount } from 'enzyme';

import ModalDialog from '../src';
import styles from '../src/style.less';

describe('ak-modal-dialog', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      shallow(<ModalDialog />).should.be.an.instanceof(Object);
    });
  });

  describe('props', () => {
    describe('isOpen', () => {
      it('should be hidden by default', () => {
        shallow(<ModalDialog />).text().should.be.equal('');
      });
      it('should be visible when open = true', () => {
        shallow(<ModalDialog isOpen />).text().should.not.equal('');
      });
      it('should become hidden when open changed from true -> false', () => {
        const wrapper = shallow(<ModalDialog isOpen />);
        wrapper.setProps({ isOpen: false });
        wrapper.text().should.be.equal('');
      });
    });

    describe('width', () => {
      const { locals, locals: { modalPositioner, medium } } = styles;
      const allowedWidths = ['small', 'medium', 'large', 'x-large'];
      const hasClass = (wrapper, className) => wrapper.find(`.${modalPositioner}`).hasClass(className);

      it('should be "medium" by default', () => {
        hasClass(shallow(<ModalDialog isOpen />), medium).should.equal(true);
      });

      it('should support a custom pixel width as string', () => {
        expect(shallow(
          <ModalDialog
            isOpen
            width="300px"
          />
        ).find(`.${modalPositioner}`).props().style).to.deep.equal({ width: '300px' });
      });

      it('should support a custom pixel width as string', () => {
        expect(shallow(
          <ModalDialog
            isOpen
            width="75%"
          />
        ).find(`.${modalPositioner}`).props().style).to.deep.equal({ width: '75%' });
      });

      it('should support a custom integer width', () => {
        expect(shallow(
          <ModalDialog
            isOpen
            width={300}
          />
        ).find(`.${modalPositioner}`).props().style).to.deep.equal({ width: 300 });
      });

      allowedWidths.forEach((width) => {
        it(`width = "${width}" is applied uniquely`, () => {
          hasClass(shallow(<ModalDialog isOpen width={width} />), locals[width]).should.equal(true);

          // Check that other widths aren't applied
          allowedWidths.filter(w => w !== width).forEach((otherWidth) => {
            hasClass(shallow(<ModalDialog isOpen width={width} />), otherWidth).should.equal(false);
          });
        });
      });
    });

    describe('header', () => {
      it('should render when set', () => {
        shallow(
          <ModalDialog
            header={
              <span>My header</span>
            }
            isOpen
          />
        ).contains(<span>My header</span>).should.be.equal(true);
      });
    });

    describe('footer', () => {
      it('should render when set', () => {
        shallow(
          <ModalDialog
            footer={
              <span>My footer</span>
            }
            isOpen
          />
        ).contains(<span>My footer</span>).should.be.equal(true);
      });
    });

    describe('children', () => {
      it('should render when set', () => {
        shallow(
          <ModalDialog isOpen>
            <form>This is <strong>my</strong> form</form>
          </ModalDialog>
        ).contains(<form>This is <strong>my</strong> form</form>).should.be.equal(true);
      });
    });

    describe('onDialogDismissed', () => {
      it('should trigger when blanket clicked', () => {
        const spy = sinon.spy();
        const wrapper = mount(<ModalDialog isOpen onDialogDismissed={spy} />);
        wrapper.find(`.${styles.locals.modalWrapper}`).children().first().simulate('click');
        expect(spy.callCount).to.equal(1);
      });

      it('should trigger when blanket clicked below dialog (modalPositioner)', () => {
        const spy = sinon.spy();
        const wrapper = mount(<ModalDialog isOpen onDialogDismissed={spy} />);
        wrapper.find(`.${styles.locals.modalPositioner}`).simulate('click');
        expect(spy.callCount).to.equal(1);
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
      });
    });
  });

  describe('rounded body', () => {
    it('should be rounded on top only when header omitted but footer supplied', () => {
      const wrapper = mount(<ModalDialog isOpen footer="Footer" />);
      expect(wrapper.find(`.${styles.locals.withoutHeader}`).length).to.equal(1);
      expect(wrapper.find(`.${styles.locals.withoutFooter}`).length).to.equal(0);
    });

    it('should be rounded on bottom only when footer omitted but header supplied', () => {
      const wrapper = mount(<ModalDialog isOpen header="Header" />);
      expect(wrapper.find(`.${styles.locals.withoutHeader}`).length).to.equal(0);
      expect(wrapper.find(`.${styles.locals.withoutFooter}`).length).to.equal(1);
    });

    it('should be rounded on top + bottom when header and footer omitted', () => {
      const wrapper = mount(<ModalDialog isOpen />);
      expect(wrapper.find(`.${styles.locals.withoutHeader}`).length).to.equal(1);
      expect(wrapper.find(`.${styles.locals.withoutFooter}`).length).to.equal(1);
    });
  });

  describe('scrolling header/footer keylines', () => {
    it('should enable header keyline only when header provided', () => {
      const wrapper = mount(<ModalDialog isOpen />);
      expect(wrapper.find(`.${styles.locals.withHeader}`).length).to.equal(0);
      wrapper.setProps({ header: 'Header' });
      expect(wrapper.find(`.${styles.locals.withHeader}`).length).to.equal(1);
    });

    it('should enable footer keyline only when footer provided', () => {
      const wrapper = mount(<ModalDialog isOpen />);
      expect(wrapper.find(`.${styles.locals.withFooter}`).length).to.equal(0);
      wrapper.setProps({ footer: 'Header' });
      expect(wrapper.find(`.${styles.locals.withFooter}`).length).to.equal(1);
    });
  });
});
