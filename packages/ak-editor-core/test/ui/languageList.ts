import { expect } from 'chai';
import { findMatchedLanguage, NO_LANGUAGE } from '../../src/ui/LanguagePicker/languageList';

describe('findMatchedLanguage', () => {
  context('when language is in the list', () => {
    context('when case is not match', () => {
      it('returns matched language', () => {
        expect(findMatchedLanguage('jaVasCriPt')).to.eq('JavaScript');
      });
    });

    context('when case is match', () => {
      it('returns matched language', () => {
        expect(findMatchedLanguage('JavaScript')).to.eq('JavaScript');
      });
    });
  });

  context('when language is not in the list', () => {
    it('returns default language', () => {
      expect(findMatchedLanguage('random')).to.eq(NO_LANGUAGE);
    });
  });

  context('when language is null', () => {
    it('returns default language', () => {
      expect(findMatchedLanguage(null)).to.eq(NO_LANGUAGE);
    });
  });
});
