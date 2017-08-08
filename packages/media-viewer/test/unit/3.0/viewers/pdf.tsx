import * as React from 'react';
import { shallow } from 'enzyme';
import { createStorybookContext, docFileId } from '@atlaskit/media-test-helpers';
import { PdfViewer } from '../../../../src/3.0/viewers/pdf/';

describe('PDF Viewer', () => {

  const context = createStorybookContext();
  const invalidId = {
    ... docFileId,
    id: 'badId'
  }

  it('should render a PDF', () => {
    const mediaViewer = shallow(
      <PdfViewer
        context={context}
        identifier={docFileId}
        metadata={{
          type: 'file',
          details: {
            id: docFileId.id
          }
        }}
    />);
    expect(mediaViewer.find(PdfViewer)).toHaveLength(0); // TODO
  });

  it('should render an Error', () => {
    const mediaViewer = shallow(
      <PdfViewer
        context={context}
        identifier={invalidId}
        metadata={{
          type: 'file',
          details: {
            id: invalidId.id
          }
        }}
    />);
    expect(mediaViewer.find(PdfViewer)).toHaveLength(0); // TODO
  });

});
