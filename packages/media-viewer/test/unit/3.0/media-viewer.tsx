import * as React from 'react';
import { shallow } from 'enzyme';
import { createStorybookContext, wideImageFileId, docFileId } from '@atlaskit/media-test-helpers';
import {
  MediaViewer
} from '../../../src/3.0';
import { ImageViewer } from '../../../src/3.0/viewers/image/';

describe('<MediaViewer />', () => {

  const context = createStorybookContext();

  it('should render an image in MediaViewer', () => { // TODO
    const mediaViewer = shallow(
      <MediaViewer
        context={context}
        navigation={{
          initialItem: wideImageFileId
        }}
    />);
    expect(mediaViewer.find(ImageViewer)).toHaveLength(0);
  });

  it('should render a PDF in MediaViewer', () => { // TODO
    const mediaViewer = shallow(
      <MediaViewer
        context={context}
        navigation={{
          initialItem: docFileId
        }}
    />);
    expect(mediaViewer.find(ImageViewer)).toHaveLength(0);
  });
});
