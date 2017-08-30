import {
  Node as PMNode,
  Schema
} from '../../';
import { Transformer } from '../transformer';
import parse from './parse';
import encode from './encode';

export default class ConfluenceTransformer implements Transformer<string> {
  private schema: Schema<any, any>;

  constructor(schema: Schema<any, any>) {
    this.schema = schema;
  }

  parse = (html: string): PMNode => parse(html, this.schema);

  encode = (node: PMNode): string => encode(node, this.schema);
}
