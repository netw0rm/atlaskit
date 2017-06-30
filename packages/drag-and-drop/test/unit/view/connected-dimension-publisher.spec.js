// @flow
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { makeSelector } from '../../../src/view/dimension-publisher/make-connected-dimension-publisher';
import { MapProps } from '../../../src/view/dimension-publisher/dimension-publisher-types';

const defaultMapProps: MapProps = {
  shouldPublish: false,
};

const shouldPublishMapProps: MapProps = {
  shouldPublish: true,
};

describe('Dimension publisher - connected', () => {
  it('should return the default props when not requested to publish dimensions', () => {
    const selector = makeSelector();

    const result: MapProps = selector.resultFunc(
      'DEFAULT',
      null,
    );

    expect(result).to.deep.equal(defaultMapProps);
  });

  it('should return the default props when the type being requested does not match the current publisher', () => {
    const selector = makeSelector();

    const result: MapProps = selector.resultFunc(
      'MY_TYPE',
      'SOME_OTHER_TYPE',
    );

    expect(result).to.deep.equal(defaultMapProps);
  });

  it('should return that it should publish when the requested type matches', () => {
    const selector = makeSelector();

    const result: MapProps = selector.resultFunc(
      'MY_TYPE',
      'MY_TYPE',
    );

    expect(result).to.deep.equal(shouldPublishMapProps);
  });

  it('should not break memoization on multiple do not publish results', () => {
    const selector = makeSelector();

    // nothing requested
    const result1: MapProps = selector.resultFunc(
      'MY_TYPE',
      null,
    );
    const result2: MapProps = selector.resultFunc(
      'MY_TYPE',
      null,
    );
    // something else requested
    const result3: MapProps = selector.resultFunc(
      'MY_TYPE',
      'NOT_MY_TYPE',
    );
    const result4: MapProps = selector.resultFunc(
      'MY_TYPE',
      'ANOTHER_TYPE_THAT_IS_NOT_MINE',
    );

    // correct result returned?
    expect(result1).to.deep.equal(defaultMapProps);
    // checking object equality
    expect(result1 === result2 === result3 === result4)
      .to.equal(true);
  });
});
