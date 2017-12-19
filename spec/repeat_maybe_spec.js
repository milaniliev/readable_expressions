let {expression, start, end} = require('../')

describe("Repeated expression", () => {
  let original_expression = expression("rose")
  let test_expression = original_expression.repeated()

  it("constructs the correct pattern", () => {
    expect(test_expression.components[0]).toEqual(original_expression)

    expect(test_expression.pattern).toEqual('(?:rose)+')
  })

  it("reports positive match", () => {
    let match = test_expression.match("roseroseroseroserose")

    expect(match.found).toBe(true)
    expect(match.index).toEqual(0)
  })

  it("reports negative match", () => {
    let match = test_expression.match("ros flowers")

    expect(match.found).toBe(false)
  })
})

describe("Maybe expression", () => {
  let original_expression = expression("rose")
  let test_expression = original_expression.repeated()

  it("constructs the correct pattern", () => {
    expect(test_expression.components[0]).toEqual(original_expression)

    expect(test_expression.pattern).toEqual('(?:rose)+')
  })

  it("reports positive match", () => {
    let match = test_expression.match("roseroseroseroserose")

    expect(match.found).toBe(true)
    expect(match.index).toEqual(0)
  })

  it("reports negative match", () => {
    let match = test_expression.match("ros flowers")

    expect(match.found).toBe(false)
  })
})
