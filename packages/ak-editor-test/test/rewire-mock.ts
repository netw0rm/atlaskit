import mocha from 'mocha';
import { expect } from 'chai';
import b, { aVarValue } from './_rewire-mock-b';
import { RewireMock } from '../src';

describe('ak-editor-test rewire-mock', () => {
  const rewireMock = RewireMock();

  it('allows aVar in module a to be mocked', () => {
    rewireMock(b, 'aVar', 'new value');
    expect(aVarValue()).to.equal('new value');
  });
});
