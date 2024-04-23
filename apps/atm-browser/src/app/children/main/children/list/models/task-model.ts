import { BehaviorSubject, Observable } from 'rxjs';

export class TaskModel {
    public id: number = 0;
    public name: string = '';
    public description: string = '';
    public date: string = '';
    public timeStart: string = '22:00';
    public timeEnd: string = '23:00';
    public tags: string[] = ['STUDY'];
    public checkbox: boolean = false;

    public get isShow$(): Observable<boolean> {
        return this._isShow$.asObservable();
    }

    private _isShow$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    /**
     *  This method toogle section: open and close space.
     */
    public toggleSection(): void {
        this._isShow$.next(!this._isShow$.value);
    }
}
