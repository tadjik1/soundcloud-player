import keyMirror from 'keymirror';

export default {
  ActionTypes: keyMirror({
    RECEIVE_PLAYLISTS: null,
    RECEIVE_TRACKS: null,
    RECEIVE_USERS: null,

    // search page section
    UPDATE_QUERY: null,
    UPDATE_TYPE: null,
    RECEIVE_RESULTS: null,

    // user store
    FETCHED_TYPE_USER: null,

    // tracks store
    FETCHED_TYPE_TRACK: null,

    // groups store
    FETCHED_TYPE_GROUP: null
  }),

  DataTypes: keyMirror({
    TYPE_TRACK: null,
    TYPE_GROUP: null,
    TYPE_USER: null
  })
};
