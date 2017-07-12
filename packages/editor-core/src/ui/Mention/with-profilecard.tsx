import * as React from 'react';
import { ComponentClass, PureComponent, ReactInstance } from 'react';
import { findDOMNode } from 'react-dom';

import { ProfilecardProvider } from './types';
import {
  AkProfilecardTrigger,
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

    render() {
      const {
        accessLevel,
        id,
        profilecardProvider,
        text,
      } = this.props;

      const {
        getActions,
        cloudId,
        resourceClient,
      } = profilecardProvider;

      return (
        <AkProfilecardTrigger
          position={this.state.layerPosition}
          cloudId={cloudId}
          userId={id}
          resourceClient={resourceClient}
          trigger="click"
          actions={getActions(id, text, accessLevel)}
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
