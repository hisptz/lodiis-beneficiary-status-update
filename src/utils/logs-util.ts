import { FileUtil } from '.';
import moment from 'moment';

export class LogsUtil {
  private logsDir: string = 'logs';
  private logsfileName: string;
  private fileUtil: FileUtil;

  constructor(logsfileName: string = 'logs') {
    this.logsfileName = logsfileName;
    this.fileUtil = new FileUtil(this.logsDir, this.logsfileName);
  }

  async clearLogs() {
    const data = '';
    try {
      await this.fileUtil.writeToFile(data, false);
    } catch (error: any) {
      error = error.message || error;
      console.log({ error });
    }
  }

  async addLogs(type = 'INFO', message: any, resource = '') {
    const time = moment().format('YYYY-MM-DD hh:mm:ss.SSS A');
    const data = `${time} ${type.toUpperCase()}(${resource}) ${message}\n`;
    const flag = 'a+';
    try {
      await this.fileUtil.writeToFile(data, false, flag);
    } catch (error: any) {
      error = error.message || error;
      console.log({ error });
    }
  }
}
