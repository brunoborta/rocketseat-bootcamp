import axios from 'axios';

import { host } from '~/utils';

const api = axios.create({ baseURL: `http://${host}:3333` });

export default api;
