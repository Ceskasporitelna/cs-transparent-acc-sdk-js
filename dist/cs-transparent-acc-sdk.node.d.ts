/// <reference types="es6-promise" />
declare module 'cs-transparent-acc-sdk/transactions' {
	import * as CSCoreSDK from 'cs-core-sdk';
	/**
	 * List Transactions of an account
	 * @class TransactionsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Transaction>}
	 */
	export class TransactionsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Transaction> {
	    /**
	     * List all transactions of the account
	     * @param {TransactionsParameters} params
	     * @returns {Promise<TransactionList>}
	     */
	    list: (params: TransactionsParameters) => Promise<TransactionList>;
	}
	/**
	 * @interface TransactionsParameters
	 * @extends {CSCoreSDK.Paginated}
	 */
	export interface TransactionsParameters extends CSCoreSDK.Paginated, CSCoreSDK.Sortable {
	    /**
	     * For filtering transactions by date
	     */
	    dateFrom?: Date;
	    /**
	     * For filtering transactions by date
	     */
	    dateTo?: Date;
	    /**
	     * For filtering transactions by other parameters (account number, name, variable and constant symbol) Example: ucet pana Novaka.
	     */
	    filter?: string;
	}
	/**
	 * @interface TransactionList
	 * @extends {CSCoreSDK.PaginatedListResponse<Transaction>}
	 */
	export interface TransactionList extends CSCoreSDK.PaginatedListResponse<Transaction> {
	}
	/**
	 * @interface Transaction
	 */
	export interface Transaction {
	    /**
	    * transaction amount
	    */
	    amount: TransactionAmount;
	    /**
	    * transaction type
	    */
	    type: string;
	    /**
	    * transaction date
	    */
	    dueDate: Date;
	    /**
	    * transaction valuation date
	    */
	    processingDate: Date;
	    /**
	    * information about the sender
	    */
	    sender: Sender;
	    /**
	    * information about the receiver
	    */
	    receiver: Receiver;
	    /**
	    * Get description of transaction type
	    * f.e. Úhrada
	    */
	    typeDescription?: string;
	}
	/**
	 * @interface TransactionAmount
	 */
	export interface TransactionAmount {
	    /**
	    * amount value
	    */
	    value: number;
	    /**
	    * amount precision in decimals
	    */
	    precision: number;
	    /**
	    * amount currency
	    */
	    currency: string;
	}
	/**
	 * @interface Sender
	 */
	export interface Sender {
	    /**
	    * sender name
	    */
	    name?: string;
	    /**
	    * sender transaction description
	    */
	    description?: string;
	    /**
	    * constant symbol
	    */
	    constantSymbol?: string;
	    /**
	    * specific symbol
	    */
	    specificSymbol?: string;
	    /**
	    * specific symbol party
	    */
	    specificSymbolParty?: string;
	    /**
	    * variable symbol
	    */
	    variableSymbol?: string;
	    /**
	    * sender account number
	    */
	    accountNumber: string;
	    /**
	    * sender bank code
	    */
	    bankCode: string;
	    /**
	    * sender account IBAN
	    */
	    iban: string;
	}
	/**
	 * @interface Receiver
	 */
	export interface Receiver {
	    /**
	    * receiver account IBAN
	    */
	    iban: string;
	    /**
	    * receiver account number
	    */
	    accountNumber: string;
	    /**
	    * receiver bank code
	    */
	    bankCode: string;
	}

}
declare module 'cs-transparent-acc-sdk/accounts' {
	import * as CSCoreSDK from 'cs-core-sdk';
	import { TransactionsResource } from 'cs-transparent-acc-sdk/transactions';
	/**
	 * List Transparent accounts and get a detail of them
	 * @class TransparentAccountsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<TransparentAccount>}
	 * @implements {CSCoreSDK.HasInstanceResource<TransparentAccountResource>}
	 */
	export class TransparentAccountsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<TransparentAccount>, CSCoreSDK.HasInstanceResource<TransparentAccountResource> {
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
	export class TransparentAccountResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<TransparentAccount> {
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

}
declare module 'cs-transparent-acc-sdk/transparent-acc' {
	import * as CSCoreSDK from 'cs-core-sdk';
	import { TransparentAccountsResource } from 'cs-transparent-acc-sdk/accounts';
	/**
	 * Returns the singleton TransparentAccountsClient
	 * @returns {TransparentAccountsClient}
	 */
	export function getClient(): TransparentAccountsClient;
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
	    constructor(config: CSCoreSDK.WebApiConfiguration);
	    /**
	     * List Transparent accounts and get a detail of them
	     * @returns {TransparentAccountsResource}
	     */
	    readonly accounts: TransparentAccountsResource;
	}

}
declare module 'cs-transparent-acc-sdk'{ export * from 'cs-transparent-acc-sdk/transparent-acc'}