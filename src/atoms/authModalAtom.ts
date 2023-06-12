import {atom} from 'recoil';

type AuthModalAtomState = {
    isOpen: boolean;
    type: 'login' | 'register' | 'forgotPassword';
};

const initialAuthModalState: AuthModalAtomState = {
    isOpen: false,
    type: 'login',
};
export const authModalState = atom<AuthModalAtomState>({
    key: 'authModalState',
    default: initialAuthModalState,
});