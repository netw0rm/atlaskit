import * as React from 'react';
import { PureComponent, SyntheticEvent } from 'react';

export class AkProfileClient {
  constructor(config: AkProfileClientConfig);

  makeRequest: (cloudId: string, userId: string) => Promise<any>;
  setCachedProfile: (cloudId: string, userId: string, cacheItem: any) => void;
  getCachedProfile: (cloudId: string, userId: string) => any;
  flushCache: () => void;
  getProfile: (cloudId: string, userId: string) => Promise<any>;
}

export interface AkProfilecardTriggerActions {
  callback?: (evt: SyntheticEvent<any>) => void;
  label?: string;
}

export type AkProfilecardTriggerPosition = 'top left' | 'top right' | 'right top' | 'right bottom' | 'bottom right' | 'bottom left' | 'left bottom' | 'left top';

export interface AkProfilecardTriggerProps {
  position?: AkProfilecardTriggerPosition;
  userId: string;
  cloudId: string;
  actions?: AkProfilecardTriggerActions[];
  resourceClient: AkProfileClient;
  trigger?: 'click' | 'hover';
  analytics?: () => void;
}

export class AkProfilecardTrigger extends PureComponent<AkProfilecardTriggerProps, {}> {}

export function modifyResponse(data: any): any;

export interface AkProfileClientConfig {
  url: string;
  cacheSize?: number;
  cacheMaxAge?: number;
}
