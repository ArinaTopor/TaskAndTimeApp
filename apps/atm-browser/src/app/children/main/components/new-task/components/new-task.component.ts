import {
    ChangeDetectionStrategy,
    Component
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { NewTaskService } from '../services/new-task.service';
import dayjs from 'dayjs';
import { ITask } from '../../../../../../../../../common/src/lib/db/interfaces/task.interface';
import { TuiInputTimeModule, TuiSelectModule, TuiTextareaModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiCalendarModule, TuiDialogModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'new-task-modal',
    templateUrl: './new-task.component.html',
    styleUrl: './new-task.component.scss',
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
export class NewTaskComponent {
    public stateModal: boolean = false;
    public stateModalDate: boolean = false;

    protected valueDate: TuiDay | null = null;
    protected value: never[] = [];

    protected addTaskForm: FormGroup = new FormGroup({
        taskValueAdd: new FormControl(''),
        timeValueStart: new FormControl(''),
        timeValueEnd: new FormControl(''),
        checkboxRepeat: new FormControl(false),
        textarea: new FormControl(''),
        tags: new FormControl(''),
    });

    /**
     * Форматируем данные
     */
    public get valueTimeStart(): string | null {
        const time: any = this.addTaskForm.get('timeValueStart')?.value;

        if (time instanceof TuiTime) {
            return this.formatTuiTime(time);
        } else {
            return null;
        }
    }

    /**
     * Форматируем данные
     */
    public get valueTimeEnd(): string | null {
        const time: any = this.addTaskForm.get('timeValueEnd')?.value;

        if (time instanceof TuiTime) {
            return this.formatTuiTime(time);
        } else {
            return null;
        }
    }

    constructor(private _newTaskService: NewTaskService) {}

    /**
     * Добавляем новую задачу и обновляем список задач
     */
    public addTask(): void {

        const taskDateJs: dayjs.Dayjs = dayjs(this.valueDate?.toLocalNativeDate());
        const taskDate: string = taskDateJs.toString();
        const taskValueAdd: string | null | undefined = this.addTaskForm.get('taskValueAdd')?.value;
        const taskDescription: string | null | undefined = this.addTaskForm.get('textarea')?.value;
        const taskTimeStart: string | null = this.valueTimeStart;
        const taskTimeEnd: string | null = this.valueTimeEnd;
        const taskTags: string | null | undefined = this.addTaskForm.get('tags')?.value;

        if (!taskValueAdd) {
            return;
        }

        if (taskValueAdd.trim() === '') {
            return;
        }

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

        this._newTaskService.addTask(newTask);
        this.addTaskForm.reset();
        this.valueDate = null;
    }

    /**
     * Показать модалку общую
     */
    public showDialog(): void {
        this.stateModal = true;
    }

    /**
     * Показать модалку выбора даты
     */
    public showDialogDate(): void {
        this.stateModalDate = true;
    }

    /**
     * Получить день
     */
    protected onDayClick(day: TuiDay): void {
        this.valueDate = day;
    }

    /**
     * Очистить данные
     */
    protected onDayClickDefault(): void {
        this.addTaskForm.reset();
        this.valueDate = null;
        this.stateModal = true;
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
