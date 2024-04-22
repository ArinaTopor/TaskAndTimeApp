import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ListContentManagerService {
    public serviceURL: string;

    constructor(private _http: HttpClient) {
        this.serviceURL = 'http://localhost:3000/tasks';
    }

    /**
     * Добавляет задачу на сервер
     */
    public addTask(task: Task): Observable<Task> {
        return this._http.post<Task>(this.serviceURL, task);
    }

    /**
     * Получаем те задачи от сервера, которые "невыполненные"
     */
    public getAllTask(): Observable<Task[]> {
        return this._http.get<Task[]>(this.serviceURL).pipe(
            map(allTasks => allTasks.filter(task => !task.checkbox))
        );
    }

    /**
     * Добавляет выполненную задачу на сервер
     */
    public addCompleteTask(task: Task): Observable<Task[]> {
        return this._http.post<Task[]>(this.serviceURL, task);
    }

    /**
     * Получает все выполненные задачи
     */
    public getCompleteTask(): Observable<Task[]> {
        return this._http.get<Task[]>(this.serviceURL);
    }

    /**
     * Удаляет задачу из сервера
     */
    public deleteTask(task: Task): Observable<Task> {
        return this._http.delete<Task>(this.serviceURL + '/' + task.id);
    }

    /**
     * Редактирование задачи
     */
    public editTask(task: Task): Observable<Task> {
        return this._http.put<Task>(this.serviceURL + '/' + task.id, task);
    }
}
