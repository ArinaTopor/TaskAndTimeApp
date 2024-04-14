import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ILogin } from '../../../interfaces/login.interface';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../../../interfaces/user.interface';

@Injectable()
export class SignInService {
    public user!: IUser;
    private _isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    constructor(private _router: Router, private _afAuth: AngularFireAuth) {}
    /**
     * this func for SignIn
     * @param params
     */
    public async signIn(params: ILogin): Promise<firebase.auth.UserCredential> {
        return this._afAuth.signInWithEmailAndPassword(
            params.email,
            params.password
        );
    }
    /**
     * this is func for save user info in localStorage
     */
    public saveSessionInfo(sessionInfo: firebase.auth.UserCredential): void {
        localStorage.setItem('session', JSON.stringify(sessionInfo));
        this.user = {
            uid: sessionInfo.user?.uid,
            email: sessionInfo.user?.email,
            displayName: sessionInfo.user?.displayName,
        };
        this._isAuth.next(true);
    }
    /**
     * function for signOut
     */
    public signOut(): void {
        localStorage.removeItem('session');
        this._isAuth.next(false);
        this._router.navigate(['auth']);
    }
}
