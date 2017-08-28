# Transactions

This guide walks you through accessing transparent accounts transactions.

[TransactionsResource](../lib/transactions.ts#L9)

```javascript

  // Get TransparentAccountsResource
  CSTransparentAccSDK
    .getClient()
    .accounts
    .with(id: string|number)
    .transactions

```

## 1. Get transactions on transparent account

You can list transparent accounts transactions by getting the [TransactionsResource](../lib/transactions.ts#L9) and calling the [`list`](../lib/transactions.ts#L17) method. It takes object with options as a parameter. It also supports sorting, you can use [TransactionsSortableFields](../lib/transactions.ts#L35) enum. See [TransactionsParameters](../lib/transactions.ts#L46) for all supported options. For full response see [TransactionList](../lib/transactions.ts#L68) interface.

```javascript

    CSTransparentAccSDK
        .getClient()
        .accounts
        .withId(id: string|number)
        .transactions
        .list(parameters: TransactionsParameters)
        .then(...)
        .catch(...);

```