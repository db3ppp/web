angular.module('finance2', []) //finance2 module생성
.factory('currencyConverter', function() {//currencyConverter라는 factory에 conver함수 정의되어있고, currencies와 convert를 리턴.
  var currencies = ['USD', 'EUR', 'CNY'];
  var usdToForeignRates = {
    USD: 1,
    EUR: 0.74,
    CNY: 6.09
  };
  var convert = function(amount, inCurr, outCurr) {
    return amount * usdToForeignRates[outCurr] / usdToForeignRates[inCurr];

  };

  return {
    currencies: currencies,
    convert: convert
  };
  //factory에서는 이 return 되는 값에 한해서만 다른 module에서 사용하는것이 바람직.
  //외부에 제공할 변수나 함수에 대해서만 return형태로 전달해서 사용할 수 있게 한다.
});
