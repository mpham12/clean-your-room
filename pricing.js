module.exports.calculateProductPrice = function (product, employee, selectedOptions) {
  var price = 0
  var fmtc = selectedOptions.familyMembersToCover

  switch (product.type){
    case 'medical':
      if (fmtc.includes('ee')) price += MedicalProductPrice(product, 'ee')
      if (fmtc.includes('sp')) price += MedicalProductPrice(product, 'sp')
      if (fmtc.includes('ch')) price += MedicalProductPrice(product, 'ch')
      if (fmtc.includes('chs')) price += MedicalProductPrice(product, 'chs')
      return parseInt(price * 100) / 100
    case 'volLife':
      if(fmtc.includes('ee')) price += volLifeProductPrice(product, 'ee',  selectedOptions)
      if(fmtc.includes('sp')) price += volLifeProductPrice(product, 'sp',  selectedOptions)
      return parseInt(price * 100) / 100
    case 'ltd':
      if (fmtc.includes('ee')) price += ltdPrice(product,'ee',employee)
      return parseInt(price * 100) / 100
    default:
      return 0
  }
  
}

function MedicalProductPrice(product, role){
  var roleCost = product.costs.find(function (cost) {
    return cost.role === role
  })

  return roleCost.price
}

function volLifeProductPrice (product,role,selectedOptions,){
  var price = 0
  var volCoverage = selectedOptions.coverageLevel.find(function (coverage) {
    return coverage.role === role
  })
  var roleCost = product.costs.find(function (cost) {
    return cost.role === role
  })

  price += (volCoverage.coverage / roleCost.costDivisor) * roleCost.price

  if (product.employerContribution.mode === 'dollar') {
    price = price - product.employerContribution.contribution
  } else {
    var dollarsOff = price * (product.employerContribution.contribution / 100)
    price = price - dollarsOff
  }

  return price
}
function ltdPrice (product,role, employee){
  var price = 0
  var volCoverage = product.coverage.find(function (coverage) {
    return coverage.role === role
  })

  var roleCost = product.costs.find(function (cost) {
    return cost.role === role
  })

  var salaryPercentage = volCoverage.percentage / 100

  price += ((employee.salary * salaryPercentage) / roleCost.costDivisor) * roleCost.price

if (product.employerContribution.mode === 'dollar') {
  price = price - product.employerContribution.contribution
} else {
  var dollarsOff = price * product.employerContribution.contribution
  price = price - dollarsOff
}
return price
}
