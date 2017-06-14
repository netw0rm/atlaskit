import {
  Fragment,
  Schema,
} from '../../prosemirror';

import { Serializer } from '../';
import { serializeFragment } from './util';
import customNodeSerializers from './nodes';

export default class TextSerializer implements Serializer<string> {
  serializeFragment(fragment: Fragment): string {
    return serializeFragment(fragment, customNodeSerializers);
  }

  static fromSchema(schema: Schema<any, any>): TextSerializer {
    return new TextSerializer();
  }
}
