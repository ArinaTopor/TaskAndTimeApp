import dayjs from 'dayjs';
import { ITask } from '@atm-project/common';

interface ITaskBlock {
    blockPosition: number,
    isFirst: boolean;
    color: string | undefined;
    task: ITask;
}

export class WeekCalendarDayViewModel {
    public currentDay: boolean;
    public dayData: dayjs.Dayjs;
    public tasks: ITask[];
    public blocks: ITaskBlock[];
    private _blockSize: number = 15;

    constructor(
        currentDay: dayjs.Dayjs,
        dayData: dayjs.Dayjs,
        tasks: ITask[]
    ) {
        this.currentDay = dayData.day() === currentDay.day();
        this.dayData = dayData;
        this.tasks = tasks;
        this.blocks = this.setTasksBlock();
    }
    /**
     * создаем массив блоков для отображения задач по времени
     */
    private setTasksBlock(): ITaskBlock[] {
        const res: ITaskBlock[] = [];

        for (let i: number = 0; i < 24 * (60 / this._blockSize); i++) {
            for (const task of this.tasks) {

                if (task.timeStart.hour() !== (i / (60 / this._blockSize))) {
                    continue;
                }

                if (task.timeStart.minute() > 15 && task.timeStart.minute() < 30) {
                    i++;
                } else if (task.timeStart.minute() > 30 && task.timeStart.minute() < 45) {
                    i += 2;
                } else if (task.timeStart.minute() > 45 && task.timeStart.minute() < 60){
                    i += 3;
                }

                res.push({
                    blockPosition: i,
                    isFirst: true,
                    color: task.color,
                    task: task
                });

                let dif: number = task.timeEnd.diff(task.timeStart) / 60 / 1000;

                while (dif > this._blockSize) {
                    i++;
                    dif -= this._blockSize;

                    res.push({
                        blockPosition: i,
                        isFirst: false,
                        color: task.color,
                        task: task
                    });
                }
            }

        }

        console.log(res);

        return res;
    }
}
