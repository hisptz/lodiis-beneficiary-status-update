import _ from 'lodash';
import { appConfig } from '../configs';
import { BENEFICIARY_STATUS_PROGRAM } from '../constants';
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
        const manadatoryAttributes =
          await this._dhis2ProgramUtil.discoverProgramMandatoryAttributes(
            progrmConfig.id
          );
      }
    } catch (error: any) {
      await new LogsUtil().addLogs(
        'error',
        error.message || error,
        'startProcess'
      );
    }
  }
}
