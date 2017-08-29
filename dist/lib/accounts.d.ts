import * as CSCoreSDK from 'cs-core-sdk';
import { TransactionsResource } from './transactions';
/**
 * List Transparent accounts and get a detail of them
 * @class TransparentAccountsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.PaginatedListEnabled<TransparentAccount>}
 * @implements {CSCoreSDK.HasInstanceResource<TransparentAccountResource>}
 */
export declare class TransparentAccountsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<TransparentAccount>, CSCoreSDK.HasInstanceResource<TransparentAccountResource> {
    /**
     * List Transparent accounts
     * @param {TransparentAccountsParameters=} params
     * @returns {Promise<TransparentAccountList>}
     */
    list: (params?: TransparentAccountsParameters) => Promise<TransparentAccountList>;
    /**
     * Get a single TransparentAccountResource for an account with a given id
     * @param {string|number} id
     * @returns {TransparentAccountResource}
     */
    withId: (id: string | number) => TransparentAccountResource;
}
/**
 * Get a detail of an account
 * @class TransparentAccountResource
 * @extends {CSCoreSDK.InstanceResource}
 * @implements {CSCoreSDK.GetEnabled<TransparentAccount>}
 */
export declare class TransparentAccountResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<TransparentAccount> {
    /**
     * Returns detail of the account in a Promise
     * @returns {Promise<TransparentAccount>}
     */
    get: () => Promise<TransparentAccount>;
    /**
     * Returns TransactionResource for listing transactions of the account
     * @returns {TransactionsResource}
     */
    readonly transactions: TransactionsResource;
}
/**
 * @interface TransparentAccountList
 * @extends {CSCoreSDK.PaginatedListResponse<TransparentAccount>}
 */
export interface TransparentAccountList extends CSCoreSDK.PaginatedListResponse<TransparentAccount> {
}
/**
 * @interface TransparentAccount
 */
export interface TransparentAccount {
    /**
     * Accounts id
     */
    id: string;
    /**
    * bank code
    */
    bankCode: number;
    /**
    * the date from which the account is transparent
    */
    transparencyFrom: Date;
    /**
    * date by which the account is transparent (including)
    */
    transparencyTo: Date;
    /**
    * date by which entries are valid
    */
    publicationTo: Date;
    /**
    * date of last update
    */
    actualizationDate?: Date;
    /**
    * actual account balance
    */
    balance?: number;
    /**
    * accounts currency
    */
    currency?: string;
    /**
    * accounts name
    */
    name?: string;
    /**
    * accounts description
    */
    description?: string;
    /**
    * accounts note
    */
    note?: string;
    /**
    * accounts iban
    */
    iban: string;
    /**
    * account number with prefix
    */
    accountNumber: string;
    /**
    * Convenience getter for getting accounts's transactions resource
    */
    transactions: TransactionsResource;
    /**
     * Convenience getter for getting accounts's detail
     * @returns {Promise<TransparentAccount>}
     */
    get: () => Promise<TransparentAccount>;
}
/**
 * @interface TransparentAccountsParameters
 * @extends {CSCoreSDK.Paginated}
 */
export interface TransparentAccountsParameters extends CSCoreSDK.Paginated {
    /**
     * For filtering accounts by name or description Example: ucet pana Novaka.
     */
    filter?: string;
}
