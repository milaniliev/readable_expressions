let {expression, start, end} = require('../')

describe("Repeated expression", () => {
  let original_expression = expression("rose")
  let test_expression = original_expression.repeated()

  it("constructs the correct pattern", () => {
    expect(test_expression.components[0]).toEqual(original_expression)

    expect(test_expression.pattern).toEqual('(?:rose)+')
  })

  it("reports positive match", () => {
    let match = test_expression.match("rose petals")

    expect(match.found).toBe(true)
  })

  it("reports repeated match", () => {
    let match = test_expression.match("rose rose rose petals")

    expect(match.found).toBe(true)
    expect(match.index).toEqual(0)
  })

  it("reports negative match", () => {
    let match = test_expression.match("petals")

    expect(match.found).toBe(false)
  })
})

describe("Maybe expression", () => {
  let test_expression = expression(expression("rose ").maybe(), "petals")

  it("constructs the correct pattern", () => {
    expect(test_expression.pattern).toEqual('(?:rose ){0,1}petals')
  })

  it("reports positive match", () => {
    let match = test_expression.match("rose petals")

    expect(match.found).toBe(true)
    expect(match.index).toEqual(0)
  })

  it("reports missing match", () => {
    let match = test_expression.match("petals")

    expect(match.found).toBe(true)
  })
})

describe("Specified repeat expression", () => {
  let test_expression = expression(expression("rose ").repeated({min: 3, max: 5}), "petals")

  it("constructs the correct pattern", () => {
    expect(test_expression.pattern).toEqual('(?:rose ){3,5}petals')
  })

  it("reports positive match", () => {
    let match = test_expression.match("rose petals")

    expect(match.found).toBe(false)
  })

  it("reports repeated match", () => {
    let match = test_expression.match("rose rose rose petals")

    expect(match.found).toBe(true)
    expect(match.index).toEqual(0)
  })

  it("reports negative match", () => {
    let match = test_expression.match("petals")

    expect(match.found).toBe(false)
  })
})
