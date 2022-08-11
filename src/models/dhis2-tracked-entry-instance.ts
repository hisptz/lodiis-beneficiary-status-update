export interface Dhis2TrackedEntityInstance {
  trackedEntityInstance: string;
  orgUnit: string;
  attributes: Array<{
    attribute: string;
    value: string;
  }>;
  enrollments?: Array<{
    program: string;
    events: Array<{
      event: string;
      eventDate: string;
      programStage: string;
      dataValues: Array<{
        value: string;
        dataElement: string;
      }>;
    }>;
  }>;
}
