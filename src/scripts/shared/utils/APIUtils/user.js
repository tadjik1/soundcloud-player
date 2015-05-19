import { Schema, arrayOf, normalize } from 'normalizr';

export const user = new Schema('users');

export const normalizeUserResponse = (response) => {
  return Object.assign(
    normalize(response, user)
  );
};

export const normalizeUserArrayResponse = (response) => {
  return Object.assign(
    normalize(response, arrayOf(user))
  );
};
