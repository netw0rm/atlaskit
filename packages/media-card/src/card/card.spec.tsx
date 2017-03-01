import * as React from 'react';
import { Card, CardProps, CardState } from './card';
import 'jest';
import { mount, ReactWrapper } from 'enzyme';
import ReactElement = React.ReactElement;
import Component = React.Component;
import { waitUntil } from '../../../test/utils';
import { ContextFactory } from '@atlaskit/media-core';

describe('Card', () => {
  const waitUntilCardIsLoaded = (card: ReactWrapper<CardProps, CardState>) => {
    return waitUntil(() => !card.state<boolean>('loading'));
  };
  const tokenProvider = (collection: string) => Promise.resolve('some-jwt-token');
  const toDataUri = (data: string) => {
    return 'data:;base64,' + btoa(data);
  };

  beforeAll(() => {
    // TODO: mocks are supposed to be activated by calling jest.mock('axios'),
    // but is instead activiated by default. Uncomment when this is fixed.
    // see: https://github.com/facebook/jest/issues/2354

    // jest.mock('axios');
  });

  afterAll(() => {
    // jest.resetModules();
  });

  test('should display an image when loaded', async () => {
    const context = ContextFactory.create({
      clientId: 'some-client',
      serviceHost: 'some-service',
      tokenProvider
    });
    const card = mount<CardProps, CardState>(
      <Card
        context={context}
        id={'some-image'}
        mediaItemType={'file'}
      />);

    expect(card.find('img').length).toBe(0);

    await waitUntilCardIsLoaded(card);

    expect(card.find('img').first().props().src).toBe(toDataUri('some-image'));
  });

  test('should display a spinner while loading', () => {
    const context = ContextFactory.create({
      clientId: 'some-client',
      serviceHost: 'some-service',
      tokenProvider
    });
    const component = mount<CardProps, CardState>(
      <Card
        context={context}
        id={'some-image'}
        mediaItemType={'file'}
      />);

    expect(component.state<boolean>('loading')).toBe(true);
    expect(component.find('FileIcon').first().props().label).toBe('loading');
  });
});
