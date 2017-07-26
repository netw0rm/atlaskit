import * as React from 'react';
import { shallow } from 'enzyme';

import { LinkCardImageView } from '../../../src/links/cardImageView';
import { Href } from '../../../src/utils/href';

describe('LinkCardImageView', () => {
  const title = 'Hello world';
  const linkUrl = 'http://localhost:9001/';

  describe('.render', () => {
    it('should not render a link tag when status is "loading"', () => {
      const card = shallow(<LinkCardImageView title={title} linkUrl={linkUrl} status="loading" />);
      expect(card.find(Href)).toHaveLength(0);
    });

    it('should not render a link tag when status is "processing"', () => {
      const card = shallow(<LinkCardImageView title={title} linkUrl={linkUrl} status="processing" />);
      expect(card.find(Href)).toHaveLength(0);
    });

    it('should not render a link tag when error is truthy', () => {
      const card = shallow(<LinkCardImageView title={title} linkUrl={linkUrl} status="error" error="some error message" />);
      expect(card.find(Href)).toHaveLength(0);
    });

    it('should render a link tag when status is "complete"', () => {
      const card = shallow(<LinkCardImageView title={title} linkUrl={linkUrl} status="complete" />);
      expect(card.find(Href)).toHaveLength(1);
    });
  });
});
