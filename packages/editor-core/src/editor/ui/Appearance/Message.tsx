import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import PluginSlot from '../PluginSlot';
import WithPluginState from '../WithPluginState';
import { EditorAppearanceComponentProps, EditorAppearance } from '../../types';
import { pluginKey as maxContentSizePluginKey } from '../../plugins/max-content-size';

const pulseBackground = keyframes`
  50% {
    background-color: #FF8F73;
  }
`;

const pulseBackgroundReverse = keyframes`
  0% {
    background-color: #FF8F73;
  }
  50% {
    background-color: auto;
  }
  100% {
    background-color: #FF8F73;
  }
`;

export interface MessageEditorProps {
  isMaxContentSizeReached?: boolean;
}

// tslint:disable-next-line:variable-name
const MessageEditor: any = styled.div`
  display: flex;
  border: 1px solid ${(props: MessageEditorProps) => props.isMaxContentSizeReached ? '#FF8F73' : '#C1C7D0' };
  border-radius: 3px;
  height: auto;
  min-height: 30px;
  max-height: 305px;
  max-width: inherit;
  box-sizing: border-box;
  word-wrap: break-word;
  animation: ${(props: any) => props.isMaxContentSizeReached ? `.25s ease-in-out ${pulseBackground}` : 'none'};

  &.-flash {
    animation: .25s ease-in-out ${pulseBackgroundReverse};
  }

  div > .ProseMirror {
    outline: none;
    white-space: pre-wrap;
    padding: 0;
    margin: 0;
  }
`;

// tslint:disable-next-line:variable-name
const ContentArea = styled.div`
  height: 100%;
  padding: 4px 16px 4px 8px;
  flex-grow: 1;
  overflow: hidden;
  overflow-y: auto;
`;

// tslint:disable-next-line:variable-name
const SecondaryToolbarContainer = styled.div`
  padding: 2px 4px 0 0;
  margin-bottom: -2px;
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: flex-start;
  flex-shrink: 0;
  display: flex;
`;

export default class Editor extends React.Component<EditorAppearanceComponentProps, any> {
  static displayName = 'MessageEditor';
  private flashToggle = false;

  private appearance: EditorAppearance = 'message';

  private handleRef = ref => {
    if (this.props.onUiReady) {
      this.props.onUiReady(ref);
    }
  }

  private renderChrome = ({ maxContentSize }) => {
    const { editorView, contentComponents, secondaryToolbarComponents, providerFactory } = this.props;
    const maxContentSizeReached = maxContentSize && maxContentSize.maxContentSizeReached;
    this.flashToggle = maxContentSizeReached && !this.flashToggle;

    return (
      <MessageEditor className={this.flashToggle ? '-flash' : ''} isMaxContentSizeReached={maxContentSizeReached}>
        <ContentArea innerRef={this.handleRef}>
          <PluginSlot
            editorView={editorView}
            providerFactory={providerFactory}
            appearance={this.appearance}
            items={contentComponents}
          />
        </ContentArea>
        <SecondaryToolbarContainer>
          <PluginSlot
            editorView={editorView}
            providerFactory={providerFactory}
            appearance={this.appearance}
            items={secondaryToolbarComponents}
          />
        </SecondaryToolbarContainer>
      </MessageEditor>
    );
  }

  render() {
    const { eventDispatcher, editorView } = this.props;

    return (
      <WithPluginState
        editorView={editorView}
        eventDispatcher={eventDispatcher}
        plugins={{ maxContentSize: maxContentSizePluginKey }}
        render={this.renderChrome}
      />
    );
  }
}
