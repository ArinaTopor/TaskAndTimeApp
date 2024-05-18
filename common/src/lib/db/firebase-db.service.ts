import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreDocument,
    DocumentReference,
    DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { IUser } from './interfaces';
import { ITask } from './interfaces';
import { IProject, ISection } from './interfaces/project.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';
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
     * Добавляем задачу на сервер
     */
    public addNewTask(task: ITask, userId: string): Promise<void> {
        const newTodoRef: DocumentReference<ITask> = this._afs
            .collection<ITask>(`/userProjects/${userId}/todos`)
            .doc().ref;
        task.id = newTodoRef.id;

        return newTodoRef.set(task);
    }

    /**
     * Получаем все задачи от сервера
     */
    public getAllTasks(userId: string): Observable<ITask[]> {
        return this._afs
            .collection<ITask>(`/userProjects/${userId}/todos`)
            .snapshotChanges()
            .pipe(
                map((actions) =>
                    actions.map((a) => {
                        const { id, ...restData } =
                            a.payload.doc.data() as ITask;

                        return { id, ...restData };
                    })
                )
            );
    }

    /**
     * Обновляет задачу на сервере
     */
    public updateTask(task: ITask, userId: string): Promise<void> {
        const taskRef: AngularFirestoreDocument<ITask> = this._afs
            .collection<ITask>(`/userProjects/${userId}/todos`)
            .doc(task.id);

        return taskRef.update(task);
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
