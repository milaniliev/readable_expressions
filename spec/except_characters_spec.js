let {expression, except_chars, whitespace} = require('../')

describe("Except Characters match", () => {
  let simple_expression = except_chars("a-z")

  it("constructors the correct pattern", () => {
    expect(simple_expression.pattern).toBe("[^a-z]")
  })

  it("reports positive match", () => {
    let match = simple_expression.match("33512342")

    expect(match.found).toBe(true)
  })

  it("reports negative match", () => {
    let match = simple_expression.match("edelweiss")

    expect(match.found).toBe(false)
  })

  it("finds index of match", () => {
    let match = simple_expression.match("ba2423aa")

    expect(match.index).toEqual(2)
  })
})

describe("Except-chars accepts CharacterClass", () => {
  let expression = except_chars(whitespace)

  it("constructs the correct pattern", () => {
    expect(expression.pattern).toBe("[^\\s]")
  })

  it("matches correctly", () => {
    let match = expression.match("   LETTERSOnly1")
    expect(match.found).toBe(true)
    expect(match.index).toBe(3)
  })

  it("correctly refuses to match", () => {
    let match = expression.match("      \n      ")
    expect(match.found).toBe(false)
  })
})

describe("Composited except-character expression", () => {
  let composite_expression = expression("No:", except_chars("0-9"))

  it("matches_correctly", () => {
    let match = composite_expression.match("Serial No:ABCDE/?F")
    expect(match.found).toBe(true)
    expect(match.index).toBe(7)
  })
})

describe("Composited except-character class expression", () => {
  let composite_expression = expression("No:", except_chars(whitespace))

  it("matches_correctly", () => {
    let match = composite_expression.match("Serial No:ABCDE/?F")
    expect(match.found).toBe(true)
    expect(match.index).toBe(7)
  })

  it("constructs correct regexp", () => {
    expect(composite_expression.pattern).toBe("No:[^\\s]")
  })

  it("correctly refuses to match", () => {
    let match = composite_expression.match("Serial No:   ABCDE/?F")
    expect(match.found).toBe(false)
  })
})
