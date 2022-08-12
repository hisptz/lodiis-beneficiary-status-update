import _ from 'lodash';
import { BENEFICIARY_STATUS, BENEFICIARY_STATUS_ID } from '../constants';
import { Dhis2TrackedEntityInstance } from '../models';
import { AppUtil, BeneficiaryDataUtil } from '../utils';

export class BeneficiaryData {
  private _teiData: Dhis2TrackedEntityInstance;
  private _programId: string;

  constructor(tei: Dhis2TrackedEntityInstance, programId: string) {
    this._teiData = tei;
    this._programId = programId;
  }

  get shouldSync(): boolean {
    return (
      ([
        BENEFICIARY_STATUS.active,
        BENEFICIARY_STATUS.missedServices,
        BENEFICIARY_STATUS.active
      ].includes(this.previousBeneficiaryStatus) &&
        this.previousBeneficiaryStatus !== this.beneficiaryStatus) ||
      (this.beneficiaryStatus !== '' && this.previousBeneficiaryStatus === '')
    );
  }

  get previousBeneficiaryStatus(): string {
    return AppUtil.getAttributeValueById(
      this._teiData.attributes || [],
      BENEFICIARY_STATUS_ID
    );
  }

  get beneficiaryStatus(): string {
    return BeneficiaryDataUtil.getCurrentBeneficairyStatus(
      this._teiData,
      this._programId
    );
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
