import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ParsingSearchResource } from '../../src/api/SearchResource';
import { SearchClient } from '../../src/common/SearchClient';

export default function createMockSearchResource(options = {}) {
  const mockedAxios = axios.create();
  const mocker = new MockAdapter(mockedAxios, options);

  const mockSearchResource = new ParsingSearchResource({
    userId: 'soldier-strife',
    cloudId: 'final-fantasy-vii',
    searchClient: new SearchClient(mockedAxios),
  });

  mockSearchResource.mock = mocker;

  return mockSearchResource;
}
