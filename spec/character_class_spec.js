let {expression, chars} = require('../')

describe("Character Class match", () => {
  let simple_expression = expression(chars("a-z"))

  it("constructors the correct pattern", () => {
    expect(simple_expression.pattern).toBe("[a-z]")
  })

  it("reports positive match", () => {
    let match = simple_expression.match("baaa")

    expect(match.found).toBe(true)
  })

  it("reports negative match", () => {
    let match = simple_expression.match("1235-")

    expect(match.found).toBe(false)
  })

  it("finds index of match", () => {
    let match = simple_expression.match("2baaa")

    expect(match.index).toEqual(1)
  })
})

describe("Composited character expression", () => {
  let composite_expression = expression("No:", chars("0-9"))

  it("matches_correctly", () => {
    let match = composite_expression.match("Serial No:012345")
    expect(match.found).toBe(true)
    expect(match.index).toBe(7)
  })
})
