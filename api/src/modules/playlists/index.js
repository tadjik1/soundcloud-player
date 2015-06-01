import Router from 'koa-router';

const router = new Router();

router
	.get('/', function* playlistsIndexHandler() {
		this.body = {
			title: 'playlists page'
		}
	});

export default router;
