import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ILogin, IRegisterData } from '@atm-project/common';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import {
    BehaviorSubject,
    Observable,
    catchError,
    from,
    of,
    switchMap,
} from 'rxjs';
import { IUserCredential } from '@atm-project/common';
import { updateProfile } from '@angular/fire/auth';

@Injectable()
export class FirebaseAuthService {
    public user$: Observable<firebase.User | null> = this._afAuth.user;
    private _isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    constructor(private _router: Router, private _afAuth: AngularFireAuth) {}
    /**
     * this func for SignIn
     * @param params is email and login from login form
     */
    public async signIn(params: ILogin): Promise<IUserCredential> {
        return this._afAuth.signInWithEmailAndPassword(
            params.email,
            params.password
        );
    }
    /**
     * this is func for save user info in localStorage
     */
    public saveSessionInfo(sessionInfo: IUserCredential): void {
        localStorage.setItem('session', JSON.stringify(sessionInfo));
        this._isAuth.next(true);
    }
    /**
     * function for register user
     * @param params
     * @returns
     */
    public signUp(params: IRegisterData): Observable<void | null> {
        return from(
            this._afAuth.createUserWithEmailAndPassword(
                params.email,
                params.password
            )
        ).pipe(
            switchMap((response) => {
                if (response.user) {
                    return from(
                        updateProfile(response.user, {
                            displayName: params.name,
                        })
                    );
                } else {
                    return of(null);
                }
            }),
            catchError((error) => {
                console.log(
                    'Не удалось зарегистрировать нового пользователя:',
                    error
                );

                return of(null);
            })
        );
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
