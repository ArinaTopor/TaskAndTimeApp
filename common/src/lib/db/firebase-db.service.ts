import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { IUser } from './interfaces/user.interface';
import { IProject } from './interfaces/project.interface';
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
     * function for formatted projects data
     */
    public formattedProjectsInfo(userId: string): Observable<IProject[]> {
        return this.readProject(userId).pipe(
            map((actions) =>
                actions.map((a) => {
                    const data: IProject = a.payload.doc.data();

                    return data;
                })
            )
        );
    }
    //метод для получения раздлелов по айди проектов
    //получение задач проекта
    //на обновление использовать функции алены. Передавать путь?
    //игнорировать раздел inbox в проектах
}
