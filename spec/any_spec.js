let {expression, any} = require('../')

describe("Any match", () => {
  let any_expression = any(expression("boat"), "ship")

  it("constructs the correct pattern", () => {
    expect(any_expression.pattern).toEqual('(?:boat|ship)')
  })

  it("reports positive match on first option", () => {
    let match = any_expression.match("big boat")

    expect(match.found).toBe(true)
    expect(match.index).toEqual(4)
  })

  it("reports positive match on second option", () => {
    let match = any_expression.match("many ships")

    expect(match.found).toBe(true)
    expect(match.index).toEqual(5)
  })

  it("reports negative match", () => {
    let match = any_expression.match("a dinghy")

    expect(match.found).toBe(false)
  })
})
