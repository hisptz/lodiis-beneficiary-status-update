import _ from 'lodash';
import { Dhis2TrackedEntityInstance } from '../models';
import { AppUtil } from './app-util';
import { HttpUtil } from './http-util';
import { LogsUtil } from './logs-util';

export class Dhis2TrackedEntityInstanceUtil {
  private _headers: {
    Authorization: string;
    'Content-Type': string;
  };
  private _baseUrl: string;
  private pageSize = 1000;

  constructor(username: string, password: string, baseUrl: string) {
    this._headers = AppUtil.getHttpAuthorizationHeader(username, password);
    this._baseUrl = baseUrl;
  }

  async discoverTrackedEntityInstances(
    program: string,
    organisationUniIds: string[]
  ): Promise<Dhis2TrackedEntityInstance[]> {
    const trackedEntityInstances: Dhis2TrackedEntityInstance[] = [];
    const ouFilter =
      organisationUniIds.length > 0
        ? `ou=${organisationUniIds.join(';')}&ouMode=DESCENDANTS`
        : `ouMode=ACCESSIBLE`;
    const apiUrl = `${this._baseUrl}/api/trackedEntityInstances.json?program=${program}&${ouFilter}`;
    //TODO update filters
    const fields = `trackedEntityInstance,orgUnit,created,attributes[attribute,value],enrollments[events[event,progrogramStage,eventDate]]`;
    await new LogsUtil().addLogs(
      'info',
      `Discovering pagination details for TEIs`,
      'Dhis2 TEI Util'
    );
    const responsePaginations = await HttpUtil.getHttp(
      this._headers,
      `${apiUrl}&pageSize=1&fields=none&totalPages=true`
    );
    const pagefilters = AppUtil.getPaginationsFilters(
      responsePaginations,
      this.pageSize
    );
    let count = 0;
    for (const pagefilter of pagefilters) {
      count++;
      await new LogsUtil().addLogs(
        'info',
        `Discovering details for TEIs  :::  ${count}/${pagefilters.length}`,
        'Dhis2 TEI Util'
      );
      const url = `${apiUrl}&fields=${fields}&${pagefilter}`;
      const response: any = await HttpUtil.getHttp(this._headers, url);
      trackedEntityInstances.push(response.trackedEntityInstances || []);
    }
    return _.flattenDeep(trackedEntityInstances);
  }
}
