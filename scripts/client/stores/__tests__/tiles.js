/* global describe, it, expect */

import TilesStore from '../tiles';
import { Set } from 'immutable';

describe('tiles store basic interface', () => {
  it('method "getTiles" should exists', () => {
    expect(TilesStore).to
      .have.property('getTiles')
      .that.is.an('function');
  });

  it('method "getTiles" should return instance of Set', () => {
    expect(TilesStore.getTiles()).to.be.an.instanceof(Set);
  });
});
