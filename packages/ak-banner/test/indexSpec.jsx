import React from 'react';
import { shallow } from 'enzyme';
import WarningIcon from 'ak-icon/glyph/warning';
import Banner from '../src';
import styles from '../src/style.less';

import { name } from '../package.json';

describe(name, () => {
  it('basic sanity check', () =>
    expect(shallow(<Banner />)).not.to.equal(undefined)
  );
  describe('props', () => {
    describe('appearance prop', () => {
      it('should default to warning appearance', () =>
        expect(shallow(
          <Banner />
        ).find(`.${styles.locals.warning}`).isEmpty()).to.equal(false)
      );
      it('should apply error appearance class when error appearance supplied', () =>
        expect(shallow(
          <Banner appearance="error" />
        ).find(`.${styles.locals.error}`).isEmpty()).to.equal(false)
      );
    });
    it('should render children prop', () =>
      expect(shallow(
        <Banner>Testing yeah!</Banner>
      ).find(`.${styles.locals.bannerText}`).text()).to.equal('Testing yeah!')
    );
    it('should render icon prop', () =>
      expect(shallow(
        <Banner
          icon={<WarningIcon label="Warning" />}
        />
      ).find(WarningIcon).isEmpty()).to.equal(false)
    );
    describe('isOpen prop', () => {
      it('should default to not being open', () =>
        expect(shallow(
          <Banner />
        ).find(`.${styles.locals.open}`).isEmpty()).to.equal(true)
      );
      it('should apply open class when isOpen', () =>
        expect(shallow(
          <Banner isOpen />
        ).find(`.${styles.locals.open}`).isEmpty()).to.equal(false)
      );
    });
  });
  describe('a11y', () => {
    it('should have role=alert', () =>
      expect(shallow(
        <Banner />
      ).find(`.${styles.locals.banner}`).is('[role="alert"]')).to.equal(true)
    );
    it('should be aria-hidden=false when isOpen is true', () =>
      expect(shallow(
        <Banner isOpen />
      ).find(`.${styles.locals.banner}`).is('[aria-hidden=false]')).to.equal(true)
    );
    it('should be aria-hidden=true when isOpen is false', () =>
      expect(shallow(
        <Banner />
      ).find(`.${styles.locals.banner}`).is('[aria-hidden=true]')).to.equal(true)
    );
  });
});
