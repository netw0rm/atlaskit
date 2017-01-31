import { Schema } from '../';

export const nodes: { [key: string]: any };

export const marks: { em: any, strong: any, link: any, code: any };

export const schema: Schema<typeof nodes, typeof marks>;
