import chai from 'chai';
import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import WarningIcon from 'ak-icon/glyph/warning';
import Banner from '../src';
import styles from '../src/style.less';

import { name } from '../package.json';

chai.use(chaiEnzyme());

const { expect } = chai;

describe(name, () => {
  it('basic sanity check', () =>
    expect(shallow(<Banner />)).to.exist
  );
  describe('props', () => {
    describe('appearance prop', () => {
      it('should default to warning appearance', () =>
        expect(shallow(
          <Banner />
        )).to.have.descendants(`.${styles.locals.warning}`)
      );
      it('should apply error appearance class when error appearance supplied', () =>
        expect(shallow(
          <Banner appearance="error" />
        )).to.have.descendants(`.${styles.locals.error}`)
      );
    });
    it('should render children prop', () =>
      expect(shallow(
        <Banner>Testing yeah!</Banner>
      ).find(`.${styles.locals.bannerText}`)).to.have.text('Testing yeah!')
    );
    it('should render icon prop', () =>
      expect(shallow(
        <Banner
          icon={<WarningIcon label="Warning" />}
        />
      )).to.have.descendants(WarningIcon)
    );
    describe('isOpen prop', () => {
      it('should default to not being open', () =>
        expect(shallow(
          <Banner />
        )).to.not.have.descendants(`.${styles.locals.open}`)
      );
      it('should apply open class when isOpen', () =>
        expect(shallow(
          <Banner isOpen />
        )).to.have.descendants(`.${styles.locals.open}`)
      );
    });
  });
  describe('a11y', () => {
    it('should have role=alert', () =>
      expect(shallow(
        <Banner />
      ).find(`.${styles.locals.banner}`)).to.have.attr('role', 'alert')
    );
    it('should be aria-hidden=false when isOpen is true', () =>
      expect(shallow(
        <Banner isOpen />
      ).find(`.${styles.locals.banner}`)).to.have.attr('aria-hidden', 'false')
    );
    it('should be aria-hidden=true when isOpen is false', () =>
      expect(shallow(
        <Banner />
      ).find(`.${styles.locals.banner}`)).to.have.attr('aria-hidden', 'true')
    );
  });
});
