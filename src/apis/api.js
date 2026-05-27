import { instance, instanceWithToken } from './axios.js';

export const auth = {
  signup: (data) => instance.post('/auth/signup/', data),
  login: (data) => instance.post('/auth/login/', data),
};

export const previews = {
  list: () => instanceWithToken.get('/previews/'),
  detail: (id) => instanceWithToken.get(`/previews/${id}/`),
  create: (data) => instanceWithToken.post('/previews/', data),
};
