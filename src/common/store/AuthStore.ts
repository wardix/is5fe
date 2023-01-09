import { atom } from 'jotai';
export const isAuthenticatedAtom = atom<boolean>(false);
export const userProfileAtom = atom<null | any>({ isAuthenticated: true });
