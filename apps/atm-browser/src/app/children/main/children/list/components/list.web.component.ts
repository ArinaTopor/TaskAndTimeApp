import { ChangeDetectionStrategy, Component } from '@angular/core';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { TaskModel } from '../models/task-model';
import { ListContentManagerService } from '../services/list-content-manager.service';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
    selector: 'list-web-component',
    templateUrl: './list.web.component.html',
    styleUrl: './list.web.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListWebComponent {
    protected readonly currentDate: string = format(new Date(), 'd MMMM', { locale: ru });
    protected taskObject: TaskModel = new TaskModel();
    protected taskAll: TaskModel[] = [];
    protected comletedTask: TaskModel[] = [];
    protected taskValueAdd: string = '';

    constructor(protected listService: ListContentManagerService) {
        this.getAllTask().subscribe(tasks => {
            this.taskAll = tasks.filter(task => !task.checkbox);
        });

        this.getCompleteTask().subscribe(tasks => {
            this.comletedTask = tasks.filter(task => task.checkbox);
        });
    }
    /**
     * Добавляем новую задачу и обновляем список задач
     */
    public addTask():void {
        if (this.taskValueAdd.trim() === '') {
            return;
        }
        this.taskObject.id = Math.max(...this.taskAll.map(o => o.id)) + 1;
        this.taskObject.name = this.taskValueAdd;
        this.listService.addTask(this.taskObject).pipe(
            tap(() => {
                this.taskObject = new TaskModel();
                this.taskValueAdd = '';
            }),
            switchMap(() => this.getAllTask())
        ).subscribe(res => {
            this.taskAll = res;
        });
    }

    /**
     * Получаем список задач
     */
    public getAllTask(): Observable<TaskModel[]> {
        return this.listService.getAllTask().pipe(
            tap(res => this.taskAll = res)
        );
    }
    /**
     * Получаем список выполненных задач
     */
    public getCompleteTask(): Observable<TaskModel[]> {
        return this.listService.getCompleteTask().pipe(
            tap(res => this.comletedTask = res)
        );
    }

    /**
     * Удаляем выполненную задачу из списка невыполненных задач и помещаем ее в список выполненных задач
     */
    public completeTask(i: number): void {
        console.log(i);
        const item: TaskModel[] = this.taskAll.splice(i, 1);
        this.comletedTask.push(item[0]);
    }

    /**
     * Возвращаем задачу в список невыполненных задач и удаляем из списка выполненных
     */
    public unCompleteTask(i: number): void {
        console.log(i);
        const item: TaskModel[] = this.comletedTask.splice(i, 1);
        this.taskAll.push(item[0]);
    }

    /**
     *
     * Показываем и скрываем список выполненных задач
     */
    protected toggleSection(task: TaskModel): void {
        task.toggleSection();
    }

    /**
     * Редактируем задачу
     */
    protected editTask():void {
        this.listService.editTask(this.taskObject).subscribe( () => {
            // при нажатии на задачу открывается модалка реадктирования задачи
        });
    }

    /**
     * Удаляем задачу
     */
    protected deleteTask(curTask: TaskModel):void {
        this.listService.deleteTask(curTask).subscribe( () => {
            // удалить задачу можно в модалке редактирования задачи
        });
    }
}
