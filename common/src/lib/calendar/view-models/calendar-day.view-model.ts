import dayjs from 'dayjs';
import { ITask } from '../../db/interfaces/task.interface';
import { BehaviorSubject } from 'rxjs';



export class CalendarDayViewModel {
    public currentDay: boolean;
    public dayData: dayjs.Dayjs;
    public tasks: BehaviorSubject<ITask[]>;


    constructor(
        currentDay: dayjs.Dayjs,
        dayData: dayjs.Dayjs,
        task: ITask[]
    ) {
        this.currentDay = dayData.isSame(currentDay, 'date');
        this.dayData = dayData;
        this.tasks = new BehaviorSubject(task);
    }
}
