import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    public updateTask(task: TaskModel): Observable<TaskModel> {
        return this._http.patch<TaskModel>(`${this.serviceURL}/${task.id}`, { checkbox: task.checkbox });
    }

}
