# Using TransparentAccSDK
TransparentAccSDK allows you to access information about Česká spořitelna a.s. transparent accounts and their transactions.

This SDK uses [ES6-promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) as its return values from asynchronous calls.

## Before You Begin

Before using CoreSDK in your application, you need to initialize it by providing it your WebApiKey.

```javascript
    //Set your WebApi key
    CSCoreSDK.useWebApiKey( "YourApiKey" )
    //Get TransparentAccountsClient
    var transparentAccountsClient = CSTransparentAccSDK.getClient();
```

## General concepts

### Pagination

Resources that supports pagination implements `PaginatedListEnabled` interface (for example [`TransparentAccountsResource`](../lib/accounts.ts)). If thats the case you can (and should) pass an object with properties `pageNumber` and `pageSize` to the `list` method. There is no SDK default pagination so if you do not pass pagination parameters then you get whatever the server decides so we strongly recommend you use pagination parameters.

 ```javascript
 
    CSTransparentAccSDK
        .getClient()
        .accounts
        .list({
            // number of the page 
            pageNumber: 0,
            
            // size of the listing
            pageSize: 10 
        })
        .then(function(accounts) {
            // ...
        });
 
 ```

The response from this call contains `pagination` property. `Pagination` object has properties such as `pageCount`, `hasNextPage` or `hasPrevPage`. For `Pagination` definition please see [`ResponsePagination`](https://github.com/Ceskasporitelna/cs-core-sdk-js/blob/master/lib/web-api/lists.ts).
See full sample response below.

```javascript

    PaginatedListResponseStructure {
        items: Array[10],
        pagination: {
            hasNextPage: true,
            hasPrevPage: false,
            pageCount: 13,
            pageNumber: 0,
            pageSize: 10,
            nextPage: 1,
            prevPage: null
        },
        nextPage: function,
        prevPage: function
    }

```

On this response you can call `nextPage` function which returns `Promise` with a next page results.

```javascript

    var accounts;
    
    CSTransparentAccSDK
        .getClient()
        .accounts
        .list({
            pageNumber: 0,
            pageSize: 10
        }).then(function(response) => {
            accounts = response;            
        });
        
    // Do something ...
    
    accounts
        .nextPage()
        .then(function(response) => {
            console.log(response.pagination.pageNumber); // 1
        });

```

If you are on the second or latter page you can also call `prevPage` on the listing to get previous page results.

```javascript

    accounts
        .prevPage()
        .then(function(response) {
            console.log(response.pagination.pageNumber); // 0
        });

```

### Sorting

Methods that support server side sorting take object with properties `sort` and `order` as a parameter. These methods' parameters interfaces extend [`Sortable`](https://github.com/Ceskasporitelna/cs-core-sdk-js/blob/master/lib/web-api/lists.ts) interface which takes enum as a generic. Both `sort` and `order` parameters are optional but you obviously cannot use `order` parameter without using `sort` parameter. Available `Sort` values are dependent on individual API and we provide you with these values in enums where possible. You can use these enums or just pass strings. `Order` can be `asc` for ascending which is also default or `desc` for descending. We provide [`Order`](https://github.com/Ceskasporitelna/cs-core-sdk-js/blob/master/lib/web-api/lists.ts#L156) enum for these values too.

```javascript

    CSTransparentAccSDK
        .getClient()
        .accounts
        .list({
            pageNumber: 0,
            pageSize: 10,
            sort: SortableFields.ID,
            order: CSCoreSDK.Order.ASCENDING,
        })
        .then(function(response) {
            // ...
        });

```

You can use multiple values for sorting.

```javascript

    CSTransparentAccSDK
        .getClient()
        .accounts
        .list({
            pageNumber: 0,
            pageSize: 10,
            sort: [
                'type',
                'id',
            ],
            types: [
                'desc',
                'asc'
            ]
        })
        .then(function(response) {
            // ...
        });

```

## Functionality

Transparent Accounts SDK provides the following functionality:

- [**Accounts**](./accounts.md) - Get information about transparent accounts.
- [**Transactions**](./transactions.md) - Get information about transparent accounts transactions

## Demo
Check out the [AngularJS demo application](https://github.com/Ceskasporitelna/csas-sdk-demo-js) for usage demonstration.

## Further documentation
Please see the documented [TypeScript definition file](../dist/cs-transparent-acc-sdk.sfx.d.ts) for detailed description of the functionalities provided by this SDK.

This SDK communicates with Transparent Accounts API. You can have a look at its [documentation](http://docs.ext0csastransparentaccounts.apiary.io/).
