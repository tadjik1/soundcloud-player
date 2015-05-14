import SC from './utils/SouncloudAPI';

let SCInitializeParams = {
  client_id: '8245587a488fdb47747133be16133e4f',
  redirect_uri: 'http://127.0.0.1:3000/callback'
};

export default function initSC() {
  SC.initialize(SCInitializeParams);
}
