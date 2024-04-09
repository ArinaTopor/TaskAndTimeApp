import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'skeleton-loading',
    templateUrl: './skeleton.component.html',
    styleUrl: 'skeleton.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
    ]
})
export class SkeletonLoadingComponent {
    /**
     * This method turn on/off isLoading flag
     */
    public loadData(isLoading: boolean): boolean {
        setTimeout(() => {
            isLoading = false;
        }, 3000);

        return isLoading;
    }
}
