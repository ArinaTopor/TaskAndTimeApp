import { ChangeDetectionStrategy, Component } from '@angular/core';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { TaskModel } from '../models/task-model';
import { ListContentManagerService } from '../services/list-content-manager.service';
import { BehaviorSubject, map, Observable, startWith, Subject, switchMap, tap } from 'rxjs';

@Component({
    selector: 'list-web-component',
    templateUrl: './list.web.component.html',
    styleUrl: './list.web.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListWebComponent {
    protected readonly currentDate: string = format(new Date(), 'd MMMM', { locale: ru });
    protected taskAll$: Observable<TaskModel[]>;
    protected completedTask$: Observable<TaskModel[]>;

    public get isShow$(): Observable<boolean> {
        return this._isShow$.asObservable();
    }

    private _isShow$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    protected taskValueAdd: string = '';

    protected refreshSubject$: Subject<void> = new Subject<void>();

    constructor(protected listService: ListContentManagerService) {
        this.taskAll$ = this.refreshSubject$
            .pipe(
                startWith(null),
                switchMap(() => this.getAllTask()),
                map((taskList: TaskModel[]) => taskList.filter(task => !task.checkbox))
            );


        this.completedTask$ = this.refreshSubject$
            .pipe(
                startWith(null),
                switchMap(() => this.getCompleteTask()),
            );
    }

    /**
     * Добавляем новую задачу и обновляем список задач
     */
    public addTask(): void {
        if (this.taskValueAdd.trim() === '') {
            return;
        }

        const newTask: TaskModel = {
            // заполнить модель из модалки
        } as TaskModel;

        this.listService.addTask(newTask)
            .pipe(
                tap(() => {
                    this.taskValueAdd = '';
                }),
                switchMap(() => this.getAllTask())
                //TODO takeUntilDestroyed(),
            )
            .subscribe(() => {
                this.refreshSubject$.next();
            });
    }

    /**
     * Получаем список задач
     */
    protected getAllTask(): Observable<TaskModel[]> {
        return this.listService.getAllTask();
    }

    /**
     * Получаем список выполненных задач
     */
    protected getCompleteTask(): Observable<TaskModel[]> {
        return this.listService.getCompleteTask();
    }

    /**
     * Удаляем выполненную задачу из списка невыполненных задач и помещаем ее в список выполненных задач
     */
    public completeTask(task: TaskModel): void {
        //TODO: Отправлять запрос на частичное изменение задачи patch ()
    }

    /**
     * Возвращаем задачу в список невыполненных задач и удаляем из списка выполненных
     */
    public unCompleteTask(task: TaskModel): void {
        //TODO: аналогично
    }

    /**
     *
     * Показываем и скрываем список выполненных задач
     */
    protected toggleSection(): void {
    }

    /**
     * Редактируем задачу
     */
    protected editTask(task: TaskModel): void {
        this.listService.editTask(task).subscribe(() => {
            // при нажатии на задачу открывается модалка реадктирования задачи
        });
    }

    /**
     * Удаляем задачу
     */
    protected deleteTask(curTask: TaskModel): void {
        this.listService.deleteTask(curTask).subscribe(() => {
            // удалить задачу можно в модалке редактирования задачи
        });
    }
}
