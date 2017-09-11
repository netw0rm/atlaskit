import { Schema, Node as PMNode } from '../../../prosemirror';
import { analyticsService, AnalyticsProperties } from '../../../analytics';

export const traverseNode = (node: PMNode, schema: Schema<any, any>): void => {
  let cxhtml = '';
  const { unsupportedInline, unsupportedBlock } = schema.nodes;
  if (node.attrs && node.attrs.cxhtml) {
    cxhtml = node.attrs.cxhtml;
  }

  const data: AnalyticsProperties = {
    type: node.type.name,
    cxhtml: node.attrs.cxhtml as string,
    text: node.text || ''
  };

  if (node.type === unsupportedInline) {
    analyticsService.trackEvent('atlassian.editor.confluenceUnsupported.inline', data);
  } else if (node.type === unsupportedBlock) {
    analyticsService.trackEvent('atlassian.editor.confluenceUnsupported.block', data);
  } else {
    node.content.forEach(node => traverseNode(node, schema));
  }
};
