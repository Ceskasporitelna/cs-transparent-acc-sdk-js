/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
/// <reference path="../build/cs-transparent-acc-sdk.sfx.d.ts"/>
/// <reference types="jasmine" />
/// <reference types="node" />

var CoreSDK = require('cs-core-sdk');
var transparentAcc  = require('../build/cs-transparent-acc-sdk.node.js');
var judge : CSCoreSDK.Judge = null;
var judgeSession : CSCoreSDK.JudgeSession = null;
var client : CSTransparentAccSDK.TransparentAccountsClient = null;
var expectToBe = CoreSDK.TestUtils.expectToBe;
var expectDate = CoreSDK.TestUtils.expectDate;
var logJudgeError = CoreSDK.TestUtils.logJudgeError;

describe("TransparentAcc SDK",function(){
    var originalTimeoutInterval = null;
    
    beforeAll(function(){
        judge = new CoreSDK.Judge();
        //Because Judge starts slowly on the first request
        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    })
    
    afterAll(function(){
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
    });    
    
    beforeEach(function(){
        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
        client =  transparentAcc.getClient();	
        judgeSession = judge.startNewSession();
    })
    
    function processResponse(response) {
        var account = response.items[0];
        expect(account.type).toBe("30500");
        
        expectDate(account, {
            dueDate: '2016-01-22',
            processingDate: '2016-01-22',
        });
        
        expectToBe(account.amount, {
            value: 4428,
            currency: 'CZK',
            precision: 2,
        });
        expect(response.items[1].amount.value).toBe(3035);
    }
    
    function processSimpleResponse(account) {
        
        expectDate(account, {
            transparencyFrom: '2015-04-08T00:00:00',
        });
        expectDate(account, {
            transparencyFrom: '2015-04-08T00:00:00',
            transparencyTo: '3000-01-01T00:00:00',
            publicationTo: '3000-01-01T00:00:00',
            actualizationDate: '2016-04-25T08:00:05',
        });
        
        expectToBe(account, {
            bankCode: '0800',
            balance: 612867.93,
            currency: 'CZK',
            name: 'Společenství Praha 4, Obětí 6.května 553',
            description: 'popis',
            note: 'pozn.',
            iban: 'CZ19 0800 0000 0000 0040 4578',
            id: '000000-0109213309'
        });
    }
      
    describe('Accounts Resource', function() {
       var response;
       it('retrieves list of transparent accounts', function(done) {
            judgeSession.setNextCase("transparentAccounts.list.page0").then(function() {
                return client.accounts.list({
                    pageNumber: 0,
                    pageSize: 3
                });
            }).then(list => {
                expectToBe(list.pagination, {
                    pageNumber: 0,
                    pageSize: 3,
                    pageCount: 44,
                    nextPage: 1,
                });
                expect(list.items.length).toBe(3);
                processSimpleResponse(list.items[0]);
                response = list;
                return judgeSession.setNextCase('transparentAccounts.list.page1');
            }).then(() => {
                return response.nextPage();
            }).then(response => {
                var account = response.items[0];
                expect(response.items.length).toBe(3);
                expectDate(account, {
                    transparencyFrom: '2013-09-01T00:00:00',
                    transparencyTo: '3000-01-01T00:00:00',
                    publicationTo: '3000-01-01T00:00:00',
                    actualizationDate: '2016-04-29T10:00:50',
                });
                
                expectToBe(response.pagination, {
                    pageNumber: 1,
                    pageSize: 3,
                    pageCount: 44,
                    nextPage: 2,
                });
                expectToBe(account, {
                    id: '000000-0099333322',
                    bankCode: '0800',
                    balance: 186416.8,
                    iban: 'CZ74 0800 0000 0000 0000 9933' 
                });
                done();
            }).catch((e) => {
                logJudgeError(e);
            });
       });

       it('tests filter query param', done => {
           judgeSession.setNextCase('transparentAccounts.filter.list').then(() => {
                return client.accounts.list({
                    filter: 'školy',
                    pageNumber: null,
                    pageSize: null,
                });
           }).then(response => {
            expectToBe(response.pagination, {
                pageNumber: 0,
                pageSize: 50,
                pageCount: 1,
            });

            expect(response.items.length).toBe(2);

            expectToBe(response.items[0], {
                accountNumber: '000000-3840968309',
                bankCode: '0800',
                balance: 5212.51,
                currency: 'CZK',
                name: 'Sdružení rodičů, studentů a přátel školy při Střední průmyslové škole textilní v Liberci, Tyršova 1',
                iban: 'CZ91 0800 0000 0038 4096 8309',
            });

            expectDate(response.items[0], {
                transparencyFrom: '2014-10-30T00:00:00',
                transparencyTo: '3000-01-01T00:00:00',
                publicationTo: '3000-01-01T00:00:00',
                actualizationDate: '2017-07-15T16:01:58',
            })

            done();
           })
       })
       
       it('restrives account by id', (done) => {
            judgeSession.setNextCase("transparentAccounts.withId.get").then(() => {
                return client.accounts.withId("000000-0109213309").get();
            }).then(account => {
                processSimpleResponse(account);
                done();
            }).catch((e) => {
                logJudgeError(e);
            });
       });
       
       it('retrieves account by id and lists its transactions', (done) => {
           var acc;
          judgeSession.setNextCase("transparentAccounts.withId.get").then(() => {
              return client.accounts.withId("000000-0109213309").get();
          }).then(account => {
                processSimpleResponse(account);
                acc = account;
          }).then((account) => {
              return judgeSession.setNextCase("transparentAccounts.withId.transactions.page0")
          }).then(() => {
              return acc.transactions.list({
                      pageNumber: 0,
                      pageSize: 3
              });
          }).then((response) => {
              processResponse(response);     
              done();  
            }).catch((e) => {
                logJudgeError(e);
            });;
       });
       
       it('retrieves first page of transactions', (done) => {
          var list;
          judgeSession.setNextCase("transparentAccounts.withId.transactions.page0").then(() => {
              return client.accounts.withId("000000-0109213309").transactions.list({
                  pageSize: 3,
                  pageNumber: 0
              });
          }).then(response => {          
              processResponse(response);
              list = response;
          }).then(() => {
              return judgeSession.setNextCase("transparentAccounts.withId.transactions.page1")
          }).then(() => {
              return list.nextPage();    
          }).then(response => {
              var account = response.items[0]  
              expectToBe(account.amount, {
                  value: 1928,
                  precision: 2,
                  currency: 'CZK'
              });
              expectToBe(account, {
                  type: '30500',
                  senderName: 'Hluštíková Kateřina'
              });
              expectToBe(response.pagination, {
                  prevPage: 0,
                  hasPrevPage: true
              });

              expectDate(account, {
                  dueDate: '2016-01-17',
                  processingDate: '2016-01-17',
              });

              list = response;
          }).then(() => {
              return judgeSession.setNextCase("transparentAccounts.withId.transactions.page0");
          }).then(() => {
              return list.prevPage();
          }).then(response => {
              processResponse(response);
              expectToBe(response.pagination, {
                  prevPage: null,
                  hasPrevPage: false
              });
              done();
          }).catch((e) => {
                logJudgeError(e);
          });
       });

       it('tests query params in transactions list', (done) => {
          var list;
          judgeSession.setNextCase("transparentAccounts.withId.transactions.filter.list").then(() => {
              return client.accounts.withId("000000-0109213309").transactions.list({
                pageSize: 100,
                pageNumber: 0,
                sort: 'amount',
                order: 'asc',
                filter: '0598',
                dateFrom: new Date(2017, 4, 12),
                dateTo: new Date(2017, 5, 12),
              });
          }).then(response => {          
              
            expectToBe(response.pagination, {
                pageNumber: 0,
                pageSize: 100,
                pageCount: 1
            });

            expect(response.items.length).toBe(2);

            const transaction = response.items[0];

            expectToBe(transaction, {
                type: '30500',
                typeDescription: 'Úrok kredit',
            });

            expectToBe(transaction.amount, {
                value: 4.76,
                precision: 0,
                currency: 'CZK',
            });
            expectToBe(transaction.sender, {
                accountNumber: '000000-0000000000',
                bankCode: '0800',
                iban: 'CZ29 0800 0000 0028 4039 2309',
                specificSymbol: '0000000000',
                specificSymbolParty: '0000000000',
                constantSymbol: '0598',
            });
            expectToBe(transaction.receiver, {
                accountNumber: '000000-2840392309',
                bankCode: '0800',
                iban: 'CZ29 0800 0000 0028 4039 2309',
            });
            expectDate(transaction, {
                dueDate: '2017-06-30T00:00:00',
                processingDate: '2017-06-30T00:00:00',
            });

            done();
          }).catch(logJudgeError);
       });
       
       it('should fail if called prevPage with null', (done) => {
          var list;
          judgeSession.setNextCase("transparentAccounts.withId.transactions.page0").then(() => {
              return client.accounts.withId("000000-0109213309").transactions.list({
                  pageSize: 3,
                  pageNumber: 0
              });
          }).then((response) => {          
              processResponse(response);
              expect(response.pagination.prevPage).toBe(null);
              expect(response.pagination.hasPrevPage).toBe(false);
              list = response;
          }).then(() => {
              return list.prevPage().catch(err => {
                expect(err.message).toBe('You cannot call prevPage on page 0');
                done();    
              });
          }).catch((e) => {
                logJudgeError(e);
          });
       });
       
       it('retrieves transactions', (done) => {
          judgeSession.setNextCase("transparentAccounts.withId.transactions.page0").then(() => {
             return client.accounts.withId("000000-0109213309").transactions.list({
                    pageNumber: 0,
                    pageSize: 3 
             });
          }).then((response) => {
              processResponse(response);
              done();
          }).catch((e) => {
                logJudgeError(e);
          });
       });
    });
});