export interface BeneficiaryStatusConfigModel {
  id: string;
  validStatus: string[];
  missedServiceMonthsLimit?: number;
  inActiveMonthsLimit?: number;
  directServices: {
    programStages: string[];
    dataElements: Array<{ id: string; value?: string }>;
  };
  referralServices: {
    programStages: string[];
    dataElements: Array<{ id: string; value?: string; stages?: string[] }>;
  };
}
