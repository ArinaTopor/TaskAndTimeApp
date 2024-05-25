import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    Observable,
    Subject,
    filter,
    map,
    mergeMap,
    startWith,
    switchMap,
} from 'rxjs';
import { ProjectService } from '../services/project.service';
import { CommonModalComponent } from 'apps/atm-browser/src/app/modules/common-modal/common-modal.component';
import { IProject, IElement, ISection } from '@atm-project/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeleteModalComponent } from 'apps/atm-browser/src/app/modules/delete-modal/delete-modal.component';

@Component({
    selector: 'project-web-component',
    templateUrl: './project.web.component.html',
    styleUrl: './project.web.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DeleteModalComponent, CommonModalComponent],
})
export class ProjectWebComponent implements OnInit {
    protected projectInfo$!: Observable<IProject>;
    protected sections$!: Observable<ISection[]>;
    protected isOpen: boolean = false;
    protected refreshSubject$: Subject<void> = new Subject<void>();
    constructor(
        private _activateRoute: ActivatedRoute,
        private _projectService: ProjectService,
        private _destroyRef: DestroyRef
    ) {}

    public ngOnInit(): void {
        this.projectInfo$ = this._activateRoute.params.pipe(
            mergeMap((params) =>
                this._projectService.getProjectById(params['id'])
            ),
            map((result) => result[0].payload.doc.data())
        );
        this.sections$ = this.projectInfo$.pipe(
            filter((projectInfo): projectInfo is IProject => !!projectInfo),
            switchMap((projectInfo) => {
                const projectId: string = projectInfo.id;

                return this.refreshSubject$.pipe(
                    startWith(null),
                    switchMap(() => this.getSections(projectId))
                );
            })
        );
    }

    /**
     * get sections
     */
    public getSections(id: string): Observable<ISection[]> {
        return this.refreshSubject$.pipe(
            startWith(null),
            switchMap(() => this._projectService.getSections(id))
        );
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
    public addSection(section: IElement, projectId: string): void {
        this._projectService
            .addSection(projectId, section)
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
        this.refreshSubject$.next();
    }
}
