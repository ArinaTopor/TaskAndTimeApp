import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { ILogin } from '../../../interfaces/login.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public firebaseAuth: any = inject(Auth);
    /**
     * This function for register user
     * @param email
     * @param password
     */
    public login(params: ILogin): Observable<unknown> {
        return of({});
    }
}
