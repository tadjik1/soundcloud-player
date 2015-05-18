/* global describe, it, expect, before */

import UsersStore from '../index';
import { Flux, Actions } from 'flummox';

class MockUsersActions extends Actions {
  searchUsers() {
    return Promise.resolve();
  };
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

  it('should return empty state', () => {
    expect(UsersStore.serialize(store.state)).to.equal(JSON.stringify({
      users: {},
      searched: {},
      inProcess: []
    }));
  });

  it('should equal empty state', () => {
    expect(UsersStore.deserialize(JSON.stringify({
      users: {},
      searched: {},
      inProcess: []
    }))).to.deep.equal({
      users: {},
      searched: {},
      inProcess: []
    });
  });

  it('should add "inproccess" entity for request', () => {
    store.handleBeginSearch('lala');

    expect(store.state.inProcess).to.deep.equal(['lala']);
  });

  it('should remove request from "inproccess" entity', () => {
    store.handleFailedSearch({query: 'lala'});

    expect(store.state.inProcess).to.deep.equal([]);
  });
});
