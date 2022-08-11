import request from 'request';

export class HttpUtil {
  static async getHttp(headers: any, url: string) {
    return new Promise((resolve, reject) => {
      request(
        {
          headers,
          uri: url,
          method: 'GET'
        },
        (error, response, body) => {
          if (!error) {
            let data = null;
            try {
              data = JSON.parse(body);
            } catch (error: any) {
              console.log(error.message || error);
            } finally {
              resolve(data);
            }
          } else {
            reject(error);
          }
        }
      );
    });
  }

  static async postHttp(headers: any, url: string, data: any) {
    return new Promise((resolve, reject) => {
      request(
        {
          headers,
          uri: url,
          method: 'POST',
          body: JSON.stringify(data)
        },
        (error, response, body) => {
          if (!error) {
            let data = null;
            try {
              data = JSON.parse(body);
            } catch (error: any) {
              console.log(error.message || error);
            } finally {
              resolve(data);
            }
          } else {
            reject(error);
          }
        }
      );
    });
  }

  static async deleteHttp(headers: any, url: string) {
    return new Promise((resolve, reject) => {
      request(
        {
          headers,
          uri: url,
          method: 'DELETE'
        },
        (error, response, body) => {
          if (!error) {
            let data = null;
            try {
              data = JSON.parse(body);
            } catch (error: any) {
              console.log(error.message || error);
            } finally {
              resolve(data);
            }
          } else {
            reject(error);
          }
        }
      );
    });
  }

  static async putHttp(headers: any, url: string, data: any) {
    return new Promise((resolve, reject) => {
      request(
        {
          headers,
          uri: url,
          method: 'PUT',
          body: JSON.stringify(data)
        },
        (error, response, body) => {
          if (!error) {
            let data = null;
            try {
              data = JSON.parse(body);
            } catch (error: any) {
              console.log(error.message || error);
            } finally {
              resolve(data);
            }
          } else {
            reject(error);
          }
        }
      );
    });
  }
}
