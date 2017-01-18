import * as chai from 'chai';
import { expect } from 'chai';
import { findMatchLangugae, NO_LANGUAGE } from '../../src/ui/LanguagePicker/languageList';

describe('findMatchLangugae', () => {
  context('when language is in the list', () => {
    context('when case is not match', () => {
      it('returns matched language', () => {
        expect(findMatchLangugae('jaVasCriPt')).to.eq('JavaScript');
      });
    });

    context('when case is match', () => {
      it('returns matched language', () => {
        expect(findMatchLangugae('JavaScript')).to.eq('JavaScript');
      });
    });
  });

  context('when language is not in the list', () => {
    it('returns default language',() => {
      expect(findMatchLangugae('random')).to.eq(NO_LANGUAGE);
    });
  });

  context('when language is null', () => {
    it('returns default language',() => {
      expect(findMatchLangugae(null)).to.eq(NO_LANGUAGE);
    });
  });
});
