import * as CSCoreSDK from 'cs-core-sdk';
import { TransparentAccountsResource } from './accounts';
/**
 * Returns the singleton TransparentAccountsClient
 * @returns {TransparentAccountsClient}
 */
export declare function getClient(): TransparentAccountsClient;
/**
 * Transparent Accounts client
 * @class TransparentAccountsClient
 * @extends {CSCoreSDK.WebApiClient}
 */
export declare class TransparentAccountsClient extends CSCoreSDK.WebApiClient {
    /**
     * Creates new instance of TransparentAccClient
     * @param {CSCoreSDK.WebApiConfiguration} config - object that configures this client
     */
    constructor(config: CSCoreSDK.WebApiConfiguration);
    /**
     * List Transparent accounts and get a detail of them
     * @returns {TransparentAccountsResource}
     */
    readonly accounts: TransparentAccountsResource;
}
