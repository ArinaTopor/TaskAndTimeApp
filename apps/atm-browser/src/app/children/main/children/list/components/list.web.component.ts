import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tuiIconRotate } from '@taiga-ui/icons';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Task } from '../models/task';
import { ListContentManagerService } from '../services/list-content-manager.service';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
    selector: 'list-web-component',
    templateUrl: './list.web.component.html',
    styleUrl: './list.web.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListWebComponent implements OnInit {
    protected readonly tuiIconRotate: string = tuiIconRotate;
    protected readonly currentDate: string = format(new Date(), 'd MMMM', { locale: ru });
    protected isShow: boolean = true;
    protected taskObject: Task = new Task();
    protected taskAll: Task[] = [];
    protected comletedTask: Task[] = [];
    protected taskValueAdd: string = '';

    constructor(protected listService: ListContentManagerService) {
    }

    /**
     * Описание
     */
    public ngOnInit(): void {

    }

    /*public addTask() {
        // при нажатии на кнопку "Добавить задачу" должна открываться модалка, куда вводится вся информация по задаче. Инпут в хтмл - заглушка, проверяю вывод.
        if (this.taskValueAdd.trim() === '') {
            return;
        }
        this.taskObject.id = Math.max(...this.taskAll.map(o => o.id)) + 1;
        this.taskObject.name = this.taskValueAdd;
        this.listService.addTask(this.taskObject).subscribe( () => {
            this.taskObject = new Task();
            this.taskValueAdd = '';
            this.getAllTask();
        })
    }*/

    /**
     * Добавляем новую задачу
     */
    public addTask():void {
        if (this.taskValueAdd.trim() === '') {
            return;
        }
        this.taskObject.id = Math.max(...this.taskAll.map(o => o.id)) + 1;
        this.taskObject.name = this.taskValueAdd;
        this.listService.addTask(this.taskObject).pipe(
            tap(() => {
                this.taskObject = new Task();
                this.taskValueAdd = '';
            }),
            switchMap(() => this.getAllTask())
        ).subscribe(res => {
            this.taskAll = res;
        });
    }

    /**
     * Получаем все задачи
     */
    public getAllTask(): Observable<Task[]> {
        return this.listService.getAllTask().pipe(
            tap(res => this.taskAll = res)
        );
    }

    /**
     * Удаляем из списка всех задач выполненную
     */
    public completeTask(i: number): void {
        console.log(i);
        const item: Task[] = this.taskAll.splice(i, 1);
        this.comletedTask.push(item[0]);
    }

    /**
     * Добавляем в список всех задач выполненную по случайности
     */
    public unCompleteTask(i: number): void {
        console.log(i);
        const item: Task[] = this.comletedTask.splice(i, 1);
        this.taskAll.push(item[0]);
    }

    /**
     * Редактирует задачу
     */
    public editTask():void {
        this.listService.editTask(this.taskObject).subscribe( () => {
            // при нажатии на задачу открывается модалка реадктирования задачи
        });
    }

    /**
     * Удаляет задачу
     */
    public deleteTask(curTask: Task):void {
        this.listService.deleteTask(curTask).subscribe( () => {
            // удалить задачу можно в модалке редактирования задачи
        });
    }
}
