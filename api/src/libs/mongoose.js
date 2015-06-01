import mongoose from 'mongoose';

mongoose.set('debug', true);
mongoose.connect(
	'mongodb://localhost/soundcloud-api',
	{
		server: {
			socketOptions: {
				keepAlive: 1
			}
		}
	}
);

export default mongoose;
