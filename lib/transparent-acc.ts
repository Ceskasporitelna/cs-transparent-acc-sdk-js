import * as CSCoreSDK from 'cs-core-sdk';
import { TransparentAccountsResource } from './accounts';

var sharedClient: TransparentAccountsClient = null;

/**
 * Returns the singleton TransparentAccountsClient
 * @returns {TransparentAccountsClient}
 */
export function getClient(): TransparentAccountsClient {
  if (sharedClient === null) {
    sharedClient = new TransparentAccountsClient(CSCoreSDK.config);
  }
  return sharedClient;
}

/**
 * Transparent Accounts client 
 * @class TransparentAccountsClient
 * @extends {CSCoreSDK.WebApiClient}
 */
export class TransparentAccountsClient extends CSCoreSDK.WebApiClient {

  /**
   * Creates new instance of TransparentAccClient
   * @param {CSCoreSDK.WebApiConfiguration} config - object that configures this client
   */
  constructor(config: CSCoreSDK.WebApiConfiguration) {
    super(config, '/api/v2/transparentAccounts');

    //Disable signing as it is not supported for Transparent Accounts API.
    this.config.signingKey = null;
  }

  /**
   * List Transparent accounts and get a detail of them
   * @returns {TransparentAccountsResource}
   */
  get accounts(): TransparentAccountsResource {
    return new TransparentAccountsResource(this.getPath(), this);
  }
}