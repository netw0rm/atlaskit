import { Component, PureComponent } from 'react';

export type EventMap = {
  [eventName: string]: string | Function,
};

export type EventMapOrFunction =
  | EventMap
  | ((
      fireAnalyticsEvent: (eventName: string, eventData?: Object) => void
    ) => EventMap);

export type AnalyticsProps = {
  analyticsId?: string,
  analyticsData?: Object,
  innerRef?: Function,
};

export declare function withAnalytics<C>(component: C, map?: EventMapOrFunction, defaultProps?: AnalyticsProps): C;

export type FireAnalyticsEvent = (name: string, data: Object) => any;

export interface AnalyticsListenerProps {
  onEvent: (eventName: string, eventData: Object) => any;
  match?: string | ((name: string) => boolean);
  matchPrivate?: boolean;
}

export class AnalyticsListener extends Component<AnalyticsListenerProps, {}> { }
