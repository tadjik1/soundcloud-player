import koa from 'koa';
import mount from 'koa-mount';

import users from './modules/users';
import tracks from './modules/tracks';
import playlist from './modules/playlists';
import groups from './modules/groups';

import SC from './utils/SouncloudAPI';

const PORT = 8002;
const SCInitializeParams = {
  client_id: '8245587a488fdb47747133be16133e4f'
};

const app = koa();
SC.initialize(SCInitializeParams);

app.use(function* serverErrorHandler(next) {
	try {
		yield* next;
	} catch (err) {
		console.error(err);

		this.status = err.status || 500;
		this.body = {
			error_message: err.message || 'Internal server error'
		}
	}
});

app.use(mount('/users', users.middleware()));
app.use(mount('/tracks', tracks.middleware()));
app.use(mount('/playlist', playlist.middleware()));
app.use(mount('/groups', groups.middleware()));

app.listen(PORT, () => {
	console.log(`api is working on ${PORT} port`);
});
