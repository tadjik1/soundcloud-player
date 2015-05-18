/* global describe, it, expect, before */

import UsersStore from '../index';
import { Flux, Actions } from 'flummox';

class MockUsersActions extends Actions {
  searchUsers() {
    return new Promise((resolve, reject) => resolve())
  }
}

class MockFlux extends Flux {
  constructor() {
    super();

    this.createActions('users', MockUsersActions);
  };
}

const flux = new MockFlux();
let store;

describe('users store test cases', () => {
  before('create store instance', () => {
    store = new UsersStore(flux);
  });

  it('should basic api methods consist', () => {
    expect(store).to.have.property('isInProcess');
    expect(store).to.have.property('isAlreadySearched');
    expect(store).to.have.property('getUsersByQuery');
  });
});
