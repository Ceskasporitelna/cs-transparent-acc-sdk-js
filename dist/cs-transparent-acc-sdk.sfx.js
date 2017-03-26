var CSTransparentAccSDK =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	var accounts_1 = __webpack_require__(2);
	var sharedClient = null;
	/**
	 * Returns the singleton TransparentAccountsClient
	 * @returns {TransparentAccountsClient}
	 */
	function getClient() {
	    if (sharedClient === null) {
	        sharedClient = new TransparentAccountsClient(CSCoreSDK.config);
	    }
	    return sharedClient;
	}
	exports.getClient = getClient;
	/**
	 * Transparent Accounts client
	 * @class TransparentAccountsClient
	 * @extends {CSCoreSDK.WebApiClient}
	 */
	var TransparentAccountsClient = (function (_super) {
	    __extends(TransparentAccountsClient, _super);
	    /**
	     * Creates new instance of TransparentAccClient
	     * @param {CSCoreSDK.WebApiConfiguration} config - object that configures this client
	     */
	    function TransparentAccountsClient(config) {
	        var _this = _super.call(this, config, '/api/v2/transparentAccounts') || this;
	        //Disable signing as it is not supported for Transparent Accounts API.
	        _this.config.signingKey = null;
	        return _this;
	    }
	    Object.defineProperty(TransparentAccountsClient.prototype, "accounts", {
	        /**
	         * List Transparent accounts and get a detail of them
	         * @returns {TransparentAccountsResource}
	         */
	        get: function () {
	            return new accounts_1.TransparentAccountsResource(this.getPath(), this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return TransparentAccountsClient;
	}(CSCoreSDK.WebApiClient));
	exports.TransparentAccountsClient = TransparentAccountsClient;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = CSCoreSDK;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	var transactions_1 = __webpack_require__(3);
	/**
	 * List Transparent accounts and get a detail of them
	 * @class TransparentAccountsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<TransparentAccount>}
	 * @implements {CSCoreSDK.HasInstanceResource<TransparentAccountResource>}
	 */
	var TransparentAccountsResource = (function (_super) {
	    __extends(TransparentAccountsResource, _super);
	    function TransparentAccountsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * List Transparent accounts
	         * @param {TransparentAccountsParameters=} params
	         * @returns {Promise<TransparentAccountList>}
	         */
	        _this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'accounts', params, function (response) {
	                response.items.forEach(function (item) {
	                    // transform ISO strings to native Date objects and add id property
	                    transformResponse(item);
	                    // add convenient get and transactions getters to the account listing
	                    resourcifyResponse(item, _this.withId(item.id));
	                });
	                return response;
	            });
	        };
	        /**
	         * Get a single TransparentAccountResource for an account with a given id
	         * @param {string|number} id
	         * @returns {TransparentAccountResource}
	         */
	        _this.withId = function (id) {
	            return new TransparentAccountResource(id, _this._path, _this._client);
	        };
	        return _this;
	    }
	    return TransparentAccountsResource;
	}(CSCoreSDK.Resource));
	exports.TransparentAccountsResource = TransparentAccountsResource;
	/**
	 * Get a detail of an account
	 * @class TransparentAccountResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<TransparentAccount>}
	 */
	var TransparentAccountResource = (function (_super) {
	    __extends(TransparentAccountResource, _super);
	    function TransparentAccountResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Returns detail of the account in a Promise
	         * @returns {Promise<TransparentAccount>}
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (account) {
	                // transform ISO strings to native Date objects and add id property
	                transformResponse(account);
	                // add convenient transactions getter to the account listing
	                account.transactions = _this.transactions;
	                return account;
	            });
	        };
	        return _this;
	    }
	    Object.defineProperty(TransparentAccountResource.prototype, "transactions", {
	        /**
	         * Returns TransactionResource for listing transactions of the account
	         * @returns {TransactionsResource}
	         */
	        get: function () {
	            return new transactions_1.TransactionsResource(this.getPath() + "/transactions", this._client);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return TransparentAccountResource;
	}(CSCoreSDK.InstanceResource));
	exports.TransparentAccountResource = TransparentAccountResource;
	function transformResponse(account) {
	    CSCoreSDK.EntityUtils.addIdProperty(account, "accountNumber");
	    CSCoreSDK.EntityUtils.addDatesFromISO(['transparencyFrom', 'transparencyTo', 'publicationTo', 'actualizationDate'], account);
	}
	function resourcifyResponse(accountListing, accountResource) {
	    accountListing.get = accountResource.get;
	    accountListing.transactions = accountResource.transactions;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var CSCoreSDK = __webpack_require__(1);
	/**
	 * List Transactions of an account
	 * @class TransactionsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Transaction>}
	 */
	var TransactionsResource = (function (_super) {
	    __extends(TransactionsResource, _super);
	    function TransactionsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * List all transactions of the account
	         * @param {TransactionsParameters} params
	         * @returns {Promise<TransactionList>}
	         */
	        _this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, "transactions", params, function (response) {
	                CSCoreSDK.EntityUtils.addDatesToItems(['dueDate', 'processingDate'], response);
	                return response;
	            });
	        };
	        return _this;
	    }
	    return TransactionsResource;
	}(CSCoreSDK.Resource));
	exports.TransactionsResource = TransactionsResource;


/***/ }
/******/ ]);