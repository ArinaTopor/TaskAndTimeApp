export interface ITask {
    id: string | undefined;
    name: string | null | undefined;
    description: string | null | undefined;
    date: string | null;
    timeStart: string | null | undefined;
    timeEnd: string | null | undefined;
    tags: string | null | undefined;
    checkbox: boolean | null | undefined;
    projectId?: string;
    sectionId?: string;
    isEditing?: boolean;
}
