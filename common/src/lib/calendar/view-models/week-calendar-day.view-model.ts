import dayjs from 'dayjs';
import { ITask } from '@atm-project/common';
import { CalendarDayViewModel } from './calendar-day.view-model';

interface ITaskBlock {
    height: number;
    startPosition: number;
    task: ITask;
}

export class WeekCalendarDayViewModel extends CalendarDayViewModel {
    public blocks!: ITaskBlock[];
    public height!: number;

    constructor(
        currentDay: dayjs.Dayjs,
        dayData: dayjs.Dayjs,
        tasks: ITask[]
    ) {
        super(currentDay, dayData, tasks);
    }

    /**
     * создаем массив блоков для отображения задач по времени
     */
    public setTasksBlock(): void {
        this.blocks = [];
        const delta: number = this.height / 60 / 24;

        for (const task of this.tasks) {
            const tempStart: number = (task.timeStart.hour() * 60 + task.timeStart.minute()) * delta;
            const tempEnd: number = (task.timeEnd.hour() * 60 + task.timeEnd.minute()) * delta;

            this.blocks.push({
                height: tempEnd - tempStart,
                startPosition: tempStart,
                task: task
            });
        }
    }
}
