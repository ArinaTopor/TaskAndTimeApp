import dayjs from 'dayjs';

export interface ITaskModelInterface {
    id: string;
    name: string | null;
    description: string | null | undefined;
    date: dayjs.Dayjs | null;
    timeStart: string | null;
    timeEnd: string | null;
    tags: string | null | undefined;
    checkbox: boolean | null | undefined;
}
