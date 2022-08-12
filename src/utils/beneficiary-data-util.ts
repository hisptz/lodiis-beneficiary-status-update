import _ from 'lodash';
import { Dhis2TrackedEntityInstance } from '../models';

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

  static getCurrentBeneficairyStatus(tei: Dhis2TrackedEntityInstance): string {
    const lastService = this.getLastService(tei);
    const enrollmentDate = _.head(
      _.flattenDeep(
        _.map(tei.enrollments || [], (enrollment) => enrollment.enrollmentDate)
      )
    );
    console.log({ lastService, enrollmentDate });
    return 'status';
  }
}
