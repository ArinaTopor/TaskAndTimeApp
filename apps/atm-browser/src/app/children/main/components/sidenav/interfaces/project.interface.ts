export interface IProject {
    id: string;
    title: string;
    icon?: string;
    type: ProjectType;
}

export enum ProjectType {
    project,
    filter,
    tag,
}