export interface ITask {
    id: string;
    name: string | null;
    description: string | null | undefined;
    date: string | null;
    timeStart: string | null;
    timeEnd: string | null;
    tags: string | null | undefined;
    checkbox: boolean | null | undefined;
    projectId?: string;
    sectionId?: string;
    isEditing?: boolean;
}
