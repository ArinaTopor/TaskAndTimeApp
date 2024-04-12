export class TabButtonViewModel {

    private _pathToIcons: string = '../../../../../assets/icons/';

    constructor(
        public readonly icon: string,
        public readonly title: string,
        public readonly link: string,
    ) {
        this.icon = this._pathToIcons + icon;
        this.title = title;
        this.link = link;
    }
}
