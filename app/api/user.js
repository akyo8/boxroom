import apiConfig from './config';

export const login = (email, password) => {
  return fetch(apiConfig.apiUrl + 'user/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
}

export const signup = (user_name, full_name, email, phone, password) => {
  return fetch(apiConfig.apiUrl + 'user/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ user_name, full_name, email, phone, password})
  })
}