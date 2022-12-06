/**
 * Calculate option theoretical price using Black-Scholes model
 *
 * @param {number} stock The underlying stock price.
 * @param {number} vola The implied volatility.
 * @param {number} strike The option strike price.
 * @param {number} dte The number of days till expiration.
 * @param {number} riskFree The risk free interest rate.
 * @param {boolean} isCall True to calculate Call option; False to calculate Put option.
 * @return The theoretical price.
 * @customfunction
 */
function BlackScholes(stock, vola, strike, dte, riskFree, isCall) {  
  var t = dte/365
  var log = Math.log(stock/strike)
  var trvola = t*(riskFree + Math.pow(vola, 2)/2)
  var volaRootT = vola*Math.sqrt(t)
  var d1 = (Math.log(stock/strike)+t*(riskFree + Math.pow(vola, 2)/2))/volaRootT;
  
  var d2 = (d1-volaRootT)
  
  var normD1 = this.normalDist(d1, 0, 1);
  var sExprqtt = stock * 1;
  var normD2 = this.normalDist(d2, 0, 1);
  var xExprRT = strike * Math.exp(-1*riskFree*t);
  
  if (isCall) {
    var callPrice = sExprqtt * normD1 - xExprRT * normD2;
    return callPrice;
  } else {
    var normNegativeD1 = this.normalDist(-1 * d1, 0, 1);
    var normNegativeD2 = this.normalDist(-1 * d2, 0, 1);
    var putPrice = xExprRT * normNegativeD2 - sExprqtt * normNegativeD1;
    return putPrice;
  }
}

function normalcdf(X){
  var T=1/(1+.2316419*Math.abs(X));
  var D=.3989423*Math.exp(-X*X/2);
  var Prob=D*T*(.3193815+T*(-.3565638+T*(1.781478+T*(-1.821256+T*1.330274))));
  if (X>0) {
    Prob=1-Prob
  }
  return Prob
}   

function normalDist(x, mean, stdev) {
  var prob = 0;
  if(stdev == 0) {
    if(x < mean) {
      prob = 0;
    } else {
      prob = 1;
    }
  } else {
    prob = this.normalcdf((x - mean) / stdev);
    prob = Math.round(100000*prob)/100000;
  }
  return pro
}