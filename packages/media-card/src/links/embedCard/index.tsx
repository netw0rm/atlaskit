import * as React from 'react';
import {Wrapper, Iframe} from './styled';

export interface EmbedCardProps {

  url?: string;
  html?: string;

  aspectRatio?: number;
  width?: number;
  height?: number;

}

export interface EmbedCardState {
}

export class EmbedCard extends React.Component<EmbedCardProps, EmbedCardState> {

  private iframeElement: HTMLIFrameElement;

  private handleMount = element => {
    this.iframeElement = element;
    this.renderHTML();
  }

  private renderHTML() {
    const {html = ''} = this.props;

    if (!this.iframeElement) {
      return;
    }
    setTimeout(() => {
      const doc = this.iframeElement.contentWindow.document;
      doc.open();
      doc.write(html);
      doc.close();
    }, 0);
  }

  componentDidUpdate() {
    this.renderHTML();
  }

  renderIframe() {
    const {url, html} = this.props;

    if (url) {
      return (
        <Iframe src={url} allowFullScreen={true}/>
      );
    }

    if (html) {
      return (
        <Iframe innerRef={this.handleMount}/>
      );
    }

    throw new Error('Embed URL or HTML must be provided.');
  }

  render() {
    const {aspectRatio, width, height} = this.props;
    return (
      <Wrapper aspectRatio={aspectRatio} width={width} height={height}>
        {this.renderIframe()}
      </Wrapper>
    );
  }

}
