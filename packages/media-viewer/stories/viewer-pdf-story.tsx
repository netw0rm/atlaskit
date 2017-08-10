import * as React from 'react';
import { storiesOf } from '@kadira/storybook';
import { createStorybookContext, docFileId, largePdfFileId, passwordProtectedPdfFileId } from '@atlaskit/media-test-helpers';
import {PdfViewer} from '../src/3.0/viewers/pdf';

const context = createStorybookContext();

const badFileId = {
  ...largePdfFileId,
  id: 'badId'
};

storiesOf('Viewers: PDF', {})
 .add('PDF View', () => (
    <PdfViewer
      context={context}
      identifier={docFileId}
      metadata={{
        type: 'file',
        details: {
          id: docFileId.id
        }
      }}
    />
  ))
 .add('Large PDF (100MB)', () => (
    <PdfViewer
      context={context}
      identifier={largePdfFileId}
      metadata={{
        type: 'file',
        details: {
          id: largePdfFileId.id
        }
      }}
    />
  ))
 .add('Not Found Error', () => (
    <PdfViewer
      context={context}
      identifier={badFileId}
      metadata={{
        type: 'file',
        details: {
          id: badFileId.id
        }
      }}
    />
  ))
 .add('Password protected PDF - not implemented, will throw', () => (
    <PdfViewer
      context={context}
      identifier={passwordProtectedPdfFileId}
      metadata={{
        type: 'file',
        details: {
          id: passwordProtectedPdfFileId.id
        }
      }}
    />
  ));
