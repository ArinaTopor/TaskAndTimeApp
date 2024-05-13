import dayjs from 'dayjs';

export interface ITask {
    id: string
    name: string;
    description: string;
    date: dayjs.Dayjs;
    completed: boolean;
    timeStart: dayjs.Dayjs;
    timeEnd: dayjs.Dayjs;
    tags: string[]
    color?: string
}
