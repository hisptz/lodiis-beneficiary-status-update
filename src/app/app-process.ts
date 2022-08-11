import _ from 'lodash';
import { appConfig } from '../configs';
import {
  Dhis2TrackedEntityInstanceUtil,
  ExcelUtil,
  FileUtil,
  LogsUtil
} from '../utils';

export class AppProcess {
  private _dhis2TrackedEntityInstanceUtil: Dhis2TrackedEntityInstanceUtil;

  constructor() {
    this._dhis2TrackedEntityInstanceUtil = new Dhis2TrackedEntityInstanceUtil(
      appConfig.username,
      appConfig.password,
      appConfig.baseUrl
    );
  }
}
