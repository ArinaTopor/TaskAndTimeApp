import { Observable } from 'rxjs';

export interface IProject {
    id: string;
    title: string;
    color?: string;
}

export interface ISection {
    id: string;
    title: string;
}

export interface ITodo {
    id: string;
    name: string;
}
export interface ISectionTodo {
    id: string;
    title: string;
    todos: Observable<ITodo[]>;
}
