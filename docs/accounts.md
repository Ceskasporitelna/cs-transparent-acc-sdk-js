# Accounts

This guide walks you through accessing transparent accounts information.

[AccountsResource](../lib/accounts.ts#L11)

```javascript

  // Get TransparentAccountsResource
  CSTransparentAccSDK
    .getClient()
    .accounts

```

## 1. List All Transparent Accounts

You can list all transparent accounts by calling the [`list`](../lib/accounts.ts#L20) method on [TransparentAccountsResource](../lib/accounts.ts#L11). The method takes object with options as a parameter. See [TransparentAccountsParameters](../lib/accounts.ts#L183) for all supported options. For full response see [TransparentAccountList](../lib/accounts.ts#L95) interface.

```javascript

    // List of available accounts
    CSTransparentAccSDK
        .getClient()
        .accounts
        .list(parameters: TransparentAccountsParameters)
        .then(...)
        .catch(...)

```

## 2. Get Transparent Account Detail

You can get detail of the transparent account by calling the [`withId`](../lib/accounts.ts#L41) method on [`TransparentAccountsResource`](../lib/accounts.ts#L11) with `id` as a parameter and then calling the [`get`](../lib/accounts.ts#L60) method. For complete response see [`TransparentAccount`](../lib/accounts.ts#L100)interface.

```javascript

    // Get one specific transparent account using accountListing accountNumber.
    CSTransparentAccSDK
        .getClient()
        .accounts
        .withId(id: string|number)
        .get()
        .then(...)
        .catch(...);

```