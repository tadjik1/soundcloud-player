import keyMirror from 'keymirror';

export default {
  ActionTypes: keyMirror({
    RECEIVE_PLAYLISTS: null,
    RECEIVE_TRACKS: null,
    RECEIVE_USERS: null,
    RECEIVE_GROUPS: null,

    // search page section
    UPDATE_QUERY: null,
    UPDATE_TYPE: null,
    RECEIVE_RESULTS: null,

    // user store
    FETCHED_TYPE_USER: null,

    // tracks store
    FETCHED_TYPE_TRACK: null,

    // groups store
    FETCHED_TYPE_GROUP: null,

    //user actions
    USER_LOGIN: null,
    RECEIVE_USER_INFO: null,
    USER_LOGOUT: null
  }),

  DataTypes: keyMirror({
    TRACKS: null,
    GROUPS: null,
    USERS: null
  })
};
