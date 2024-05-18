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
    Observable,
    Subject,
    Subscription,
    shareReplay,
    startWith,
    switchMap,
} from 'rxjs';
import { ProjectService } from '../services/project.service';
import { CommonModalComponent } from 'apps/atm-browser/src/app/modules/common-modal/common-modal.component';
import { IProject, ISection } from '@atm-project/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'project-web-component',
    templateUrl: './project.web.component.html',
    styleUrl: './project.web.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ModalForDeleteComponent, CommonModalComponent],
})
export class ProjectWebComponent implements OnDestroy {
    protected id!: string;
    protected subscription!: Subscription;
    protected sections$: Observable<ISection[]>;
    protected currentProject$: Observable<IProject[]>;
    protected isOpen: boolean = false;
    protected refreshSubject$: Subject<void> = new Subject<void>();

    constructor(
        private _activateRoute: ActivatedRoute,
        private _cdr: ChangeDetectorRef,
        private _projectService: ProjectService,
        private _destroyRef: DestroyRef
    ) {
        this.subscription = _activateRoute.params.subscribe((params) => {
            this.id = params['id'];
            this._cdr.markForCheck();
        });
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
    public getSections(): Observable<ISection[]> {
        return this._projectService.getSection(this.id);
    }
    /**
     * get project
     */
    public getProject(): Observable<IProject[]> {
        return this._projectService.getProject(this.id);
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
    public addSection(section: ISection): void {
        if (section) {
            this._projectService
                .addSection(this.id, section)
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe();
        }
    }
}
