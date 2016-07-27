const NEW_PHONE = 100
const ACCESSORIES = 50
const TAX_RATE = 0.10


exports.costBeforeTax = function (startAmount, threshold) {
  var finalAmount = startAmount
  if (finalAmount > threshold)
    return "Not Enough Money"
  while (finalAmount + NEW_PHONE < threshold) {
    finalAmount += NEW_PHONE
    if (finalAmount < threshold) {
      finalAmount += ACCESSORIES
    }
  }
  return finalAmount
}

exports.tax = function tax (cost) {
  return cost + (cost * TAX_RATE)
}

exports.formattedCost = function (cost) {
  return "$" + cost.toFixed(2)
}
