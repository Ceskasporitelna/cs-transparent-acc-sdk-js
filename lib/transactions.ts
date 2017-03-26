import * as CSCoreSDK from 'cs-core-sdk';

/**
 * List Transactions of an account
 * @class TransactionsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.PaginatedListEnabled<Transaction>}
 */
export class TransactionsResource extends CSCoreSDK.Resource implements
  CSCoreSDK.PaginatedListEnabled<Transaction> {

  /**
   * List all transactions of the account  
   * @param {TransactionsParameters} params
   * @returns {Promise<TransactionList>}
   */
  list = (params: TransactionsParameters): Promise<TransactionList> => {
    return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, "transactions", params, response => {

      CSCoreSDK.EntityUtils.addDatesToItems(['dueDate', 'processingDate'], response);
      return response;

    });
  }

}

/**
 * @interface TransactionsParameters
 * @extends {CSCoreSDK.Paginated}
 */
export interface TransactionsParameters extends CSCoreSDK.Paginated { }

/**
 * @interface TransactionList
 * @extends {CSCoreSDK.PaginatedListResponse<Transaction>}
 */
export interface TransactionList extends CSCoreSDK.PaginatedListResponse<Transaction> { }

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