/* global describe, it, expect, before */

import UsersStore from '../index';
import { Flux, Actions } from 'flummox';
import { compact } from 'lodash';
import { normalizeUserArrayResponse } from '../../../../utils/APIUtils/user';

const exampleResponse = [{id: 1, name: 'test'}];

class MockUsersActions extends Actions {
  searchUsers() {
    return Promise.resolve({response: normalizeUserArrayResponse(exampleResponse)});
  };
}

class MockFlux extends Flux {
  constructor() {
    super();

    this.createActions('usersActions', MockUsersActions);
  };
}

const flux = new MockFlux();
const store = new UsersStore(flux);

describe('users store test cases', () => {
  it('should basic api methods consist', () => {
    expect(store).to.have.property('get');
  });

  it('should return empty state', () => {
    expect(UsersStore.serialize(store.state)).to.equal(JSON.stringify({
      users: {}
    }));
  });

  it('should equal empty state', () => {
    expect(UsersStore.deserialize(JSON.stringify({
      users: {}
    }))).to.deep.equal({users: {}});
  });

  it('should emit change event', async () => {
    const handler = sinon.spy();
    store.addListener('change', handler);

    await flux.getActions('usersActions').searchUsers();

    expect(handler.callCount).to.equal(1);
  });

  it('should contain user with id=1', () => {
      expect(store.get(1)).to.deep.equal({id: 1, name: 'test'});
  });

  it('should merge users', async () => {
    await flux.getActions('usersActions').searchUsers();
    await flux.getActions('usersActions').searchUsers();
    await flux.getActions('usersActions').searchUsers();

    expect(
      [1, 2, 3].map(id => {
        return store.get(id);
      })
    ).to.deep.equal([{id: 1, name: 'test'}, undefined, undefined]);
  });
});
