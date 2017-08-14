import * as React from 'react';
import { ProviderFactory } from '@atlaskit/editor-core';
import { ReactRenderer as Renderer } from '@atlaskit/editor-core/dist/es5/renderer';

import { getMockTaskDecisionResource } from '../src/support/story-data';

export const createProviders = (options?) => {
  const taskDecisionProvider = getMockTaskDecisionResource(options);
  const providerFactory = new ProviderFactory();
  providerFactory.setProvider('taskDecisionProvider', Promise.resolve(taskDecisionProvider));
  const renderDocument = (document: any) => (
    <Renderer document={document} dataProviders={providerFactory}/>
  );

  return {
    taskDecisionProvider,
    renderDocument
  };
};
