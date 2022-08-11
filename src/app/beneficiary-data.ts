import { Dhis2TrackedEntityInstance } from '../models';

export class BeneficiaryData {
  private _teiData: Dhis2TrackedEntityInstance;

  constructor(tei: Dhis2TrackedEntityInstance) {
    this._teiData = tei;
    console.log(this._teiData);
  }

  get beneficiaryStatus(): string {
    //TODO get status based on availables data
    return '<status>';
  }

  toDhis2(): any {
    //TODO filter  and update new status
    return {
      orgUnit: this._teiData.orgUnit,
      trackedEntityInstance: this._teiData.trackedEntityInstance,
      attributes: this._teiData.attributes
    };
  }
}
