import { LogsUtil } from './utils';
import { AppProcess } from './app';
import _ from 'lodash';

startAppProcess();

async function startAppProcess() {
  try {
    await new LogsUtil().clearLogs();
    await new LogsUtil().addLogs(
      'info',
      'Start of KB beneficiary status updates',
      'App'
    );
    const appProcess = new AppProcess();
    await new LogsUtil().addLogs(
      'info',
      'End of KB beneficiary status updates',
      'App'
    );
  } catch (error: any) {
    await new LogsUtil().addLogs('error', error.toString(), 'App');
  }
}
