import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModalComponent } from 'apps/atm-browser/src/app/modules/common-modal/common-modal.component';
import { ModalForDeleteComponent } from 'apps/atm-browser/src/app/modules/modal-for-delete/modal-for-delete.component';

@Component({
    selector: 'settings-tab-popap',
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
    public isCreate: boolean = false;
    @Input() public value: string = '';
    // @Input() public commonFunction: EventE

    /**
     * open modal
     */
    public openCommon(): void {
        this.openCommonModal = true;
    }
    /**
     * open delete modal
     */
    public openDelete(): void {
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
     * function for delete
     */
    public handleConfirm(): void {
        console.log('Удалено:');
        this.openDeleteNotification = false;
    }
}
