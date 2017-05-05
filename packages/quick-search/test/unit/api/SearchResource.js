import sinon from 'sinon';
import searchResponseData from '../../helpers/mock-search-response-short';
import { ParsingSearchResource } from '../../../src/api/SearchResource';

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

  let searchResource;

  beforeEach(() => {
    searchResource = new ParsingSearchResource({
      userId: '13',
      cloudId: 'final-fantasy-vii',
    });
  });

  it('notify all changeListeners of successful search results', (done) => {
    const changeSpyA = sinon.spy();
    const changeSpyB = sinon.spy();
    const errorSpyA = sinon.spy();
    const errorSpyB = sinon.spy();
    searchResource.subscribe('keyA', changeSpyA, errorSpyA);
    searchResource.subscribe('keyB', changeSpyB, errorSpyB);

    sinon.stub(searchResource, 'queryClient').returns(Promise.resolve(mockResponse));
    searchResource.search('hello');

    setImmediate(() => {
      expect(changeSpyA.calledWith('search', mockResponse)).to.equal(true);
      expect(changeSpyB.calledWith('search', mockResponse)).to.equal(true);
      expect(errorSpyA.called).to.equal(false);
      expect(errorSpyB.called).to.equal(false);
      done();
    });
  });

  it('notify all errorListeners of search errors', (done) => {
    const changeSpyA = sinon.spy();
    const changeSpyB = sinon.spy();
    const errorSpyA = sinon.spy();
    const errorSpyB = sinon.spy();
    searchResource.subscribe('keyA', changeSpyA, errorSpyA);
    searchResource.subscribe('keyB', changeSpyB, errorSpyB);

    sinon.stub(searchResource, 'queryClient').returns(Promise.reject());
    searchResource.search('hello');

    setImmediate(() => {
      expect(changeSpyA.called).to.equal(false);
      expect(changeSpyB.called).to.equal(false);
      expect(errorSpyA.called).to.equal(true);
      expect(errorSpyB.called).to.equal(true);
      done();
    });
  });

  // TODO: Something's wrong: axios-mock-adapter not playing nicely with jsdom
  it('re/query on each recentItems() call until it receives items', (done) => {
    const changeSpyA = sinon.spy();
    searchResource.subscribe('keyA', changeSpyA);

    sinon.stub(searchResource, 'queryClient')
      .onFirstCall()
      .returns(Promise.reject())
      .onSecondCall()
      .returns(Promise.resolve(mockResponse));
    searchResource.recentItems();
    searchResource.recentItems();

    setImmediate(() => {
      expect(changeSpyA.called).to.equal(true);
      done();
    });
  });

  it('remember recent items for its lifetime', () => {
    const changeSpyA = sinon.spy();
    const requestSpy = sinon.spy(searchResource.queryClient);
    searchResource.subscribe('keyA', changeSpyA);

    sinon.stub(searchResource, 'queryClient').returns(Promise.resolve(mockResponse));
    searchResource.recentItems();
    searchResource.recentItems();

    setImmediate(() => {
      expect(changeSpyA.calledOnce).to.equal(true);
      expect(requestSpy.calledOnce).to.equal(true);
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
    parsingSearchResource = new ParsingSearchResource({
      userId: '13',
      cloudId: 'final-fantasy-vii',
    });
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
