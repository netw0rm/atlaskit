import { expect } from 'chai';
import { findMatchedLanguage, DEFAULT_LANGUAGES, NO_LANGUAGE } from '../../../src/ui/LanguagePicker/languageList';

describe('findMatchedLanguage', () => {
  context('when language is in the list', () => {
    context('when case is not match', () => {
      it('returns matched language', () => {
        expect(findMatchedLanguage(DEFAULT_LANGUAGES, 'jaVasCriPt')).to.eq('JavaScript');
      });
    });

    context('when case is match', () => {
      it('returns matched language', () => {
        expect(findMatchedLanguage(DEFAULT_LANGUAGES, 'JavaScript')).to.eq('JavaScript');
      });
    });
  });

  context('when language is found in alias', () => {
    it('returns the name of the language', () => {
      expect(findMatchedLanguage(DEFAULT_LANGUAGES, 'js')).to.eq('JavaScript');
    });
  });

  context('when language is not in the list', () => {
    it('returns default language', () => {
      expect(findMatchedLanguage(DEFAULT_LANGUAGES, 'random')).to.eq(NO_LANGUAGE);
    });
  });

  context('when language is null', () => {
    it('returns default language', () => {
      expect(findMatchedLanguage(DEFAULT_LANGUAGES)).to.eq(NO_LANGUAGE);
    });
  });
});
