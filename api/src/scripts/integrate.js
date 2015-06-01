import { User } from '../modules/users';
import { Group } from '../modules/groups';
import { Track } from '../modules/tracks';
import SC from '../utils/SouncloudAPI';

import fetch from './utils/fetch';

const SCInitializeParams = {
  client_id: '8245587a488fdb47747133be16133e4f'
};

SC.initialize(SCInitializeParams);

fetch('/users.json').then((users) => {
	return Promise.all([users, fetch('/groups.json')]);
}).then(([users, groups]) => {
	console.log(users, groups);
	return Promise.all([users, groups, fetch('/tracks.json')]);
}).then(([users, groups, tracks]) => {
	console.log(users, groups, tracks);
	return Promise.all([
		User.create(users),
		Group.create(groups),
		Track.create(tracks)
	]);
}).then(([users, groups, tracks]) => {
	console.log(`all ok, all data saved. there are ${users.length + groups.length + tracks.length} records`);
	process.exit(0);
}).catch((err) => {
	console.error(err);
	process.exit(255);
});
