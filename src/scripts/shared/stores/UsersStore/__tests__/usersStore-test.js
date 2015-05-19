/* global describe, it, expect, before */

import UsersStore from '../index';
import { Flux, Actions } from 'flummox';
import Immutable, { Map, Set, List } from 'immutable';

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

const defaultState = {
  users: new Map(),
  searched: new Map(),
  inProcess: new Set()
};

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
    }))).to.deep.equal(defaultState);
  });

  it('should add "inproccess" entity for request', () => {
    store.handleBeginSearch('lala');

    expect(store.state.inProcess.has('lala')).to.equal(true);
  });

  it('should return true because this request in que', () => {
    expect(store.isInProcess('lala')).to.equal(true);
  });

  it('should remove request from "inproccess" entity', () => {
    store.handleFailedSearch({query: 'lala'});

    expect(store.state.inProcess.has('lala')).to.equal(false);
  });


  describe('success handler logic', () => {
    before('create success request', () => {
      store.handleBeginSearch('newQuery');
      store.handleSuccessSearch({query: 'newQuery', response: {
        entities: {},
        result: []
      }});
    });

    it('should remove "inproccess" entity for request', () => {
      expect(store.isInProcess('newQuery')).to.equal(false);
    });

    it('should add "searched" entity for request', () => {
      expect(store.isAlreadySearched('newQuery')).to.equal(true);
    });

    it('should return empty array of users', () => {
      expect(Immutable.is(store.getUsersByQuery('newQuery'), new List())).to.equal(true);
    });
  });
});
