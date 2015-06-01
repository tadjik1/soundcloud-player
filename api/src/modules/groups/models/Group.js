import mongoose from '../../../libs/mongoose';

const GroupsSchema = new mongoose.Schema({
	id: {
		type: Number,
		unique: true,
		required: true
	},
	track_count: Number,
	members_count: Number,
	name: String,
	description: String,
	short_description: String,
	uri: String,
	artwork_url: String,
	permalink_url: String,
	creator: {
		id: Number,
		username: String,
		avatar_url: String
	}
});

export default mongoose.model('Groups', GroupsSchema);
