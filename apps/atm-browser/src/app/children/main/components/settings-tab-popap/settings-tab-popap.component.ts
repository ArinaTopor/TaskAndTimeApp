import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModalComponent } from '../common-modal/common-modal.component';
import { ModalForDeleteComponent } from 'apps/atm-browser/src/app/modules/modal-for-delete/modal-for-delete.component';

@Component({
    selector: 'settinds-tab-popap',
    templateUrl: './settings-tab-popap.component.html',
    styleUrl: './settings-tab-popap.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CommonModalComponent, ModalForDeleteComponent],
})
export class SettingsTabComponent {
    protected readonly items: string[] = ['Редактировать', 'Удалить'];
    protected open: boolean = false;
    protected openDeleteNotification: boolean = false;
    protected openCommonModal: boolean = false;

    /**
     * errfd
     */
    public openCommon(): void {
        this.openCommonModal = true;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    public onClick(): void {
        this.openDeleteNotification = true;
        console.log(this.openDeleteNotification);
        // this.openDeleteNotification = false;
    }
    /**
     * for cancel modal-delete
     */
    public handleCancel(): void {
        this.openDeleteNotification = false;
    }
    /**
     * hjsjhd
     */
    public handleConfirm(): void {
        console.log('Удалено:');
        this.openDeleteNotification = false;
    }
}
