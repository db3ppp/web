(function(angular) {
  'use strict';
angular.module('invoice1', []) //invoice1이라는 모듈에 InvoiceController라는 컨트롤러 안에 total,convertCurrency,pay함수 정의 되어있음
  .controller('InvoiceController', function InvoiceController() {
    this.qty = 1;
    this.cost = 2;
    this.inCurr = 'EUR';
    this.currencies = ['USD', 'EUR', 'CNY'];
    this.usdToForeignRates = {
      USD: 1,
      EUR: 0.74,
      CNY: 6.09
    };

    this.total = function total(outCurr) {
      return this.convertCurrency(this.qty * this.cost, this.inCurr, outCurr);
    };
    this.convertCurrency = function convertCurrency(amount, inCurr, outCurr) {
      return amount * this.usdToForeignRates[outCurr] / this.usdToForeignRates[inCurr];
    };
    this.pay = function pay() {
      window.alert('Thanks!');
    };
  });
})(window.angular);
