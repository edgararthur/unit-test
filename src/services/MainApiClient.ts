import {CPNApiClient} from 'cpn-client-sdk-js';

export default class MainApiClient extends CPNApiClient {
  constructor(serverConfig?: any) {
    super(serverConfig);
  }
}