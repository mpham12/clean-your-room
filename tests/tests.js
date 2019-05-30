var calculateProductPrice = require('../pricing').calculateProductPrice
var products = require('./products')
var employee = require('./employee').employee
var expect = require('chai').expect

describe('calculateProductPrice', function () {
  it('returns the price for a medical product for a single employee', function () {
    var selectedOptions = { familyMembersToCover: ['ee'] }
    var price = calculateProductPrice(products.medical, employee, selectedOptions)

    expect(price).to.equal(19.26)
  })

  it('returns the price for a medical product for an employee with a spouse', function () {
    var selectedOptions = { familyMembersToCover: ['ee', 'sp'] }
    var price = calculateProductPrice(products.medical, employee, selectedOptions)

    expect(price).to.equal(21.71)
  })

  it('returns the price for a medical product for an employee with a spouse and one child', function () {
    var selectedOptions = { familyMembersToCover: ['ee', 'sp', 'ch'] }
    var price = calculateProductPrice(products.medical, employee, selectedOptions)

    expect(price).to.equal(22.88)
  })

  it('returns the price for a voluntary life product for a single employee', function () {
    var selectedOptions = {
      familyMembersToCover: ['ee'],
      coverageLevel: [{ role: 'ee', coverage: 125000 }],
    }
    var price = calculateProductPrice(products.voluntaryLife, employee, selectedOptions)

    expect(price).to.equal(39.37)
  })

  it('returns the price for a voluntary life product for an employee with a spouse', function () {
    var selectedOptions = {
      familyMembersToCover: ['ee', 'sp'],
      coverageLevel: [
        { role: 'ee', coverage: 200000 },
        { role: 'sp', coverage: 75000 },
      ],
    }
    var price = calculateProductPrice(products.voluntaryLife, employee, selectedOptions)

    expect(price).to.equal(71.09)
  })

  it('returns the price for a disability product for an employee', function () {
    var selectedOptions = {
      familyMembersToCover: ['ee']
    }
    var price = calculateProductPrice(products.longTermDisability, employee, selectedOptions)

    expect(price).to.equal(22.04)
  })

  it('throws an error on unknown product type', function () {
    var unknownProduct = { type: 'vision' }

    expect(calculateProductPrice(unknownProduct, {}, {})).to.equal(0)
  })
})
