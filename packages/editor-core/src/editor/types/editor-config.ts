import * as React from 'react';
import { NodeSpec, MarkSpec, NodeView } from '../../prosemirror';
import { PMPluginFactory } from './editor-plugin';

export interface NodeConfig {
  name: string;
  rank: number;
  node: NodeSpec;
}

export interface MarkConfig {
  name: string;
  rank: number;
  mark: MarkSpec;
}

export interface NodeViewConfig {
  name: string;
  nodeView: NodeView;
}

export interface EditorConfig {
  nodes: NodeConfig[];
  marks: MarkConfig[];
  pmPlugins: { rank: number; plugin: PMPluginFactory; }[];
  contentComponents: (() => React.ReactElement<any>)[];
  primaryToolbarComponents: (() => React.ReactElement<any>)[];
  secondaryToolbarComponents: (() => React.ReactElement<any>)[];
}
