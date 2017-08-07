import { ServiceDecisionResponse } from '../types';
import { MockTaskDecisionResourceConfig } from './support-types';
import MockTaskDecisionResource from './MockTaskDecisionResource';

declare var require: {
    <T>(path: string): T;
};

export const getServiceDecisionsResponse = (): ServiceDecisionResponse => require('./sample-decisions.json') as ServiceDecisionResponse;

export const getMockTaskDecisionResource = (config?: MockTaskDecisionResourceConfig) => new MockTaskDecisionResource(config);

export const document = {
  version: 1,
  type: 'doc',
  content:
  [{
    type: 'paragraph',
    content:
    [{
      type: 'text',
      text: 'Hello world'
    },
    { type: 'hardBreak' },
    {
      type: 'text',
      text: 'This is a some content '
    },
    {
      type: 'emoji',
      attrs:
      {
        shortName: ':wink:',
        id: '1f609',
        text: '😉'
      }
    },
    {
      type: 'text',
      text: ' '
    },
    {
      type: 'mention',
      attrs:
      {
        id: '0',
        text: '@Carolyn',
        accessLevel: 'CONTAINER'
      }
    },
    {
      type: 'text',
      text: ' '
    },
    {
      type: 'text',
      text: 'was',
      marks: [{ type: 'strong' }]
    },
    {
      type: 'text',
      text: ' '
    },
    {
      type: 'text',
      text: 'here',
      marks:
      [{ type: 'em' },
      { type: 'strong' }]
    },
    {
      type: 'text',
      text: '. '
    }]
  }]
};
