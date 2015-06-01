import Router from 'koa-router';

import list from './controllers/list';
import show from './controllers/show';
import User from './models/User';

const router = new Router();

router
	.get('/', list)
	.get('/:id', show);

export default router;

export { User as User };
