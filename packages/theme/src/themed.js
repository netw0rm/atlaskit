import getTheme from './getTheme';
import { DEFAULT_THEME_MODE } from './constants';

export default function themed(modes) {
  return (props) => {
    const theme = getTheme(props);
    return modes[theme.mode] || modes[DEFAULT_THEME_MODE];
  };
}
