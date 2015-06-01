import mongoose from '../../../libs/mongoose';

const TracksSchema = new mongoose.Schema({
	id: {
		type: Number,
		unique: true,
		required: true
	},
	user_id: Number,
	duration: Number,
	tag_list: String,
	genre: String,
	title: String,
	description: String,
	uri: String,
	permalink_url: String,
	waveform_url: String,
	stream_url: String,
	
});

export default mongoose.model('Tracks', TracksSchema);
