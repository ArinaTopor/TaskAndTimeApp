import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalForDeleteComponent } from 'apps/atm-browser/src/app/modules/modal-for-delete/modal-for-delete.component';
import { Observable, Subscription } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { CommonModalComponent } from 'apps/atm-browser/src/app/modules/common-modal/common-modal.component';
import { ISection } from '@atm-project/common';

@Component({
    selector: 'project-web-component',
    templateUrl: './project.web.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ModalForDeleteComponent, CommonModalComponent],
})
export class ProjectWebComponent implements OnDestroy {
    protected id!: string;
    protected subscription!: Subscription;
    protected sections$: Observable<ISection[]>;

    constructor(
        private _activateRoute: ActivatedRoute,
        private _cdr: ChangeDetectorRef,
        private _projectService: ProjectService
    ) {
        this.subscription = _activateRoute.params.subscribe((params) => {
            this.id = params['id'];
            this._cdr.markForCheck();
        });
        this.sections$ = this._projectService.getSection(this.id);
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    /**
     *ghg
     */
    public getSections(): void {
        this._projectService.getSectionInfo(this.id).subscribe();
    }
}
