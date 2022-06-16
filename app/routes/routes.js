import { create } from 'apisauce';

export const mainURL = create({
  baseURL: 'https://lzone.secret-agents.ru/api/v2'
})

export const api = {
  auth (email, password) {
    return mainURL.post('/auth/sign_in', { email, password });
  },
  news: mainURL.get('/news'),
  selectedNews (newsId) {
    return mainURL.get(`/news/${newsId}`);
  }
}

export const requestTransform = (authData) => {
  if (authData) {
    mainURL.addRequestTransform(request => {
      request.headers['access-token'] = authData.accessToken
      request.headers['client'] = authData.client
      request.headers['uid'] = authData.uid
    })
  }
}
