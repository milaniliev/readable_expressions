let {expression, any} = require('../')

describe("Named expression", () => {
  let fruit = any("peach", "apricot").named("fruit")
  let test_expression = expression(fruit, " ", "jelly")

  it("constructs the correct pattern", () => {
    expect(fruit.names).toEqual(["fruit"])
    expect(test_expression.names).toEqual(["fruit"])

    expect(test_expression.pattern).toEqual('((?:peach|apricot)) jelly')
  })

  it("reports positive match on first option", () => {
    let match = test_expression.match("peach jelly")

    expect(match.found).toBe(true)
    expect(match.index).toEqual(0)
    expect(match.fruit).toEqual("peach")
  })

  it("reports positive match on second option", () => {
    let match = test_expression.match("apricot jelly")

    expect(match.found).toBe(true)
    expect(match.index).toEqual(0)
    expect(match.fruit).toEqual("apricot")
  })

  it("reports negative match", () => {
    let match = test_expression.match("grape jelly")

    expect(match.found).toBe(false)
  })
})

describe("Multiple Named expression", () => {
  let fruit = any("peach", "apricot").named("fruit")
  let product = any("jelly", "jam").named('product')
  let test_expression = expression(fruit, " ", product)

  it("constructs the correct pattern", () => {
    expect(test_expression.pattern).toEqual('((?:peach|apricot)) ((?:jelly|jam))')
  })

  it("reports positive match on first option", () => {
    let match = test_expression.match("peach jelly")

    expect(match.found).toBe(true)
    expect(match.index).toEqual(0)
    expect(match.fruit).toEqual("peach")
    expect(match.product).toEqual("jelly")
  })

  it("reports positive match on second option", () => {
    let match = test_expression.match("apricot jam")

    expect(match.found).toBe(true)
    expect(match.index).toEqual(0)
    expect(match.fruit).toEqual("apricot")
    expect(match.product).toEqual("jam")
  })

  it("reports negative match", () => {
    let match = test_expression.match("grape jelly")

    expect(match.found).toBe(false)
  })
})
