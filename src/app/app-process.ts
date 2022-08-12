import _ from 'lodash';
import { BeneficiaryData } from '.';
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
        const mandatoryAttributeIds: any =
          await this._dhis2ProgramUtil.discoverProgramMandatoryAttributes(
            progrmConfig.id
          );
        const { programId, attributeIds, dataElementIds, programStageIds } =
          this._getBeneficiaryMetadataConfig(
            mandatoryAttributeIds,
            progrmConfig
          );

        const pagefilters =
          await this._dhis2TrackedEntityInstanceUtil.discoverTrackedEntityInstancesPageFilters(
            progrmConfig.id
          );
        let count = 0;
        for (const pagefilter of pagefilters) {
          count++;
          await new LogsUtil().addLogs(
            'info',
            `Discovering TEIs : ${programId} ::: ${count}/${pagefilters.length} `,
            'startProcess'
          );
          const teis =
            await this._dhis2TrackedEntityInstanceUtil.discoverTrackedEntityInstancesByPagination(
              programId,
              attributeIds,
              programStageIds,
              dataElementIds,
              pagefilter
            );
          const beneficiraries = _.filter(
            _.flattenDeep(
              _.map(teis, (tei) => {
                return new BeneficiaryData(tei, programId);
              })
            ),
            (beneficirary) => beneficirary.shouldSync
          );
          if (beneficiraries.length > 0) {
            const response =
              await this._dhis2TrackedEntityInstanceUtil.syncTrackedEntityInstanceToServer(
                _.map(beneficiraries, (beneficirary) => beneficirary.toDhis2())
              );
            console.log(response);
          }
        }
      }
    } catch (error: any) {
      await new LogsUtil().addLogs(
        'error',
        error.message || error,
        'startProcess'
      );
    }
  }

  _getBeneficiaryMetadataConfig(
    attributeIds: any[],
    progrmConfig: BeneficiaryStatusConfigModel
  ) {
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
    return {
      programId: progrmConfig.id,
      attributeIds,
      dataElementIds,
      programStageIds
    };
  }
}
