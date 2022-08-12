import _ from 'lodash';
import { appConfig } from '../configs';
import {
  BENEFICIARY_STATUS_ID,
  BENEFICIARY_STATUS_PROGRAM
} from '../constants';
import {
  BeneficiaryStatusConfigModel,
  Dhis2TrackedEntityInstance
} from '../models';
import {
  Dhis2TrackedEntityInstanceUtil,
  Dhis2ProgramUtil,
  ExcelUtil,
  FileUtil,
  LogsUtil
} from '../utils';

export class AppProcess {
  private _dhis2TrackedEntityInstanceUtil: Dhis2TrackedEntityInstanceUtil;
  private _dhis2ProgramUtil: Dhis2ProgramUtil;

  constructor() {
    this._dhis2TrackedEntityInstanceUtil = new Dhis2TrackedEntityInstanceUtil(
      appConfig.username,
      appConfig.password,
      appConfig.baseUrl
    );
    this._dhis2ProgramUtil = new Dhis2ProgramUtil(
      appConfig.username,
      appConfig.password,
      appConfig.baseUrl
    );
  }

  async startProcess() {
    try {
      for (const progrmConfig of BENEFICIARY_STATUS_PROGRAM) {
        const attributeIds: any = [];
        await this._dhis2ProgramUtil.discoverProgramMandatoryAttributes(
          progrmConfig.id
        );
        const teis = await this._getBeneficiaryTeiData(
          attributeIds,
          progrmConfig
        );
        console.log(JSON.stringify(teis));
      }
    } catch (error: any) {
      await new LogsUtil().addLogs(
        'error',
        error.message || error,
        'startProcess'
      );
    }
  }

  async _getBeneficiaryTeiData(
    attributeIds: any[],
    progrmConfig: BeneficiaryStatusConfigModel
  ): Promise<Dhis2TrackedEntityInstance[]> {
    attributeIds.push(BENEFICIARY_STATUS_ID);
    const dataElementIds = _.flattenDeep(
      _.concat(
        _.map(
          progrmConfig?.directServices?.dataElements || [],
          (dataElement) => dataElement.id ?? []
        ),
        _.map(
          progrmConfig?.directServices?.dataElements || [],
          (dataElement) => dataElement.id ?? []
        )
      )
    );
    const programStageIds = _.flattenDeep(
      _.concat(
        progrmConfig?.directServices?.programStages,
        progrmConfig?.referralServices?.programStages
      )
    );
    const teis =
      await this._dhis2TrackedEntityInstanceUtil.discoverTrackedEntityInstances(
        progrmConfig.id,
        attributeIds,
        programStageIds,
        dataElementIds
      );
    return teis;
  }
}
