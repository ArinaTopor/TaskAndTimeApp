import { BehaviorSubject, Observable } from 'rxjs';
import { IProject } from '../interfaces/project.interface';

export class SectionListViewModel {

    public get isShow$(): Observable<boolean> {
        return this._isShow$.asObservable();
    }

    public title: string;
    public list: IProject[];
    private _isShow$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(title: string, list: IProject[]) {
        this.title = title;
        this.list = list;
    }

    /**
     *  This method toogle section: open and close space.
     */
    public toggleSection(): void {
        this._isShow$.next(!this._isShow$.value);
    }
}
