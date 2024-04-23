import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TaskModel } from '../models/task-model';
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
    public addTask(task: TaskModel): Observable<TaskModel> {
        return this._http.post<TaskModel>(this.serviceURL, task);
    }

    /**
     * Получаем невыполненные задачи от сервера
     */
    public getAllTask(): Observable<TaskModel[]> {
        return this._http.get<TaskModel[]>(this.serviceURL);
    }

    /**
     * Получает все выполненные задачи
     */
    public getCompleteTask(): Observable<TaskModel[]> {
        return this._http.get<TaskModel[]>(`${this.serviceURL}?checkbox=${true}`);
    }

    /**
     * Удаляет задачу из сервера
     */
    public deleteTask(task: TaskModel): Observable<TaskModel> {
        return this._http.delete<TaskModel>(this.serviceURL + '/' + task.id);
    }

    /**
     * Редактирование задачи
     */
    public editTask(task: TaskModel): Observable<TaskModel> {
        return this._http.put<TaskModel>(this.serviceURL + '/' + task.id, task);
    }
}
