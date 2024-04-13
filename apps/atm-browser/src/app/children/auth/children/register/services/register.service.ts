import { Injectable, inject } from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    updateProfile,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    public firebaseAuth: any = inject(Auth);
    /**
     * This function for register user
     * @param email
     * @param username
     * @param password
     */
    public register(
        email: string,
        username: string,
        password: string
    ): Observable<unknown> {
        const promise: any = createUserWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password
        ).then((response) =>
            updateProfile(response.user, { displayName: username })
        );

        return from(promise);
    }
}
