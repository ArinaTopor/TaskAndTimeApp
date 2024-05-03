import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { TaskModel } from '../models/task-model';
import { ListContentManagerService } from '../services/list-content-manager.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    BehaviorSubject,
    delay,
    map,
    Observable,
    shareReplay,
    startWith,
    Subject,
    switchMap,
    tap
} from 'rxjs';

@Component({
    selector: 'list-web-component',
    templateUrl: './list.web.component.html',
    styleUrl: './list.web.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListWebComponent {
    protected readonly currentDate: string = format(new Date(), 'd MMMM', { locale: ru });
    protected taskAll$: Observable<TaskModel[]>;
    protected unCompletedTask$: Observable<TaskModel[]>;
    protected completedTask$: Observable<TaskModel[]>;
    protected destroyRef: DestroyRef = inject(DestroyRef);
    protected taskValueAdd: string = '';
    protected refreshSubject$: Subject<void> = new Subject<void>();
    private _isShow$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public get isShow$(): Observable<boolean> {
        return this._isShow$.asObservable();
    }

    constructor(protected listService: ListContentManagerService) {
        this.taskAll$ = this.refreshSubject$
            .pipe(
                startWith(null),
                switchMap(() => this.getAllTask()),
                shareReplay(1)
            );

        this.unCompletedTask$ = this.taskAll$
            .pipe(
                map((taskList: TaskModel[]) => taskList.filter(task => !task.checkbox)),
                delay(300),
            );

        this.completedTask$ = this.taskAll$
            .pipe(
                map((taskList: TaskModel[]) => taskList.filter(task => task.checkbox)),
                delay(300),
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
                switchMap(() => this.getAllTask()),
                takeUntilDestroyed(this.destroyRef)
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
     * Обновляем задачу
     */
    protected updateTask(task: TaskModel): void {
        this.listService.updateTask(task)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.refreshSubject$.next();
            });
    }

    /**
     *
     * Показываем и скрываем список выполненных задач
     */
    protected toggleSection(): void {
        this._isShow$.next(!this._isShow$.value);
    }
}
