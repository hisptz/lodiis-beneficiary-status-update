export interface Dhis2TrackedEntityInstance {
  //TODO update TEIs data models
  trackedEntityInstance: string;
  orgUnit: string;
  attributes: Array<{
    attribute: string;
    value: string;
  }>;
}
