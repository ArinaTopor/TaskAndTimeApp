import {
    ChangeDetectionStrategy,
    Component, DestroyRef, Inject, inject, Input
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { TaskService } from '../services/task.service';
import dayjs from 'dayjs';
import { ITask } from '@atm-project/interfaces';
import { TuiInputTimeModule, TuiSelectModule, TuiTextareaModule } from '@taiga-ui/kit';
import {
    TuiButtonModule,
    TuiCalendarModule,
    TuiDialogModule,
    TuiDialogService,
    TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
    selector: 'task-modal',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TuiInputTimeModule,
        TuiTextfieldControllerModule,
        TuiButtonModule,
        FormsModule,
        TuiCalendarModule,
        ReactiveFormsModule,
        TuiDialogModule,
        TuiTextareaModule,
        TuiSelectModule,
        CommonModule,
        HttpClientModule,
        NgOptimizedImage
    ],
    standalone: true
})
export class TaskComponent {
    @Input() public currentTask$?: BehaviorSubject<ITask | null>;
    @Input() public stateModal: boolean = false;
    @Input() public inSection?: boolean | null = false;

    @Input() public set actionModal(value: 'add' | 'edit' | null) {
        this.actionModalValue = value;
        this.getForm();
    }
    @Input() public projectId?: string;
    @Input() public sectionId?: string;
    @Input() public projectTitle?: string;
    @Input() public sectionTitle?: string;

    public stateModalDate: boolean = false;
    protected valueDate: TuiDay | null = null;
    protected value: never[] = [];
    protected emptyName: boolean = true;
    protected refreshSubject$: Subject<void> = new Subject<void>();
    protected destroyRef: DestroyRef = inject(DestroyRef);
    protected actionModalValue: 'add' | 'edit' | null = null;

    protected taskForm: FormGroup = new FormGroup({
        taskValueAdd: new FormControl('', {
            validators: [Validators.required]
        }),
        timeValueStart: new FormControl(''),
        timeValueEnd: new FormControl(''),
        checkboxRepeat: new FormControl(false),
        textarea: new FormControl(''),
        tags: new FormControl(''),
    });

    public get valueTimeStart(): string | null | undefined {
        return this.getTimeValue('timeValueStart');
    }

    public get valueTimeEnd(): string | null | undefined {
        return this.getTimeValue('timeValueEnd');
    }

    public get buttonText(): string {
        return this.actionModalValue === 'add'? 'Добавить' : 'Сохранить';
    }

    public get additionalClass(): string {
        return this.actionModalValue === 'add'? 'margin-left: 24em' : '';
    }

    constructor(protected taskService: TaskService, @Inject(TuiDialogService) protected readonly dialogs: TuiDialogService) {}

    /**
     * Получаем значение времени из формы и форматируем
     */
    public getTimeValue(fieldName: 'timeValueStart' | 'timeValueEnd'): string | null {
        const time: TuiTime | null = this.taskForm.get(fieldName)?.value;

        if (time instanceof TuiTime) {
            return this.formatTuiTime(time);
        }

        return time;
    }

    /**
     * Открываем модалку
     */
    /*public showDialog(
        content: PolymorpheusContent,
    ): void {
        this.dialogs.open(content).subscribe({
            complete: () => {
            },
        });
    }*/

    /**
     * Открываем модалку
     */
    public showDialog(): void {
        this.stateModal = true;
    }

    /**
     * Получаем форму
     */
    public getForm(): FormGroup {
        if (this.actionModalValue === 'edit') {
            this.currentTask$?.
                pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((currentTask: ITask | null) => {
                    if (currentTask !== null) {
                        this.taskForm.setValue({
                            taskValueAdd: currentTask.name || '',
                            timeValueStart: currentTask.timeStart || null,
                            timeValueEnd: currentTask.timeEnd || null,
                            checkboxRepeat: currentTask.checkbox || false,
                            textarea: currentTask.description || '',
                            tags: currentTask.tags || [],
                        });
                        const dateObject: Date = dayjs(currentTask.date).toDate();
                        this.valueDate = TuiDay.fromLocalNativeDate(dateObject);
                        this.emptyName = false;
                    }
                });
        }

        return this.taskForm;
    }

    /**
     * Открываем модалку даты
     */
    public showDialogDate(): void {
        this.stateModalDate = true;
    }

    /* public showDialogDate(
        content: PolymorpheusContent,
    ): void {
        this.dialogs.open(content).subscribe({
            complete: () => {
            },
        });
    }*/

    /**
     * Проверка на непустое значение в поле инпута названии задачи
     */
    public controlChange(): void {
        this.emptyName = !this.taskForm.get('taskValueAdd')?.value || this.taskForm.get('taskValueAdd')?.value.trim() === '';
    }

    /**
     * Работаем с задачей
     */
    public actionTask(): void {
        const taskValueAdd: string | null | undefined = this.taskForm.get('taskValueAdd')?.value;
        const taskDescription: string | null | undefined = this.taskForm.get('textarea')?.value;
        const taskTimeStart: string | null | undefined = this.valueTimeStart;
        const taskTimeEnd: string | null | undefined = this.valueTimeEnd;
        const taskDateJs: dayjs.Dayjs = dayjs(this.valueDate?.toLocalNativeDate());
        const taskDate: string = taskDateJs.toString();
        const taskTags: string | null | undefined = this.taskForm.get('tags')?.value;

        if (this.currentTask$) {
            this.currentTask$.
                pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(currentTask => {
                    const taskId: string | undefined = currentTask?.id;

                    const updatedTask: ITask = {
                        ...currentTask,
                        id: taskId,
                        name: taskValueAdd,
                        description: taskDescription,
                        date: taskDate,
                        timeStart: taskTimeStart,
                        timeEnd: taskTimeEnd,
                        tags: taskTags,
                        checkbox: false
                    };

                    this.taskService.updateTask(updatedTask)
                        .pipe(takeUntilDestroyed(this.destroyRef))
                        .subscribe(() => {
                            this.refreshSubject$.next();
                            this.stateModal = false;
                        });
                });
        } else {
            const newTask: ITask = {
                id: crypto.randomUUID(),
                name: taskValueAdd,
                description: taskDescription,
                date: taskDate,
                timeStart: taskTimeStart,
                timeEnd: taskTimeEnd,
                tags: taskTags,
                checkbox: false,
            };

            if (!this.emptyName) {
                this.taskService.addTask(newTask)
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe(() => {
                        this.refreshSubject$.next();
                        this.stateModal = false;
                    });
            }
        }
        this.taskForm.reset();
        this.valueDate = null;
        this.emptyName = true;
    }

    /**
     * Удаление задачи
     */
    public deleteTask(): void {
        const currentTask: ITask | null | undefined = this.currentTask$?.value;

        if (currentTask) {
            this.taskService.deleteTask(currentTask)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                    this.currentTask$?.next(null);
                });
        }
    }

    /**
     * Хлебные крошки: получаем путь задачи
     */
    public getPathTask(): string {
        if (this.projectTitle && this.sectionTitle) {
            return `${this.projectTitle}/${this.sectionTitle}`;
        }

        return '';
    }

    /**
     * Выбираем день
     */
    protected onDayClick(day: TuiDay): void {
        this.valueDate = day;
    }

    /**
     * Очищаем форму
     */
    protected onDayClickDefault(): void {
        this.taskForm.reset();
        this.valueDate = null;
    }

    /**
     * Форматируем данные
     */
    protected formatTuiTime(time: TuiTime): string {
        const hours: string = time.hours.toString().padStart(2, '0');
        const minutes: string = time.minutes.toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    }
}
