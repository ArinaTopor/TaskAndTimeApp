import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ILogin, IRegisterData } from '@atm-project/common';
import { Router } from '@angular/router';
import {
    BehaviorSubject,
    Observable,
    catchError,
    from,
    of,
    switchMap,
} from 'rxjs';
import { IUser } from '@atm-project/common';
import { IUserCredential } from '@atm-project/common';
import { updateProfile } from '@angular/fire/auth';

@Injectable()
export class FirebaseAuthService {
    public user$: BehaviorSubject<IUser | null> =
        new BehaviorSubject<IUser | null>(null);
    private _isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    constructor(private _router: Router, private _afAuth: AngularFireAuth) {}
    /**
     * this func for SignIn
     * @param params is email and login from login form
     */
    public async signIn(params: ILogin): Promise<IUserCredential> {
        //UserCredential only
        return this._afAuth.signInWithEmailAndPassword(
            params.email,
            params.password
        );
    }
    //на уровне модуля мейн получать данные через токен
    /**
     * this is func for save user info in localStorage
     */
    public saveSessionInfo(sessionInfo: IUserCredential): void {
        localStorage.setItem('session', JSON.stringify(sessionInfo));
        this.user$.next({
            uid: sessionInfo.user?.uid,
            email: sessionInfo.user?.email,
            displayName: sessionInfo.user?.displayName,
        });
        this._isAuth.next(true);
        console.log(this.user$.value);
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
