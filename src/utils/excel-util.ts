import { LogsUtil, FileUtil } from '.';
import * as _ from 'lodash';
import xlsx from 'xlsx';

export class ExcelUtil {
  private logsUtil: LogsUtil;
  private fileUtil: FileUtil;
  private defaultSheet: string = 'Sheet';
  private excelDir: string = 'excels';
  private excelFileName: string;

  constructor(excelFileName: string) {
    this.excelFileName = excelFileName;
    this.logsUtil = new LogsUtil();
    this.fileUtil = new FileUtil(this.excelDir, this.excelFileName, 'xlsx');
  }

  async writeToSingleSheetExcelFile(
    jsonData: any,
    skipHeader = false,
    sheetName = this.defaultSheet
  ) {
    try {
      await this.logsUtil.addLogs(
        'info',
        `Writing excel contents to ${this.fileUtil.formattedFileName}`,
        'getJsonDataFromExcelOrCsvFile'
      );
      const ws = xlsx.utils.json_to_sheet(jsonData, {
        header: _.uniq(_.flattenDeep(_.map(jsonData, (data) => _.keys(data)))),
        skipHeader
      });
      let workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, ws, sheetName);
      xlsx.writeFile(workbook, `${this.fileUtil.filePath}`);
    } catch (error: any) {
      await this.logsUtil.addLogs(
        'error',
        error.message || error,
        'getJsonDataFromExcelOrCsvFile'
      );
    }
  }

  async writeToMultipleSheetExcelFile(jsonDataObject: any, skipHeader = false) {
    try {
      await this.logsUtil.addLogs(
        'info',
        `Writing excel contents to ${this.fileUtil.formattedFileName}`,
        'getJsonDataFromExcelOrCsvFile'
      );
      let workbook = xlsx.utils.book_new();
      for (const sheetName of _.keys(jsonDataObject)) {
        const jsonData = jsonDataObject[sheetName];
        const ws = xlsx.utils.json_to_sheet(jsonData, {
          header: _.uniq(
            _.flattenDeep(_.map(jsonData, (data) => _.keys(data)))
          ),
          skipHeader
        });
        xlsx.utils.book_append_sheet(workbook, ws, sheetName);
      }
      xlsx.writeFile(workbook, `${this.fileUtil.filePath}`);
    } catch (error: any) {
      await this.logsUtil.addLogs(
        'error',
        error.message || error,
        'getJsonDataFromExcelOrCsvFile'
      );
    }
  }

  async getJsonDataFromExcelOrCsvFile() {
    let data: any = {};
    try {
      await this.logsUtil.addLogs(
        'info',
        `Reading excel contents for ${this.fileUtil.formattedFileName}`,
        'getJsonDataFromExcelOrCsvFile'
      );
      const workbook = xlsx.readFile(`${this.fileUtil.filePath}`);
      const sheet_name_list = workbook.SheetNames;
      for (const sheet_name of sheet_name_list) {
        try {
          const sheet = workbook.Sheets[sheet_name];
          const dataObjects = xlsx.utils.sheet_to_json(sheet);
          data[`${sheet_name}`.trim()] = _.map(dataObjects, (dataObj: any) => {
            const newDataObj: any = {};
            for (const key of _.keys(dataObj)) {
              const newKey = `${key}`.trim().replace(/\n/g, '');
              const value = `${dataObj[key]}`.trim();
              if (value != '') {
                newDataObj[newKey] = value;
              }
            }
            return newDataObj;
          });
        } catch (error: any) {
          await this.logsUtil.addLogs(
            'error',
            error.message || error,
            'getJsonDataFromExcelOrCsvFile'
          );
        }
      }
    } catch (error: any) {
      await this.logsUtil.addLogs(
        'error',
        error.message || error,
        'getJsonDataFromExcelOrCsvFile'
      );
    }
    return data;
  }
}
