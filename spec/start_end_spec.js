let {expression, start, end} = require('../')

describe("Start expression", () => {
  let test_expression = expression(start, "rose")

  it("constructs the correct pattern", () => {
    expect(test_expression.pattern).toEqual('^rose')
  })

  it("reports positive match", () => {
    let match = test_expression.match("rose petals")

    expect(match.found).toBe(true)
    expect(match.index).toEqual(0)
  })

  it("reports negative match", () => {
    let match = test_expression.match("flowery rose")

    expect(match.found).toBe(false)
  })
})

describe("End expression", () => {
  let test_expression = expression("rose", end)

  it("constructs the correct pattern", () => {
    expect(test_expression.pattern).toEqual('rose$')
  })

  it("reports positive match", () => {
    let match = test_expression.match("rose petals")

    expect(match.found).toBe(false)
  })

  it("reports negative match", () => {
    let match = test_expression.match("flowery rose")

    expect(match.found).toBe(true)
    expect(match.index).toEqual(8)

  })
})
