import * as React from 'react';
import {
  ComponentClass,
  PureComponent,
  ReactInstance,
  SyntheticEvent,
} from 'react';
import { findDOMNode } from 'react-dom';

import { ProfilecardProvider } from './types';
import {
  AkProfilecardTrigger,
  AkProfilecardTriggerActions,
  AkProfilecardTriggerPosition,
} from '../../utils/profilecard';

export interface Props {
  id: string;
  text: string;
  accessLevel?: string;
  profilecardProvider: ProfilecardProvider;
}

export interface State {
  layerPosition: AkProfilecardTriggerPosition;
}

interface Coords {
  x: number;
  y: number;
}

// tslint:disable-next-line:variable-name
export default function WithProfilecard(Component: ComponentClass<any>): ComponentClass<any> {
  return class WithProfilecardMention extends PureComponent<Props, State> {
    private domNode: HTMLElement | null;
    private profilecardTrigger: ReactInstance | null;
    state: State = { layerPosition: 'bottom left' };

    private updateLayerPosition() {
      if (!this.domNode) {
        return;
      }

      const domNodeCentreCoords = this.getDomNodeCenterCoords();
      const visibleAreaCentreCoords = this.getVisibleAreaCentreCoords();

      const yAxis = domNodeCentreCoords.y > visibleAreaCentreCoords.y ? 'top' : 'bottom';
      const xAxis = domNodeCentreCoords.x > visibleAreaCentreCoords.x ? 'right' : 'left';
      const layerPosition = `${yAxis} ${xAxis}` as AkProfilecardTriggerPosition;

      this.setState({ layerPosition });
    }

    private getDomNodeCenterCoords(): Coords {
      const rect = this.domNode!.getBoundingClientRect();

      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }

    private getVisibleAreaCentreCoords(): Coords {
      return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
    }

    private handleRef = (component: ReactInstance) => {
      if (!component) {
        this.domNode = null;
      } else {
        this.domNode = findDOMNode<HTMLElement>(component);
        this.updateLayerPosition();
      }
    }

    private handleProfileCardTriggerRef = (component: ReactInstance) => {
      this.profilecardTrigger = component || null;
    }

    private getActions(id: string, text: string, accessLevel?: string): AkProfilecardTriggerActions[] {
      const { profilecardProvider } = this.props;
      const actions = profilecardProvider.getActions(id, text, accessLevel);

      return actions.map((action) => {
        return {
          ...action,
          callback: (evt: SyntheticEvent<any>) => {
            action.callback();
            evt.stopPropagation();

            if (this.profilecardTrigger) {
              (this.profilecardTrigger as any).hideProfilecard();
            }
          }
        };
      });
    }

    render() {
      const {
        accessLevel,
        id,
        profilecardProvider,
        text,
      } = this.props;

      const {
        cloudId,
        resourceClient,
      } = profilecardProvider;

      return (
        <AkProfilecardTrigger
          ref={this.handleProfileCardTriggerRef}
          position={this.state.layerPosition}
          cloudId={cloudId}
          userId={id}
          resourceClient={resourceClient}
          trigger="click"
          actions={this.getActions(id, text, accessLevel)}
        >
          <Component
            ref={this.handleRef}
            {...this.props}
          />
        </AkProfilecardTrigger>
      );
    }
  };
}
