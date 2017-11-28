import * as React from 'react';
import styled from 'styled-components';
import { ProviderFactory } from '@atlaskit/editor-common';
import { ReactRenderer as Renderer } from '@atlaskit/renderer';

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

// tslint:disable-next-line:variable-name
export const MessageContainer = styled.div`
  border: 10px solid #fcc;
  width: 585px
`;

// tslint:disable-next-line:variable-name
export const SidebarContainer = styled.div`
  border: 10px solid #fcc;
  width: 240px;
  overflow-x: hidden;
`;
