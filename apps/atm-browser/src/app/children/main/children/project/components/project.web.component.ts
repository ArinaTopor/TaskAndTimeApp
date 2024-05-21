import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalForDeleteComponent } from 'apps/atm-browser/src/app/modules/modal-for-delete/modal-for-delete.component';
import {
    BehaviorSubject,
    Observable,
    Subject,
    Subscription,
    filter,
    map,
    shareReplay,
    startWith,
    switchMap,
} from 'rxjs';
import { ProjectService } from '../services/project.service';
import { CommonModalComponent } from 'apps/atm-browser/src/app/modules/common-modal/common-modal.component';
import { IProject, IElement } from '@atm-project/common';

@Component({
    selector: 'project-web-component',
    templateUrl: './project.web.component.html',
    styleUrl: './project.web.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ModalForDeleteComponent, CommonModalComponent],
})
export class ProjectWebComponent implements OnDestroy {
    protected id: Observable<string>;
    protected bhvsId: BehaviorSubject<string> = new BehaviorSubject<string>('');
    protected subscription!: Subscription;
    protected sections$: Observable<IElement[]>;
    protected currentProject$: Observable<IProject[]>;
    protected isOpen: boolean = false;
    protected refreshSubject$: Subject<void> = new Subject<void>();

    constructor(
        private _activateRoute: ActivatedRoute,
        private _cdr: ChangeDetectorRef,
        private _projectService: ProjectService,
        private _destroyRef: DestroyRef
    ) {
        this.id = this._activateRoute.params.pipe(
            filter((params) => !!params['id']),
            map((params) => {
                this.bhvsId.next(params['id']);

                return params['id'];
            }),
            shareReplay(1)
        );
        // _activateRoute.params.subscribe((params) => this.id = params['id']);
        this.sections$ = this.refreshSubject$.pipe(
            startWith(null),
            switchMap(() => this.getSections()),
            shareReplay(1)
        );
        this.currentProject$ = this.refreshSubject$.pipe(
            startWith(null),
            switchMap(() => this.getProject()),
            shareReplay(1)
        );
    }
    /**
     * get sections
     */
    public getSections(): Observable<IElement[]> {
        return this.id.pipe(
            filter((projectId): projectId is string => !!projectId),
            switchMap((projectId) => this._projectService.getSection(projectId))
        );
        // this.id.pipe(filter((projectId): projectId is string => !!projectId)),
        // switchMap((projectId) => {
        //     if(projectId){
        //         return this._projectService.getSection(projectId);
        //     }
        //     else {
        //         return of();
        //     }
        // }
        // );
    }

    /**
     * get project
     */
    public getProject(): Observable<IProject[]> {
        return this.id.pipe(
            filter((projectId): projectId is string => !!projectId),
            switchMap((projectId) => this._projectService.getProject(projectId))
        );
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    /**
     * function for open modal
     */
    public onOpen(): void {
        this.isOpen = !this.isOpen;
    }

    /**
     * add section
     */
    public addSection(section: IElement): void {
        this.id.pipe(
            filter((projectId): projectId is string => !!projectId),
            switchMap((projectId) =>
                this._projectService.addSection(projectId, section)
            )
        );
        // if (section) {
        //     this._projectService
        //         .addSection(this.id, section)
        //         .pipe(takeUntilDestroyed(this._destroyRef))
        //         .subscribe();
        // }
    }

    /**
     * updateSection
     */
    public updateSection(section: IElement): void {
        // this._projectService
        //     .updateSection(this.id, section)
        //     .pipe(takeUntilDestroyed(this._destroyRef))
        //     .subscribe();
    }

    /**
     * deleteSection
     */
    public deleteSection(sectionId: string): void {
        console.log('dfdf');
        // this._projectService
        //     .deleteSection(this.id, sectionId)
        //     .pipe(takeUntilDestroyed(this._destroyRef))
        //     .subscribe();
    }
}
