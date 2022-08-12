import _ from 'lodash';
import { BENEFICIARY_STATUS, BENEFICIARY_STATUS_PROGRAM } from '../constants';
import {
  BeneficiaryStatusConfigModel,
  Dhis2TrackedEntityInstance
} from '../models';
import { AppUtil } from './app-util';

export class BeneficiaryDataUtil {
  static getLastService(tei: Dhis2TrackedEntityInstance) {
    const events = _.flattenDeep(
      _.map(tei.enrollments || [], (enrollment) => enrollment.events || [])
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
      const lastService: any = this.getLastService(tei);
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
        const programStage = lastService['programStage'] ?? '';
        console.log({ lastServiceDate, programStage });
      }
    }
    return status;
  }
}
