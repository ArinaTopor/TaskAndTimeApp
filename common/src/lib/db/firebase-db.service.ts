import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IUser } from './interfaces/user.interface';
@Injectable({
    providedIn: 'root',
})
export class FirebaseDatabaseService {
    constructor(private _afs: AngularFirestore) {}

    /**
     * function for add user in db
     */
    public addUser(user: firebase.default.User, name: string): void {
        this._afs
            .doc<IUser>('/users/' + user.uid)
            .set({ name: name, email: user.email });
    }
}
