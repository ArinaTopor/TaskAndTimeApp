import { BehaviorSubject, Observable } from 'rxjs';
import { IProject, ProjectType } from '../interfaces/project.interface';

export class SectionListViewModel {
    public get isShow$(): Observable<boolean> {
        return this._isShow$.asObservable();
    }

    public type: ProjectType;
    public title: string;
    public list$: Observable<IProject[]> | undefined;
    private _isShow$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(title: string, type: ProjectType) {
        this.title = title;
        this.type = type;
    }

    /**
     *  This method toogle section: open and close space.
     */
    public toggleSection(): void {
        this._isShow$.next(!this._isShow$.value);
    }
}
