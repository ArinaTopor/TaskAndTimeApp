export interface IProject {
    id: string;
    title: string;
    color?: string;
    icon?: string;
    type: ProjectType;
}

export enum ProjectType {
    project,
    filter,
    tag,
}
