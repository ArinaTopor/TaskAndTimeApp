import { Observable } from 'rxjs';
import { ITask } from './task.interface';

export interface IProject {
    id: string;
    title: string;
    color: string;
}

export interface IElement {
    id: string;
    title: string;
}

export interface ISection {
    id: string;
    title: string;
    todos: Observable<ITask[]>;
}
