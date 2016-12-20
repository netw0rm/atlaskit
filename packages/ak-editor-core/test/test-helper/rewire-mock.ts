import * as mocha from 'mocha';
import { expect } from 'chai';
import * as b from '../_rewire-mock-b';
import { aVarValue } from '../_rewire-mock-b';
import { RewireMock } from '../../src';

describe('../../../src/test-helper rewire-mock', () => {
  const rewireMock = RewireMock();

  it('allows aVar in module a to be mocked', () => {
    rewireMock(b, 'aVar', 'new value');
    expect(aVarValue()).to.equal('new value');
  });
});
