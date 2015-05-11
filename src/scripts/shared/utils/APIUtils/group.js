import { Schema, arrayOf, normalize } from 'normalizr';
import { user } from './user';

export const group = new Schema('groups');

group.define({
  creator: user
});

export const normalizeGroupResponse = (response) => {
  return Object.assign(
    normalize(response, group)
  );
};

export const normalizeGroupArrayResponse = (response) => {
  return Object.assign(
    normalize(response, arrayOf(group))
  );
};

