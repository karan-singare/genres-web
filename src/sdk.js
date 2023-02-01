import axios from 'axios';

export default class SDK {
  headers = {
    'Content-Type': 'application/json',
  };

  constructor(appId, appUrl) {
    this.appId = appId;
    this.baseApiUrl = this.getBaseApiUrl(appUrl);
    this.headers['x-consumer'] = 'phone';
    this.headers['app-id'] = this.appId;
  }

  async send(method, slug, data = null) {
    try {
      const url = slug ? this.baseApiUrl + slug : this.baseApiUrl;
      const options = {
        method: method,
        url: url,
        preambleCRLF: true,
        postambleCRLF: true,
        headers: this.headers,
      };
      data ? (options['data'] = data) : '';
      return (await axios(options)).data;
    } catch (error) {
      console.log('error while sending request');
      console.log(error);
    }
  }

  async get(slug) {
    return await this.send('get', slug);
  }

  async getAll(slug) {
    return await this.send('get', slug);
  }

  async post(data, slug) {
    return await this.send('post', slug, data);
  }

  async put(data, slug) {
    return await this.send('put', slug, data);
  }

  async delete(slug) {
    return await this.send('delete', slug);
  }

  getBaseApiUrl(appUrl) {
    if(appUrl.includes('.dev.')) {
      return 'https://dev-apis.mogiio.com/';
    }
    if(appUrl.includes('.qa.')) {
      return 'https://qa-apis.mogiio.com/';
    }
    if(appUrl.includes('.stag.')) {
      return 'https://stag-apis.mogiio.com/';
    }
    return 'https://apis.mogiio.com/';
  }
}
