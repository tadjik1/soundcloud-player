import EventEmmiter from 'eventemitter3';

const CHANGE_EVENT = 'change';

export default class Store extends EventEmmiter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  };

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  };

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  };
}
