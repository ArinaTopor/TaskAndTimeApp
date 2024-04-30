export class TaskModel {
    public id: string = crypto.randomUUID();
    public name: string = '';
    public description: string = '';
    public date: string = '';
    public timeStart: string = '22:00';
    public timeEnd: string = '23:00';
    public tags: string[] = ['STUDY'];
    public checkbox: boolean = false;
}
