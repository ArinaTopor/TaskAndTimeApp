import { Injectable } from '@angular/core';
import { FirebaseDatabaseService } from '@atm-project/common';

@Injectable()
export class ProjectService {
    constructor(private _afs: FirebaseDatabaseService) {}
}
