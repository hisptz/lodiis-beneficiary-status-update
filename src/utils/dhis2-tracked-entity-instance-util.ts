import _, { at } from 'lodash';
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
  private pageSize = 10;

  constructor(username: string, password: string, baseUrl: string) {
    this._headers = AppUtil.getHttpAuthorizationHeader(username, password);
    this._baseUrl = baseUrl;
  }
  ///TODO const url = `${serverUrl}/api/trackedEntityInstances?strategy=CREATE_AND_UPDATE`;

  async discoverTrackedEntityInstancesPageFilters(
    program: string,
    organisationUniIds: string[] = []
  ): Promise<string[]> {
    const ouFilter =
      organisationUniIds.length > 0
        ? `ou=${organisationUniIds.join(';')}&ouMode=DESCENDANTS`
        : `ouMode=ACCESSIBLE`;
    const apiUrl = `${this._baseUrl}/api/trackedEntityInstances.json?program=${program}&${ouFilter}`;
    await new LogsUtil().addLogs(
      'info',
      `Discovering pagination details for TEIs : ${program}`,
      'Dhis2 TEI Util'
    );
    const responsePaginations = await HttpUtil.getHttp(
      this._headers,
      `${apiUrl}&pageSize=1&fields=none&totalPages=true`
    );
    return AppUtil.getPaginationsFilters(responsePaginations, this.pageSize);
  }

  async discoverTrackedEntityInstancesByPagination(
    program: string,
    attributeIds: string[],
    programStageIds: string[],
    dataElementIds: string[],
    pagefilter: string,
    organisationUniIds: string[] = []
  ): Promise<Dhis2TrackedEntityInstance[]> {
    const fields = `trackedEntityInstance,orgUnit,attributes[attribute,value],enrollments[enrollmentDate,events[event,programStage,eventDate,dataValues[value,dataElement]]]`;
    const ouFilter =
      organisationUniIds.length > 0
        ? `ou=${organisationUniIds.join(';')}&ouMode=DESCENDANTS`
        : `ouMode=ACCESSIBLE`;
    const apiUrl = `${this._baseUrl}/api/trackedEntityInstances.json?program=${program}&${ouFilter}`;
    const url = `${apiUrl}&fields=${fields}&${pagefilter}`;
    const response: any = await HttpUtil.getHttp(this._headers, url);
    return _.flattenDeep(
      _.map(
        response.trackedEntityInstances || [],
        (tei: Dhis2TrackedEntityInstance) => {
          return {
            ...tei,
            attributes: _.filter(tei.attributes || [], (attributObj) =>
              attributeIds.includes(attributObj.attribute)
            ),
            enrollments: _.map(tei.enrollments || [], (enrollment) => {
              return {
                ...enrollment,
                enrollmentDate: AppUtil.getFormattedDate(
                  enrollment.enrollmentDate
                ),
                events: _.flattenDeep(
                  _.map(
                    _.filter(enrollment.events || [], (eventObj) => {
                      const programStage = eventObj.programStage || '';
                      return programStageIds.includes(programStage);
                    }),
                    (eventObj) => {
                      return {
                        ...eventObj,
                        eventDate: AppUtil.getFormattedDate(eventObj.eventDate),
                        dataValues: _.filter(
                          eventObj.dataValues || [],
                          (dataValue) => {
                            const id = dataValue.dataElement ?? '';
                            return dataElementIds.includes(id);
                          }
                        )
                      };
                    }
                  )
                )
              };
            })
          };
        }
      )
    );
  }
}
