/* global describe, it, expect, before */

import UsersSearchStore from '../index';
import { Flux, Actions } from 'flummox';
import { compact } from 'lodash';
import { normalizeUserArrayResponse } from '../../../../utils/APIUtils/user';

const exampleResponse = [{id: 1, name: 'test'}];

class MockUsersActions extends Actions {
  searchUsers(query) {
    return Promise.resolve({
      query,
      response: normalizeUserArrayResponse(exampleResponse)
    });
  };
}

class MockFlux extends Flux {
  constructor() {
    super();

    this.createActions('users', MockUsersActions);
  };
}

const flux = new MockFlux();
const store = new UsersSearchStore(flux);

describe('search users store test cases', () => {
  it('should basic api methods consist', () => {
    expect(store).to.have.property('isInProcess');
    expect(store).to.have.property('isAlreadySearched');
    expect(store).to.have.property('getUsersByQuery');
  });

  it('should return array allways', () => {
    expect(store.getUsersByQuery('')).to.deep.equal([]);
  });

  it('should handle begin request', async () => {
    const handler = sinon.spy();
    store.addListener('change', handler);

    await flux.getActions('users').searchUsers('lala');

    expect(handler.callCount).to.equal(1);
  });

  xit('should handle server request', async () => {
    await flux.getActions('users').searchUsers();

    expect(store.getUsersByQuery('lala')).to.deep.equal([1]);
  });
});
