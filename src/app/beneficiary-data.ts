import { BENEFICIARY_STATUS_ID } from '../constants';
import { Dhis2TrackedEntityInstance } from '../models';
import { AppUtil } from '../utils';

export class BeneficiaryData {
  private _teiData: Dhis2TrackedEntityInstance;

  constructor(tei: Dhis2TrackedEntityInstance) {
    this._teiData = tei;
  }

  get shouldSync(): boolean {
    return this.previousBeneficiaryStatus != this.beneficiaryStatus;
  }

  get previousBeneficiaryStatus(): string {
    return AppUtil.getAttributeValueById(
      this._teiData.attributes || [],
      BENEFICIARY_STATUS_ID
    );
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
