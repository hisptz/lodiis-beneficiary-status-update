import _ from 'lodash';
import { HttpUtil, AppUtil, LogsUtil } from './';

export class Dhis2ProgramUtil {
  private _headers: {
    Authorization: string;
    'Content-Type': string;
  };
  private _baseUrl: string;

  constructor(username: string, password: string, baseUrl: string) {
    this._headers = AppUtil.getHttpAuthorizationHeader(username, password);
    this._baseUrl = baseUrl;
  }

  async discoverProgramMandatoryAttributes(progrmId: string): Promise<any[]> {
    const manadatoryAttributes: any[] = [];
    const apiUrl = `${this._baseUrl}/api/programs.json`;
    const fields = `programTrackedEntityAttributes[mandatory,trackedEntityAttribute[id]`;
    try {
      await new LogsUtil().addLogs(
        'info',
        `Discovering programs manadatory fields for ${progrmId}`,
        'Dhis2 program Util'
      );
      const url = `${apiUrl}?fields=${fields}`;
      const response: any = await HttpUtil.getHttp(this._headers, url);
      manadatoryAttributes.push(
        _.map(
          _.filter(
            response.programTrackedEntityAttributes || [],
            (programTrackedEntityAttribute: any) => {
              const mandatory =
                programTrackedEntityAttribute.mandatory ?? false;
              console.log({
                mandatory,
                programTrackedEntityAttribute
              });
              return mandatory;
            }
          ),
          (programTrackedEntityAttribute: any) => {
            const trackedEntityAttribute =
              programTrackedEntityAttribute['trackedEntityAttribute'] ?? {};
            return trackedEntityAttribute['id'] ?? [];
          }
        )
      );
    } catch (error: any) {
      await new LogsUtil().addLogs(
        'error',
        error.toString(),
        'Dhis2 program Util'
      );
    }
    return _.flattenDeep(manadatoryAttributes);
  }
}
