import mongoose from '../../../libs/mongoose';

const UserSchema = new mongoose.Schema({
	id: {
		type: Number,
		unique: true,
		required: true
	},
	username: String,
	avatar_url: String,
	country: String,
	first_name: String,
	last_name: String,
	full_name: String,
	city: String,
	track_count: Number,
	playlist_count: Number,
	followers_count: Number,
	followings_count: Number,
	permalink_url: String,
	uri: String
});

export default mongoose.model('User', UserSchema);
