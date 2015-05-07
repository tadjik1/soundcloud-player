import routes from './routes';
import {
  create as createRouter,
  HistoryLocation
} from 'react-router';

export default createRouter({routes, location: HistoryLocation});
