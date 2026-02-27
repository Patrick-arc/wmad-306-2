import axios from 'axios';
import { route } from 'ziggy-js';

// Configure Axios globally
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Expose Ziggy route helper globally (use global Ziggy from Blade)
window.route = (name, params, absolute) => route(name, params, absolute, Ziggy);
