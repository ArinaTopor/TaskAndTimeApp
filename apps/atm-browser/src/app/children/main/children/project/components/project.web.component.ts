import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalForDeleteComponent } from 'apps/atm-browser/src/app/modules/modal-for-delete/modal-for-delete.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { CommonModalComponent } from 'apps/atm-browser/src/app/modules/common-modal/common-modal.component';

@Component({
    selector: 'project-web-component',
    templateUrl: './project.web.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ProjectService, ModalForDeleteComponent, CommonModalComponent],
})
export class ProjectWebComponent implements OnDestroy {
    protected id: BehaviorSubject<number | null> = new BehaviorSubject<
        number | null
    >(null);
    protected subscription!: Subscription;

    constructor(
        private _activateRoute: ActivatedRoute,
        private _cdr: ChangeDetectorRef
    ) {
        this.subscription = _activateRoute.params.subscribe((params) => {
            this.id.next(params['id']);
            this._cdr.markForCheck();
        });
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
