import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { IUser } from './interfaces/user.interface';
import { IProject, ISection } from './interfaces/project.interface';
import { Observable, map } from 'rxjs';
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
    /**
     * function for get projects from db
     */
    public readProject(
        userId: string
    ): Observable<Array<DocumentChangeAction<IProject>>> {
        return this._afs
            .collection<IProject>(`userProjects/${userId}/projects/`)
            .snapshotChanges();
    }

    /**
     * function for data formatted projects, sections...
     */
    public formattedData<T>(
        observerData: Observable<Array<DocumentChangeAction<T>>>
    ): Observable<T[]> {
        return observerData.pipe(
            map((actions) =>
                actions.map((a) => {
                    const data: T = a.payload.doc.data();
                    console.log(data);

                    return data;
                })
            )
        );
    }

    /**
     * function for get sections of project from db
     */
    public getSectionsProject(
        userId: string,
        projectId: string
    ): Observable<Array<DocumentChangeAction<ISection>>> {
        return this._afs
            .collection<ISection>(
                `userProjects/${userId}/projects/${projectId}/sections`
            )
            .snapshotChanges();
    }
}
