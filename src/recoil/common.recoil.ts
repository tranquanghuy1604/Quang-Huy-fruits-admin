import { atom } from 'recoil';

export const loggedState = atom({
  key: 'logged',
  default: false,
});
