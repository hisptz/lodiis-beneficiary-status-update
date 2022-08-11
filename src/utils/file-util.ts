import shelljs from 'shelljs';
import fs from 'fs';
import * as _ from 'lodash';

export class FileUtil {
  private _fileDir: string;
  private _filename: string;
  private _extension: string;
  constructor(outputDir: string, filename: string, extension: string = 'txt') {
    this._extension = extension;
    this._fileDir = `resources/${outputDir}`;
    this._filename = filename;
    this.intiateFilesDirectories(this._fileDir);
  }

  get filePath(): string {
    return `${this._fileDir}/${this.formattedFileName}`;
  }

  get fileName(): string {
    return this._filename;
  }

  get fileDir(): string {
    return this._fileDir;
  }

  get formattedFileName(): string {
    return `${_.join(
      _.filter(
        _.join(
          _.filter(this._filename.split('/'), (key) => key.trim() !== ''),
          '_'
        ).split(' '),
        (key) => key.trim() !== ''
      ),
      '_'
    )}.${this._extension}`;
  }

  getFilesNamesUsingPath(path: string) {
    const fileResponse = shelljs.ls(`${path}`);
    return _.flatMapDeep(
      _.map(
        _.filter(fileResponse.stdout.split(`\n`), (name) => name !== ''),
        (name: string) => name.trim()
      )
    );
  }

  intiateFilesDirectories(directories: any) {
    return new Promise((resolve, reject) => {
      const response = shelljs.mkdir('-p', directories);
      if (response && !response.stderr) {
        resolve([]);
      } else {
        reject(response.stderr);
      }
    });
  }

  async writeToFile(data: any, shouldStringify = true, flag = 'w') {
    return new Promise((resolve, reject) => {
      data = shouldStringify ? JSON.stringify(data) : data;
      fs.writeFile(
        `${this._fileDir}/${this.formattedFileName}`,
        data,
        { flag },
        async (error) => {
          if (error) {
            console.log(JSON.stringify({ error, type: 'writeToFile' }));
          } else {
            resolve([]);
          }
        }
      );
    });
  }

  async readDataFromFile() {
    let data: any = [];
    return new Promise((resolve) => {
      fs.readFile(
        `${this._fileDir}/${this.formattedFileName}`,
        (error, response: any) => {
          if (error) {
            console.log(JSON.stringify({ error, type: 'readDataFromFile' }));
          } else {
            try {
              data = JSON.parse(response);
            } catch (error) {
              data = response;
            }
          }
          resolve(data);
        }
      );
    });
  }
}
