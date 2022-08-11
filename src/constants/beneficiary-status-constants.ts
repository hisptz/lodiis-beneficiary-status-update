import { BeneficiaryStatusConfigModel } from '../models';

export const BENEFICIARY_STATUS = {
  active: 'Active',
  inActive: 'In-Active',
  missedServices: 'Missed Services'
};

export const BENEFICIARY_STATUS_ID = 'PN92g65TkVI';

export const BENEFICIARY_STATUS_PROGRAM: Array<BeneficiaryStatusConfigModel> = [
  {
    id: 'hOEIHJDrrvz',
    validStatus: [
      BENEFICIARY_STATUS.active,
      BENEFICIARY_STATUS.inActive,
      BENEFICIARY_STATUS.missedServices
    ],
    missedServiceMonthsLimit: 6,
    inActiveMonthsLimit: 12,
    directServices: {
      programStages: [
        'QNdBI9U7rnV',
        'kq6qeEgbDVY',
        'mMjGlK1W0Xo',
        'nVCqxOg0nMQ',
        'Gk494qKQP8B',
        'A7Tl3vML6as',
        'PGFt6IwdZLM',
        'yK0ENCuwPqh',
        'wA5y7RU83lF',
        'CEyIqiOZOwx',
        'NXsIkG9Q1BA',
        'bDJq2JWVTbC',
        'vAMc8n0YB6m',
        'Qw8c20q5V0w',
        'N5SlNqQuMyC',
        'uAKMWyJlXEN',
        'VLW93YjZOyf'
      ],
      dataElements: []
    },
    referralServices: {
      programStages: ['MkyTrLeBG8I', 'a7b8GrXEaQy', 'vPTKp7xDX4L'],
      dataElements: [
        {
          id: 'p7saxV2libq'
        }
      ]
    }
  },
  {
    id: 'BNsDaCclOiu',
    inActiveMonthsLimit: 6,
    validStatus: [BENEFICIARY_STATUS.active, BENEFICIARY_STATUS.inActive],
    directServices: {
      programStages: ['vcaHzmUuYzU'],
      dataElements: []
    },
    referralServices: {
      programStages: ['wPk6BYPm3Wo', 'HxUr3gvf5FA'],
      dataElements: [{ id: 'p7saxV2libq' }]
    }
  },
  {
    id: 'em38qztTI8s',
    inActiveMonthsLimit: 6,
    validStatus: [BENEFICIARY_STATUS.active, BENEFICIARY_STATUS.inActive],
    directServices: {
      programStages: ['CHFwighOquA'],
      dataElements: []
    },
    referralServices: {
      programStages: ['pnEgjBdFctR', 's827JhUFGYQ'],
      dataElements: [{ id: 'p7saxV2libq' }]
    }
  }
];
