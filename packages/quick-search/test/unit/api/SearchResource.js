import sinon from 'sinon';
import createMockSearchResource from '../../helpers/mockSearchResource';
import searchResponseData from '../../helpers/mock-search-response-short';

describe('SearchResource', () => {
  const mockResponse = {
    data: {
      Search: [{
        id: 'id',
        type: 'mock.response',
        title: 'wow',
      }],
    },
  };

  let mockSearchResource;

  beforeEach(() => {
    mockSearchResource = createMockSearchResource();
  });

  it('notify all changeListeners of successful search results', (done) => {
    const changeSpyA = sinon.spy();
    const changeSpyB = sinon.spy();
    const errorSpyA = sinon.spy();
    const errorSpyB = sinon.spy();
    mockSearchResource.subscribe('keyA', changeSpyA, errorSpyA);
    mockSearchResource.subscribe('keyB', changeSpyB, errorSpyB);

    mockSearchResource.mock
      .onPost(/\/graphql$/)
      .reply(200, mockResponse);
    mockSearchResource.search('hello');

    setImmediate(() => {
      /* eslint-disable no-unused-expressions */
      expect(changeSpyA.called).to.be.true;
      expect(changeSpyB.called).to.be.true;
      expect(errorSpyA.called).to.be.false;
      expect(errorSpyB.called).to.be.false;
      /* eslint-enable no-unused-expressions */
      done();
    });
  });

  it('notify all errorListeners of search errors', (done) => {
    const changeSpyA = sinon.spy();
    const changeSpyB = sinon.spy();
    const errorSpyA = sinon.spy();
    const errorSpyB = sinon.spy();
    mockSearchResource.subscribe('keyA', changeSpyA, errorSpyA);
    mockSearchResource.subscribe('keyB', changeSpyB, errorSpyB);

    mockSearchResource.mock.onPost(/\/graphql$/).reply(500);
    mockSearchResource.search('hello');

    setImmediate(() => {
      /* eslint-disable no-unused-expressions */
      expect(changeSpyA.called).to.be.false;
      expect(changeSpyB.called).to.be.false;
      expect(errorSpyA.called).to.be.true;
      expect(errorSpyB.called).to.be.true;
      /* eslint-enable no-unused-expressions */
      done();
    });
  });

  // TODO: Something's wrong: axios-mock-adapter not playing nicely with jsdom
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('re/query on each recentItems() call until it receives items', (done) => {
    const changeSpyA = sinon.spy();
    mockSearchResource.subscribe('keyA', changeSpyA);

    mockSearchResource.mock
      .onPost(/\/graphql$/).reply(500)
      .onPost(/\/graphql$/).replyOnce(200, mockResponse);
    mockSearchResource.recentItems();
    mockSearchResource.recentItems();

    setImmediate(() => {
      // eslint-disable-next-line no-unused-expressions
      expect(changeSpyA.called).to.be.true;
      done();
    });
  });

  it('remember recent items for its lifetime', () => {
    const changeSpyA = sinon.spy();
    const requestSpy = sinon.spy(mockSearchResource.queryClient);
    mockSearchResource.subscribe('keyA', changeSpyA);

    mockSearchResource.mock
      .onPost(/\/graphql$/).reply(200, mockResponse);
    mockSearchResource.recentItems();
    mockSearchResource.recentItems();

    setImmediate(() => {
      /* eslint-disable no-unused-expressions */
      expect(changeSpyA.calledOnce).to.be.true;
      expect(requestSpy.calledOnce).to.be.true;
      /* eslint-enable no-unused-expressions */
    });
  });
});

describe('ParsingSearchResource', () => {
  const rawMetaData = [
    { key: 'A', value: 'Apple' },
    { key: 'B', value: 'Banana' },
    { key: 'C', value: 'Carrot' },
  ];

  const parsedMetaData = {
    A: 'Apple',
    B: 'Banana',
    C: 'Carrot',
  };

  let parsingSearchResource;

  beforeEach(() => {
    parsingSearchResource = createMockSearchResource();
  });

  it('formatMetaData() returns correctly formatted meta data', () => {
    expect(parsingSearchResource.formatMetaData(rawMetaData))
      .to.deep.equal(parsedMetaData);
  });

  it('parse() returns correctly formatted results', () => {
    expect(parsingSearchResource.parse(searchResponseData.raw))
      .to.deep.equal(searchResponseData.parsed);
  });
});
