import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'skeleton-loading',
    templateUrl: './skeleton.component.html',
    styleUrl: 'skeleton.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: []
})
export class SkeletonLoadingComponent {

}
