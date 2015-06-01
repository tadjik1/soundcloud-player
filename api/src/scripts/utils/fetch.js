import { get } from '../../utils/SoundCloudSdk';

const limit = 50;
let offset = 0;
let users = [];

async function handleRequest(url, response) {
	users = users.concat(response.collection);

	if (response.next_href && offset < 1500) {
		offset = offset + limit;
		return handleRequest(url, await get(url, {
			limit: limit,
			offset: offset,
			linked_partitioning: 1
		}));
	} else {
		return users;
	}
}

export default async function fetch(url) {
	const response = await get(url, {
		limit: limit,
		linked_partitioning: 1
	});

	return handleRequest(url, response);
}
