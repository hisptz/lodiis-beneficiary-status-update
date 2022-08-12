import _ from 'lodash';
import moment from 'moment';
import { BENEFICIARY_STATUS, BENEFICIARY_STATUS_PROGRAM } from '../constants';
import {
  BeneficiaryStatusConfigModel,
  Dhis2TrackedEntityInstance
} from '../models';
import { AppUtil } from './app-util';

export class BeneficiaryDataUtil {
  static getLastService(
    tei: Dhis2TrackedEntityInstance,
    dataElementMappings: any
  ) {
    const events = _.filter(
      _.flattenDeep(
        _.map(tei.enrollments || [], (enrollment) => enrollment.events || [])
      ),
      (eventObj) => {
        let status = true;
        const programStage = eventObj['programStage'] ?? '';
        const dataElementMapping = _.find(dataElementMappings, (obj) =>
          obj?.stages.includes(programStage)
        );
        if (dataElementMapping != null) {
          status = eventObj.dataValues.length > 0;
        }
        return status;
      }
    );
    let lastService = {};
    const sortedServices: any = _.reverse(_.sortBy(events, ['eventDate']));
    if (sortedServices.length > 0) {
      lastService = { ...lastService, ...sortedServices[0] };
    }
    return lastService;
  }

  static getCurrentBeneficairyStatus(
    tei: Dhis2TrackedEntityInstance,
    programId: string
  ): string {
    let status = BENEFICIARY_STATUS.active;
    const programConfig: any = _.find(
      BENEFICIARY_STATUS_PROGRAM,
      (config) => config.id == programId
    );
    if (programConfig) {
      const {
        validStatus,
        missedServiceMonthsLimit,
        inActiveMonthsLimit,
        directServices,
        referralServices
      } = programConfig;
      const dataElementMappings = _.flattenDeep(
        _.concat(referralServices.dataElements, directServices.dataElements)
      );
      const lastService: any = this.getLastService(tei, dataElementMappings);
      const enrollmentDate = _.head(
        _.flattenDeep(
          _.map(
            tei.enrollments || [],
            (enrollment) => enrollment.enrollmentDate
          )
        )
      );
      const lastServiceDate = lastService['eventDate'] ?? enrollmentDate ?? '';
      if (lastServiceDate !== '') {
        var formattedDate = moment(lastServiceDate, 'YYYY-MM-DD');
        var currentDate = moment().startOf('day');
        const months = moment
          .duration(currentDate.diff(formattedDate))
          .asMonths();

        if (
          validStatus.includes(BENEFICIARY_STATUS.inActive) &&
          months > inActiveMonthsLimit
        ) {
          status = BENEFICIARY_STATUS.inActive;
        } else if (
          validStatus.includes(BENEFICIARY_STATUS.missedServices) &&
          months > missedServiceMonthsLimit
        ) {
          status = BENEFICIARY_STATUS.missedServices;
        }
      }
    }
    return status;
  }

  static getMonthDifference(dateFrom: Date, dateTo: Date) {
    return (
      dateTo.getMonth() -
      dateFrom.getMonth() +
      12 * (dateTo.getFullYear() - dateFrom.getFullYear())
    );
  }
}
