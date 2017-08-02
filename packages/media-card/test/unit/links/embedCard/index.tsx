import * as React from 'react';
import {shallow} from 'enzyme';
import {EmbedCard} from '../../../../src/links/embedCard';
import {Iframe} from '../../../../src/links/embedCard/styled';

describe('EmbedCard', () => {

  describe('.render()', () => {

    it('should render an iframe with src when a URL is provided', () => {
      const url = 'http://google.com/';
      const element = shallow(<EmbedCard url={url}/>);
      expect(element.find(Iframe).prop('src')).toEqual(url);
    });

    it('should render an iframe with innerRef when some HTML is provided', () => {
      const element = shallow(<EmbedCard html="<h1>Hello World!</h1>"/>);
      expect(element.find(Iframe).prop('innerRef')).toEqual(expect.any(Function));
    });

  });

});
