import * as React from 'react';
import { ProviderFactory } from '@atlaskit/editor-core';
import { ReactRenderer as Renderer } from '@atlaskit/editor-core/dist/es5/renderer';

import { TaskDecisionProvider } from '../src/types';
import { getMockTaskDecisionResource } from '../src/support/story-data';
import { MockTaskDecisionResourceConfig } from '../src/support/support-types';

export const createProviders = (options?: MockTaskDecisionResourceConfig) => {
  const taskDecisionProvider = Promise.resolve(getMockTaskDecisionResource(options));
  const providerFactory = new ProviderFactory();
  providerFactory.setProvider('taskDecisionProvider', taskDecisionProvider);
  const renderDocument = (document: any) => (
    <Renderer document={document} dataProviders={providerFactory}/>
  );

  return {
    taskDecisionProvider,
    renderDocument
  };
};

export const createRenderer = (provider: TaskDecisionProvider) => {
  const providerFactory = new ProviderFactory();
  providerFactory.setProvider('taskDecisionProvider', Promise.resolve(provider));
  const renderDocument = (document: any) => (
    <Renderer document={document} dataProviders={providerFactory}/>
  );
  return renderDocument;
};
