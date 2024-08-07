import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    CollectionReference,
    DocumentChangeAction,
    DocumentData,
    DocumentReference,
    AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { IProject, IElement, ISection } from './interfaces/project.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { defaultSection } from './models/default.section';
import { IUser } from './interfaces';
import { ITask } from './interfaces';
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
     * function for add section in project
     */
    public addNewSection(
        projectId: string,
        userId: string,
        section: IElement
    ): Promise<void> {
        const newSection: DocumentReference<IElement> = this._afs
            .collection<IElement>(
                `/userProjects/${userId}/projects/${projectId}/sections`
            )
            .doc().ref;
        section.id = newSection.id;

        return newSection.set(section);
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
     * function for add new project to db
     */
    public addNewProject(project: IProject, userId: string): Promise<void> {
        const newProject: DocumentReference<IProject> = this._afs
            .collection<IProject>(`/userProjects/${userId}/projects`)
            .doc().ref;
        project.id = newProject.id;
        const newSection: CollectionReference<DocumentData> =
            newProject.collection('sections');
        defaultSection.id = newSection.doc().id;
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

                    return data;
                })
            )
        );
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

    /**
     * fitered todos
     */
    public filterTasksBySectionId(
        sectionId: string,
        todos: Observable<ITask[]>
    ): Observable<ITask[]> {
        return todos.pipe(
            map((tasks) =>
                tasks.filter((task) => {
                    return task.sectionId === sectionId && !task.checkbox;
                })
            )
        );
    }

    /**
     * function for get sections of project from db
     */
    public getSectionsProject(
        userId: string,
        projectId: string,
        todos: Observable<ITask[]>
    ): Observable<ISection[]> {
        todos.subscribe();

        return this._afs
            .collection<IElement>(
                `userProjects/${userId}/projects/${projectId}/sections`
            )
            .snapshotChanges()
            .pipe(
                map((actions) =>
                    actions.map((a) => {
                        const { id, title } = a.payload.doc.data() as IElement;
                        const filteredTodos: Observable<ITask[]> =
                            this.filterTasksBySectionId(id, todos);
                        const section: ISection = {
                            id: id,
                            title: title,
                            todos: filteredTodos,
                        };

                        return section;
                    })
                )
            );
    }

    /**
     * function for delete sections
     */
    public deleteSection(
        userId: string,
        projectId: string,
        sectionId: string
    ): Promise<void> {
        const sectionRef: AngularFirestoreDocument<IElement> = this._afs
            .collection<IElement>(
                `/userProjects/${userId}/projects/${projectId}/sections`
            )
            .doc(sectionId);

        return sectionRef.delete();
    }
    /**
     * function for update section
     */
    public updateSection(
        userId: string,
        projectId: string,
        sectionId: string,
        section: IElement
    ): Promise<void> {
        const sectionRef: AngularFirestoreDocument<IElement> = this._afs
            .collection<IElement>(
                `/userProjects/${userId}/projects/${projectId}/sections`
            )
            .doc(sectionId);

        return sectionRef.update(section);
    }

    /**
     * function for get todos in project
     */
    public getTodosByProject(
        userId: string,
        projectId: string
    ): Observable<ITask[]> {
        return this._afs
            .collection<ITask>(`/userProjects/${userId}/todos`, (ref) =>
                ref.where('projectId', '==', projectId)
            )
            .valueChanges();
    }
    /**
     * func for update project
     */
    public updateProject(
        userId: string,
        projectId: string,
        project: IProject
    ): Promise<void> {
        const sectionRef: AngularFirestoreDocument<IElement> = this._afs
            .collection<IElement>(`/userProjects/${userId}/projects`)
            .doc(projectId);

        return sectionRef.update(project);
    }

    /**
     * function for delete project from db
     */
    public deleteProject(userId: string, projectId: string): Promise<void> {
        const projectRef: AngularFirestoreDocument<IElement> = this._afs
            .collection<IElement>(`/userProjects/${userId}/projects`)
            .doc(projectId);

        return projectRef.delete();
    }
    /**
     * getProjectById
     */
    public getProjectById(
        userId: string,
        projectId: string
    ): Observable<Array<DocumentChangeAction<IProject>>> {
        return this._afs
            .collection<IProject>(`/userProjects/${userId}/projects`, (ref) =>
                ref.where('id', '==', projectId)
            )
            .snapshotChanges();
    }


    /**
     * Удаляет задачу с сервера
     */
    public deleteTask(task: ITask, userId: string): Promise<void> {
        const taskRef: AngularFirestoreDocument<ITask> = this._afs
            .collection<ITask>(`/userProjects/${userId}/todos`)
            .doc(task.id);

        return taskRef.delete();
    }

}
