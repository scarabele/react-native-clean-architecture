import axios, {AxiosInstance} from 'axios';
import HttpClient from './HttpClient';

export default class AxiosClient implements HttpClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 1000 * 10,
    });
  }

  get(url: string): Promise<any> {
    return this.axiosInstance.get(url);
  }
}
