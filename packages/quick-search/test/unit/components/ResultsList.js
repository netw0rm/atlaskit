import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import NoScrollResultsBox from '../../../src/components/NoScrollResultsBox';
import ResultsList from '../../../src/components/ResultsList';
import { ResultParser } from '../../../src/api/result-parser/ResultParser';

describe('<ResulstList />', () => {
  it('should render NoScrollResultsBox on resultsType=\'recent\'', () => {
    const wrapper = shallow(
      <ResultsList
        resultsGroup={{ a: [], b: [] }}
        resultsType="recent"
      />
    );
    expect(wrapper.type()).to.equal(NoScrollResultsBox);
  });

  it('should not render NoScrollResultsBox on resultsType=\'search\'', () => {
    const wrapper = shallow(
      <ResultsList
        resultsGroup={{ a: [], b: [] }}
        resultsType="search"
      />
    );
    expect(wrapper.type()).to.equal('div');
  });

  it('should render results', () => {
    const stubbedResultParser = new ResultParser();
    sinon.stub(stubbedResultParser, 'parse')
      .returns(<div id="stub-result" />);
    const wrapper = shallow(
      <ResultsList
        resultParser={stubbedResultParser}
        resultGroups={{ a: [], b: [] }}
      />
    );
    expect(wrapper.contains(<div id="stub-result" />)).to.equal(true);
  });
});
