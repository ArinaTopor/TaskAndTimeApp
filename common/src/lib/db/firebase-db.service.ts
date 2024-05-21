import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    CollectionReference,
    DocumentChangeAction,
    DocumentData,
    DocumentReference,
} from '@angular/fire/compat/firestore';
import { IUser } from './interfaces/user.interface';
import { IProject } from './interfaces/project.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { defaultSection } from './models/default.section';
@Injectable({
    providedIn: 'root',
})
export class FirebaseDatabaseService {
    protected user: BehaviorSubject<firebase.default.User | null> =
        new BehaviorSubject<firebase.default.User | null>(null);
    constructor(private _afs: AngularFirestore) {}

    /**
     * function for add user in db
     */
    public addUser(user: firebase.default.User, name: string): void {
        this._afs
            .doc<IUser>('/users/' + user.uid)
            .set({ name: name, email: user.email });
        this.user.next(user);
    }

    /**
     * function for add new project to db
     */
    public addNewProject(project: IProject, userId: string): Promise<void> {
        const newProject: DocumentReference<IProject> = this._afs
            .collection<IProject>(`/userProjects/${userId}/projects`)
            .doc().ref;
        project.id = newProject.id;
        const newSection: CollectionReference<DocumentData> =
            newProject.collection('sections');
        defaultSection.id = newSection.id;
        newSection.add(defaultSection);

        return newProject.set(project);
    }

    /**
     * read collection
     */
    public readProject(
        userId: string
    ): Observable<Array<DocumentChangeAction<IProject>>> {
        return this._afs
            .collection<IProject>(`/projects/${userId}/project/`)
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
}
