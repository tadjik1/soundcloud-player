import Router from 'koa-router';
import Group from './models/Group';

const router = new Router();

router
	.get('/', function* groupsIndexHandler() {
		this.body = {
			title: 'groups page'
		}
	});

export default router;
export { Group as Group };
