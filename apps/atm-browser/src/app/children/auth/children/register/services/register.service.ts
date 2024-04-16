import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IRegisterData } from '../interfaces/register.interface';
import {
    updateProfile,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class SignUpService {
    // private _firebaseAuth: Auth = inject(Auth);
    public userName: string | undefined;
    constructor(public afAuth: AngularFireAuth, private _router: Router) {}
    /**
     * function for signUp
     */
    public signUp(params: IRegisterData): Observable<void> {
        const promise: Promise<void> = this.afAuth
            .createUserWithEmailAndPassword(params.email, params.password)
            .then((response) => {
                response.user
                    ? updateProfile(response.user, { displayName: params.name })
                    : response;
                console.log(response.user);
            })
            .catch((error) => console.log(error));
        // this.afAuth.createUserWithEmailAndPassword(params.email,
        //     params.password).then(response => {response.user?.displayName = params.name }));

        return from(promise);
    }
}
