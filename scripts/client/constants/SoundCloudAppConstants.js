import keyMirror from 'keymirror';

export default {
  ActionTypes: keyMirror({
    RECEIVE_PLAYLISTS: null,
    RECEIVE_TRACKS: null,
    RECEIVE_USERS: null,
    USER_LOGIN: null,
    USER_LOGOUT: null
  })
};
