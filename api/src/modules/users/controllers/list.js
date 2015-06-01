import { get } from '../../../utils/SoundCloudSdk';
import User from '../models/User';

export default function* usersList() {
	const users = yield get('/users.json');
	this.body = users;

	try {
		User.create(users);
	} catch (err) {
		console.error(err);
	}
}
