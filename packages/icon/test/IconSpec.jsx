import React, { PureComponent } from 'react';
import { mount, shallow } from 'enzyme';

import { name } from '../package.json';
import Icon, { size } from '../src/Icon';
import styles from '../src/styles.less';

describe(name, () => {
  describe('Icon', () => {
    const secretContent = 'secret content';
    const secretWrapper = () => (<div>{secretContent}</div>);
    const empty = () => (<div>Icon</div>);

    const MyIcon = props => <Icon glyph={secretWrapper} {...props} />;

    describe('exports', () => {
      it('exports the React component, and size', () => {
        expect(Icon).to.not.equal(undefined);
        expect(size).to.not.equal(undefined);

        expect(new Icon({ label: 'My icon' })).to.be.instanceOf(PureComponent);
        expect(Object.values(size)).to.deep.equal(['small', 'medium', 'large', 'xlarge']);
      });
    });

    it('should be possible to create an Icon via a subclass', () => {
      const myIcon = mount(<MyIcon label="My icon" />);
      expect(myIcon.text()).to.equal(secretContent);
    });

    describe('label property', () => {
      it('is accessed by glyph', () => {
        /* eslint-disable react/prop-types */
        const LabelWriter = props => <div>{props.label}</div>;
        /* eslint-enable react/prop-types */
        const LabelIcon = props => <Icon glyph={LabelWriter} {...props} />;

        const labelContent = 'label content';
        const wrapper = mount(<LabelIcon label={labelContent} />);
        expect(wrapper.text()).to.equal(labelContent);
      });
    });

    describe('size property', () => {
      Object.values(size).forEach((s) => {
        it(`with value ${s}`, () => {
          const wrapper = shallow(<Icon glyph={empty} label="My icon" size={s} />);
          expect((wrapper).hasClass((styles.locals[s]))).to.equal(true);
        });
      });
    });

    describe('onClick property', () => {
      it('should set a click handler', () => {
        const handler = sinon.spy();

        const wrapper = shallow(<Icon glyh={empty} label="My icon" onClick={handler} />);
        expect(wrapper.prop('onClick')).to.equal(handler);

        wrapper.find(`.${styles.locals.iconBody}`).simulate('click');
        expect(handler.callCount).to.equal(1);
      });
    });
  });
});
