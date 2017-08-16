import * as CSCoreSDK from 'cs-core-sdk';
import { TransactionsResource } from './transactions';

/**
 * List Transparent accounts and get a detail of them  
 * @class TransparentAccountsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.PaginatedListEnabled<TransparentAccount>}
 * @implements {CSCoreSDK.HasInstanceResource<TransparentAccountResource>}
 */
export class TransparentAccountsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.PaginatedListEnabled<TransparentAccount>,
  CSCoreSDK.HasInstanceResource<TransparentAccountResource> {

  /**
   * List Transparent accounts
   * @param {TransparentAccountsParameters=} params
   * @returns {Promise<TransparentAccountList>}
   */
  list = (params?: TransparentAccountsParameters): Promise<TransparentAccountList> => {

    return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'accounts', params, response => {

      response.items.forEach((item: TransparentAccount) => {

        // transform ISO strings to native Date objects and add id property
        transformResponse(item);

        // add convenient get and transactions getters to the account listing
        resourcifyResponse(item, this.withId(item.id));
      })
      return response;
    });
  }

  /**
   * Get a single TransparentAccountResource for an account with a given id
   * @param {string|number} id
   * @returns {TransparentAccountResource}
   */
  withId = (id: string | number): TransparentAccountResource => {
    return new TransparentAccountResource(id, this._path, this._client);
  }

}

/**
 * Get a detail of an account
 * @class TransparentAccountResource
 * @extends {CSCoreSDK.InstanceResource}
 * @implements {CSCoreSDK.GetEnabled<TransparentAccount>}
 */
export class TransparentAccountResource extends CSCoreSDK.InstanceResource
  implements CSCoreSDK.GetEnabled<TransparentAccount> {

  /**
   * Returns detail of the account in a Promise  
   * @returns {Promise<TransparentAccount>}
   */
  get = (): Promise<TransparentAccount> => {
    return CSCoreSDK.ResourceUtils.CallGet(this, null).then((account: TransparentAccount) => {

      // transform ISO strings to native Date objects and add id property
      transformResponse(account);

      // add convenient transactions getter to the account listing
      account.transactions = this.transactions;
      return account;
    });
  }

  /**
   * Returns TransactionResource for listing transactions of the account  
   * @returns {TransactionsResource}
   */
  get transactions(): TransactionsResource {
    return new TransactionsResource(this.getPath() + "/transactions", this._client);
  }
}

function transformResponse(account: TransparentAccount): void {
  CSCoreSDK.EntityUtils.addIdProperty(account, "accountNumber");
  CSCoreSDK.EntityUtils.addDatesFromISO(['transparencyFrom', 'transparencyTo', 'publicationTo', 'actualizationDate'], account);
}

function resourcifyResponse(accountListing: TransparentAccount, accountResource: TransparentAccountResource) {
  accountListing.get = accountResource.get;
  accountListing.transactions = accountResource.transactions;
}

/**
 * @interface TransparentAccountList
 * @extends {CSCoreSDK.PaginatedListResponse<TransparentAccount>}
 */
export interface TransparentAccountList extends CSCoreSDK.PaginatedListResponse<TransparentAccount> { }

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