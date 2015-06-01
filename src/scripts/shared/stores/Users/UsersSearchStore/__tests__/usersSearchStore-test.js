/* global describe, it, expect, before, sinon */

import UsersSearchStore from '../index';
import { Flux, Actions } from 'flummox';

class MockUsersActions extends Actions {
  searchUsers(query) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (query === 'fail') {
          reject({ query });
        } else {
          resolve({
            query,
            response: {
              result: [1, 2, 3]
            }
          });
        }
      }, 100);
    });
  };
}

class MockFlux extends Flux {
  constructor() {
    super();

    this.createActions('users', MockUsersActions);
    this.createStore('usersSearch', UsersSearchStore, this);
  };
}

const flux = new MockFlux();
const store = flux.getStore('usersSearch');

describe('search users store test cases', () => {
  it('should basic api methods consist', () => {
    expect(store).to.have.property('isInProcess');
    expect(store).to.have.property('isAlreadySearched');
    expect(store).to.have.property('getUsersByQuery');
  });

  it('should set state correctly', () => {
    flux.deserialize(JSON.stringify({
      usersSearch: JSON.stringify({
        inProcess: [],
        searched: {
          lala: [99]
        }
      })
    }));

    expect(store.isInProcess('lala')).to.equal(false);
    expect(store.isAlreadySearched('lala')).to.equal(true);
    expect(store.getUsersByQuery('lala')).to.deep.equal([99]);
  });

  it('should handle request', async () => {
    const handler = sinon.spy();
    store.addListener('change', handler);

    await flux.getActions('users').searchUsers('test');

    expect(handler.callCount).to.equal(2);
  });

  it('should handle begin search', async () => {
    flux.getActions('users').searchUsers('test');

    const isInProcess = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(store.isInProcess('test'));
      }, 50);
    });

    expect(isInProcess).to.equal(true);

    // it's for clear our result in future tests
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  });

  it('should handle success search', () => {
    expect(store.getUsersByQuery('test')).to.deep.equal([1, 2, 3]);
  });

  it('should ignore failed search in results', async () => {
    try {
      await flux.getActions('users').searchUsers('fail');
    } catch (ignore) {}

    expect(store.isAlreadySearched('fail')).to.equal(false);
  });

  it('should handle failed search in process', () => {
    expect(store.isInProcess('fail')).to.equal(false);
  });

  it('should return true if we already searched', () => {
    expect(store.isAlreadySearched('test')).to.equal(true);
  });

  it('should return current state', () => {
    expect(flux.serialize()).to.equal('{"usersSearch":"{\\"searched\\":{\\"lala\\":[99],\\"test\\":[1,2,3]},\\"inProcess\\":[]}"}');
  });
});
