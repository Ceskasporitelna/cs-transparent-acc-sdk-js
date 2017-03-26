# Using TransparentAccSDK
TransparentAcc alows you to access information about Česká spořitelna a.s. transparent accounts and transactions on them.

This SDK uses [ES6-promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) as its return values from asynchronous calls.

## Before You Begin

Before using CoreSDK in your application, you need to initialize it by providing it your WebApiKey.

```javascript
    //Set your WebApi key
    CSCoreSDK.useWebApiKey( "YourApiKey" )
    //Get TransparentAccountsClient
    var transparentAccountsClient = CSTransparentAccSDK.getClient();
```

## Resources
These resources are available on the `TransparentAccountsClient`.

- TransparentAccountsResource - List all transparent accounts.

To get resource instances see the following code snippet.

```javascript
    //Get TransparentAccountsClient
    var transparentAccountsClient = CSTransparentAccSDK.getClient();

    // Get Accounts Instance
    transparentAccountsClient.accounts
```
## Usage
This usage guide walks you through a process of getting list of transactios on an account.

### 1. List All Accounts

You can get list of all transparent accounts using `TransparentAccountsResource`. This is a list of all transparent accounts objects with theirs information.


```javascript

    // List of available accounts
    CSTransparentAccSDK
        .getClient()
        .accounts
        .list()
        .then(function(accounts){
            var account = list.items[0];
            console.log(account.iban); // CZ0308000000000005524612
         });

```

### 2. Get individual account

Call `.withId(string)` on `TransparentAccountsResource` method to get one specific account. This definition includes all information about the account.

To get the individual account, you can use:

```javascript

    // Get one specific transparent account using accountListing accountNumber.
    CSTransparentAccSDK
        .getClient()
        .accounts
        .withId('000000-0005524612')
        .get()
        .then(function(account){
            console.log(account.iban); // CZ0308000000000005524612
        });

```

### 3. Get transactions on transparent account

Call `.list(params)` on `TransactionsResource` method to get list of transactions on one specific account. You have to specify the pageNumber you want(starts at zero) and pageSize.
```javascript

    // Get list of transactions on transparent account using accountListing accountNumber.
    var list;
    CSTransparentAccSDK
        .getClient()
        .accounts
        .withId('000000-0005524612')
        .transactions
        .list({
            pageNumber: 0,
            pageSize: 25
        })
        .then(function(transactions) {
            var transaction = transactions.items[0];
            list = transactions;
            console.log(transaction.transactionType); // debetní úrok
        });

```

### 4. Get next page of transactions

Call `.nextPage()` on `response` from the first call.
```javascript

    // Get next page of transactions
    list
      .nextPage()
      .then(function(transactions) => {
          console.log(transactions.pagination.pageNumber); // 1
      });
```



## Further documentation
Please see the documented [TypeScript definition file](../dist/cs-transparent-acc-sdk.sfx.d.ts) for detailed description of the functionalities provided by this SDK.

This SDK communicates with Transparent Accounts API. You can have a look at its [documentation](http://docs.ext0csastransparentaccounts.apiary.io/).
