/* tslint:disable:variable-name */
import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align:center;
  height: 100%;
`;

export const ViewerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: scroll;

  .textLayer {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    opacity: 0.2;
    line-height: 1.0;
  }

  .textLayer > div {
    color: transparent;
    position: absolute;
    white-space: pre;
    cursor: text;
    -webkit-transform-origin: 0% 0%;
    -moz-transform-origin: 0% 0%;
    -o-transform-origin: 0% 0%;
    -ms-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }

  .textLayer .highlight {
    margin: -1px;
    padding: 1px;

    background-color: rgb(180, 0, 170);
    border-radius: 4px;
  }

  .textLayer .highlight.begin {
    border-radius: 4px 0px 0px 4px;
  }

  .textLayer .highlight.end {
    border-radius: 0px 4px 4px 0px;
  }

  .textLayer .highlight.middle {
    border-radius: 0px;
  }

  .textLayer .highlight.selected {
    background-color: rgb(0, 100, 0);
  }

  .textLayer ::selection { background: rgb(0,0,255); }
  .textLayer ::-moz-selection { background: rgb(0,0,255); }

  .textLayer .endOfContent {
    display: block;
    position: absolute;
    left: 0px;
    top: 100%;
    right: 0px;
    bottom: 0px;
    z-index: -1;
    cursor: default;
    -webkit-user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
  }

  .textLayer .endOfContent.active {
    top: 0px;
  }


  .annotationLayer section {
    position: absolute;
  }

  .annotationLayer .linkAnnotation > a {
    position: absolute;
    font-size: 1em;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .annotationLayer .linkAnnotation > a /* -ms-a */  {
    background: url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7") 0 0 repeat;
  }

  .annotationLayer .linkAnnotation > a:hover {
    opacity: 0.2;
    background: #ff0;
    box-shadow: 0px 2px 10px #ff0;
  }

  .annotationLayer .textAnnotation img {
    position: absolute;
    cursor: pointer;
  }

  .annotationLayer .textWidgetAnnotation input,
  .annotationLayer .textWidgetAnnotation textarea,
  .annotationLayer .choiceWidgetAnnotation select,
  .annotationLayer .buttonWidgetAnnotation.checkBox input,
  .annotationLayer .buttonWidgetAnnotation.radioButton input {
    background-color: rgba(0, 54, 255, 0.13);
    border: 1px solid transparent;
    box-sizing: border-box;
    font-size: 9px;
    height: 100%;
    padding: 0 3px;
    vertical-align: top;
    width: 100%;
  }

  .annotationLayer .textWidgetAnnotation textarea {
    font: message-box;
    font-size: 9px;
    resize: none;
  }

  .annotationLayer .textWidgetAnnotation input[disabled],
  .annotationLayer .textWidgetAnnotation textarea[disabled],
  .annotationLayer .choiceWidgetAnnotation select[disabled],
  .annotationLayer .buttonWidgetAnnotation.checkBox input[disabled],
  .annotationLayer .buttonWidgetAnnotation.radioButton input[disabled] {
    background: none;
    border: 1px solid transparent;
    cursor: not-allowed;
  }

  .annotationLayer .textWidgetAnnotation input:hover,
  .annotationLayer .textWidgetAnnotation textarea:hover,
  .annotationLayer .choiceWidgetAnnotation select:hover,
  .annotationLayer .buttonWidgetAnnotation.checkBox input:hover,
  .annotationLayer .buttonWidgetAnnotation.radioButton input:hover {
    border: 1px solid #000;
  }

  .annotationLayer .textWidgetAnnotation input:focus,
  .annotationLayer .textWidgetAnnotation textarea:focus,
  .annotationLayer .choiceWidgetAnnotation select:focus {
    background: none;
    border: 1px solid transparent;
  }

  .annotationLayer .textWidgetAnnotation input.comb {
    font-family: monospace;
    padding-left: 2px;
    padding-right: 0;
  }

  .annotationLayer .textWidgetAnnotation input.comb:focus {
    /*
     * Letter spacing is placed on the right side of each character. Hence, the
     * letter spacing of the last character may be placed outside the visible
     * area, causing horizontal scrolling. We avoid this by extending the width
     * when the element has focus and revert this when it loses focus.
     */
    width: 115%;
  }

  .annotationLayer .buttonWidgetAnnotation.checkBox input,
  .annotationLayer .buttonWidgetAnnotation.radioButton input {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
  }

  .annotationLayer .popupWrapper {
    display: none;
    position: absolute;
    width: 20em;
  }

  .annotationLayer .popup {
    position: absolute;
    z-index: 200;
    max-width: 20em;
    background-color: #FFFF99;
    box-shadow: 0px 2px 5px #333;
    border-radius: 2px;
    padding: 0.6em;
    margin-left: 5px;
    cursor: pointer;
    word-wrap: break-word;
  }

  .annotationLayer .popup h1 {
    font-size: 1em;
    border-bottom: 1px solid #000000;
    padding-bottom: 0.2em;
  }

  .annotationLayer .popup p {
    padding-top: 0.2em;
  }

  .annotationLayer .highlightAnnotation,
  .annotationLayer .underlineAnnotation,
  .annotationLayer .squigglyAnnotation,
  .annotationLayer .strikeoutAnnotation,
  .annotationLayer .lineAnnotation svg line,
  .annotationLayer .fileAttachmentAnnotation {
    cursor: pointer;
  }

  .pdfViewer .canvasWrapper {
    overflow: hidden;
  }

  .pdfViewer .page {
    direction: ltr;
    width: 816px;
    height: 1056px;
    margin: 16px auto;
    position: relative;
    overflow: visible;
    background-clip: content-box;
    background-color: white;
  }

  .pdfViewer.removePageBorders .page {
    margin: 0px auto 10px auto;
    border: none;
  }

  .pdfViewer.singlePageView {
    display: inline-block;
  }

  .pdfViewer.singlePageView .page {
    margin: 0;
    border: none;
  }

  .pdfViewer .page canvas {
    margin: 0;
    display: block;
  }

  .pdfViewer .page canvas[hidden] {
    display: none;
  }

  .pdfViewer .page .loadingIcon {
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    // background: url('images/loading-icon.gif') center no-repeat;
  }

  .pdfPresentationMode:-webkit-full-screen .pdfViewer .page {
    margin-bottom: 100%;
    border: 0;
  }

  .pdfPresentationMode:-moz-full-screen .pdfViewer .page {
    margin-bottom: 100%;
    border: 0;
  }

  .pdfPresentationMode:-ms-fullscreen .pdfViewer .page {
    margin-bottom: 100% !important;
    border: 0;
  }

  .pdfPresentationMode:fullscreen .pdfViewer .page {
    margin-bottom: 100%;
    border: 0;
  }
`;
