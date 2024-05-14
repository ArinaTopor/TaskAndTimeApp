import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreDocument,
    DocumentReference,
} from '@angular/fire/compat/firestore';
import { IUser } from './interfaces/user.interface';
import { ITask } from './interfaces/task.interface';
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
        const newTodoRef: DocumentReference<ITask> = this._afs.collection<ITask>(`/userTodos/${userId}/todos`).doc().ref;
        task.id = newTodoRef.id;

        return newTodoRef.set(task);
    }

    /**
     * Получаем все задачи от сервера
     */
    public getAllTasks(userId: string): Observable<ITask[]> {
        return this._afs.collection<ITask>(`/userTodos/${userId}/todos`).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const { id,...restData } = a.payload.doc.data() as ITask;

                return { id,...restData };
            }))
        );
    }


    /**
     * Обновляет задачу на сервере
     */
    public updateTask(task: ITask, userId: string): Promise<void> {
        const taskRef: AngularFirestoreDocument<ITask> = this._afs.collection<ITask>(`/userTodos/${userId}/todos`).doc(task.id);

        return taskRef.update(task);
    }
}
