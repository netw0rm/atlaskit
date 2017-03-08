import { URL_REGEX } from './url-regex';
import { InputRule, inputRules} from '../../prosemirror';

const urlAtEndOfLine = new RegExp(`${URL_REGEX.source}$`);

const inputRule = new InputRule(urlAtEndOfLine, (state, match, start, end) => {
  const { schema } = state;
  const url = match[3] ? match[1] : `http://${match[1]}`;

  const markType = schema.mark(
    'link',
    {
      href: url,
    }
  );

  return state.tr.replaceWith(
    start,
    end,
    schema.text(
      match[1],
      [markType]
    )
  );
});

export default inputRules({ rules: [inputRule] });
