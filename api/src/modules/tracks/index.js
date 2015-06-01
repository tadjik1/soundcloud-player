import Router from 'koa-router';
import Track from './models/Track';

const router = new Router();

router
	.get('/', function* tracksIndexHandler() {
		this.body = {
			title: 'tracks page'
		}
	});

export default router;
export { Track as Track };
