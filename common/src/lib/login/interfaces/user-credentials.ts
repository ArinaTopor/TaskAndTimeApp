import firebase from 'firebase/compat/app';
export interface IUserCredential {
    user: firebase.User | null;
    credential: firebase.auth.AuthCredential | null;
}
