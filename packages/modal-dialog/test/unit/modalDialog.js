import React from 'react';
import { shallow, mount } from 'enzyme';
// import Blanket from '@atlaskit/blanket';

import ModalDialog from '../../src';
// import Content from '../../src/components/Content';
// import { Body } from '../../src/styled/Content';
// import { dialogHeight, dialogWidth, Dialog, Positioner } from '../../src/styled/Modal';
import { dialogHeight, Dialog } from '../../src/styled/Modal';
import createWaitForElement from './wait';

// dialogs require an onClose function
const noop = () => {};
// const StubDialog = props => <ModalDialog onClose={noop} {...props} />;
let originalTimeout;

describe('modal-dialog', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<ModalDialog onClose={noop} />);
    expect(wrapper).not.toBe(undefined);
  });

  describe('props', () => {
    describe('height', () => {
      beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
      });
      afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      });

      it('should be passed to Dialog', async () => {
        const waitForElement = createWaitForElement(Dialog);
        const component = mount(<ModalDialog height="42%" onClose={noop} />);
        const componentReady = await waitForElement(component);

        expect(componentReady.prop('heightValue')).toEqual('not the real value');
      });

      it('should return px if number', () => {
        expect(dialogHeight({ heightValue: 42 })).toBe('42px');
      });

      it('should return raw value if string', () => {
        expect(dialogHeight({ heightValue: '42%' })).toBe('42%');
        expect(dialogHeight({ heightValue: '42em' })).toBe('42em');
        expect(dialogHeight({ heightValue: 'initial' })).toBe('initial');
      });

      it('should return "auto" if not supplied', () => {
        expect(dialogHeight({})).toBe('auto');
      });
    });
  //   describe('width', () => {
  //     const TSHIRT_SIZES = ['small', 'medium', 'large', 'x-large'];
  //     const assertEqual = (wrapper, expected) => wrapper
  //       .find(Positioner)
  //       .prop('dialogWidth') === expected;

  //     it('should be passed to Dialog', () => {
  //       const wrapper = mount(<StubDialog width="42%" />);

  //       wait(() => {
  //         const dialogWidthProp = wrapper.find(Dialog).prop('widthValue');
  //         expect(dialogWidthProp).toBe('42%');
  //       });
  //     });

  //     it('should return px if number', () => {
  //       expect(dialogWidth({ widthValue: 42 })).toBe('42px');
  //     });

  //     it('should return raw value if string', () => {
  //       expect(dialogWidth({ widthValue: '42%' })).toBe('42%');
  //       expect(dialogWidth({ widthValue: '42em' })).toBe('42em');
  //       expect(dialogWidth({ widthValue: 'auto' })).toBe('auto');
  //     });

  //     it('should return "auto" if not supplied', () => {
  //       expect(dialogWidth({})).toBe('auto');
  //     });

  //     TSHIRT_SIZES.forEach((width) => {
  //       it(`width = "${width}" is applied uniquely`, () => {
  //         const wrapper = shallow(<StubDialog width={width} />);
  //         wait(() => {
  //           expect(assertEqual(wrapper, width)).toBe(true);
  //         });
  //       });
  //     });
  //   });

  //   describe('header', () => {
  //     it('should render when set', () => {
  //       const node = <span>My header</span>;
  //       const wrapper = mount(<StubDialog header={() => node} />);

  //       wait(() => {
  //         expect(wrapper.contains(node)).toBe(true);
  //       });
  //     });
  //   });

  //   describe('footer', () => {
  //     it('should render when set', () => {
  //       const node = <span>My footer</span>;
  //       const wrapper = mount(<StubDialog footer={() => node} />);

  //       wait(() => {
  //         expect(wrapper.contains(node)).toBe(true);
  //       });
  //     });
  //   });

  //   describe('children', () => {
  //     it('should render when set', () => {
  //       const node = <form>This is <strong>my</strong> form</form>;
  //       const wrapper = shallow(<StubDialog>{node}</StubDialog>);

  //       wait(() => {
  //         expect(wrapper.contains(node)).toBe(true);
  //       });
  //     });
  //   });

  //   describe('onClose', () => {
  //     it('should trigger when blanket clicked', () => {
  //       const spy = jest.fn();
  //       const wrapper = mount(<StubDialog onClose={spy} />);

  //       wait(() => {
  //         const blanket = wrapper.find(Blanket);

  //         blanket.simulate('click');
  //         expect(spy).toHaveBeenCalledTimes(1);
  //       });
  //     });

  //     it('should trigger when blanket clicked below dialog (modalPositioner)', () => {
  //       const spy = jest.fn();
  //       const wrapper = mount(<StubDialog onClose={spy} />);

  //       wait(() => {
  //         wrapper.find(Positioner).simulate('click');
  //         expect(spy).toHaveBeenCalledTimes(1);
  //       });
  //     });

  //     it('should not trigger when blanket content clicked', () => {
  //       const spy = jest.fn();
  //       const node = <span>my content</span>;
  //       const wrapper = mount(<StubDialog onClose={spy}>{node}</StubDialog>);

  //       wait(() => {
  //         wrapper.find(node).simulate('click');
  //         expect(spy).not.toHaveBeenCalled();
  //       });
  //     });
  //   });
  // });

  // /*
  //   <Content /> won't render until it has a `dialogNode` reference;
  //   the timeout gives it time to propagate.
  // */
  // describe('scrolling header/footer keylines', () => {
  //   it('should enable header keyline only when header provided', () => {
  //     const wrapper = mount(<StubDialog />);

  //     wait(() => {
  //       const content = wrapper.find(Content);
  //       const body = content.find(Body);

  //       expect(content.state('showHeaderKeyline')).toBe(false);

  //       wrapper.setProps({ header: () => 'Header' });
  //       body.simulate('scroll');
  //       expect(content.state('showHeaderKeyline')).toBe(true);
  //     });
  //   });

  //   it('should enable footer keyline only when footer provided', () => {
  //     const wrapper = mount(<StubDialog />);

  //     wait(() => {
  //       const content = wrapper.find(Content);
  //       const body = content.find(Body);

  //       expect(content.state('showFooterKeyline')).toBe(false);

  //       wrapper.setProps({ footer: () => 'Footer' });
  //       body.simulate('scroll');
  //       expect(content.state('showFooterKeyline')).toBe(true);
  //     });
  //   });
  // });

  // describe('chromeless', () => {
  //   it('header should not render if dialog is chromeless', () => {
  //     const node = <span>My header</span>;
  //     const wrapper = mount(<StubDialog isChromeless header={() => node} />);

  //     wait(() => {
  //       expect(wrapper.contains(node)).toBe(false);
  //     });
  //   });

  //   it('footer should not render if dialog is chromeless', () => {
  //     const node = <span>My footer</span>;
  //     const wrapper = mount(<StubDialog isChromeless footer={() => node} />);

  //     wait(() => {
  //       expect(wrapper.contains(node)).toBe(false);
  //     });
  //   });
  // });
  });
});
