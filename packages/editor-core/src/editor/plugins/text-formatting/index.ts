import { EditorPlugin } from '../../types';
import { plugin } from '../../../plugins/text-formatting';
import inputRulePlugin from '../../../plugins/text-formatting/input-rule';
import { em } from '../../../schema/marks/em';
import { strong } from '../../../schema/marks/strong';
import { strike } from '../../../schema/marks/strike';
import { subsup } from '../../../schema/marks/subsup';
import { underline } from '../../../schema/marks/underline';
import { code } from '../../../schema/marks/code';

const textFormatting: EditorPlugin = {
  marks() {
    return [
      { name: 'em', mark: em, rank: 200 },
      { name: 'strong', mark: strong, rank: 300 },
      { name: 'strike', mark: strike, rank: 400 },
      { name: 'subsup', mark: subsup, rank: 500 },
      { name: 'underline', mark: underline, rank: 600 },
      { name: 'code', mark: code, rank: 700 }
    ];
  },

  pmPlugins() {
    return [
      { rank: 800, plugin: () => plugin },
      { rank: 810, plugin: schema => inputRulePlugin(schema) }
    ];
  }
};

export default textFormatting;
