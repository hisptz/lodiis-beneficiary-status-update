import _ from 'lodash';
import { BENEFICIARY_STATUS_ID } from '../constants';
import { Dhis2TrackedEntityInstance } from '../models';
import { AppUtil, BeneficiaryDataUtil } from '../utils';

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
    return BeneficiaryDataUtil.getCurrentBeneficairyStatus(this._teiData);
  }

  toDhis2(): any {
    return {
      orgUnit: this._teiData.orgUnit,
      trackedEntityInstance: this._teiData.trackedEntityInstance,
      attributes: _.flattenDeep(
        _.concat(
          _.filter(this._teiData.attributes, (attributObj) => {
            attributObj.attribute != BENEFICIARY_STATUS_ID;
          }),
          { attribute: BENEFICIARY_STATUS_ID, value: this.beneficiaryStatus }
        )
      )
    };
  }
}
