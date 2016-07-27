// Practice
const myModule = require('./practice1.js')

var bankAccount = 500
var amount = 0



var cost = myModule.costBeforeTax(amount, bankAccount)

var costAfterTax = myModule.tax(cost)

var formattedCost = myModule.formattedCost(costAfterTax)

console.log(formattedCost);
