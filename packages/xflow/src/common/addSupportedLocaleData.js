import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import es from 'react-intl/locale-data/es';
import fr from 'react-intl/locale-data/fr';
import ja from 'react-intl/locale-data/ja';
import ko from 'react-intl/locale-data/ko';
import pt from 'react-intl/locale-data/pt';
import ru from 'react-intl/locale-data/ru';

let hasAlreadyAdded = false;

export default () => {
  if (hasAlreadyAdded) {
    return;
  }
  addLocaleData([...en, ...de, ...es, ...fr, ...ja, ...ko, ...pt, ...ru]);
  hasAlreadyAdded = true;
};
