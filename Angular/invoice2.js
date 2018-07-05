(function(angular) {
  'use strict';
angular.module('invoice2', ['finance2'])//invoice2 module이 finance2라는 module에 의존한다.
  .controller('InvoiceController', ['currencyConverter', function InvoiceController(currencyConverter) {
    //InvoiceController가 currencyConverter factory의 함수 사용가능하도록
    //AngularJS는 controller와 service사이의 의존성을 이해하고 controller를 부를때 서비스의 instance를 argument로 부른다.
    this.qty = 1;
    this.cost = 2;
    this.inCurr = 'EUR';
    this.currencies = currencyConverter.currencies;

    this.total = function total(outCurr) {
      return currencyConverter.convert(this.qty * this.cost, this.inCurr, outCurr);
    };
    this.pay = function pay() {
      window.alert('Thanks!');
    };
  }]);
})(window.angular);

/*
Copyright 2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
