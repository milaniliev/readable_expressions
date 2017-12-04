let {expression} = require('../')

describe("Simple matches", () => {
  let simple_expression = expression("aaa")    
  
  it("reports positive match", () => {
    let match = simple_expression.match("baaa")

    expect(match.found).toBe(true)
  })

  it("reports negative match", () => {
    let match = simple_expression.match("baq")

    expect(match.found).toBe(false)
  })

  it("finds index of match", () => {
    let match = simple_expression.match("baaa")

    expect(match.index).toEqual(1)
  })
})

describe("Simple composited expression", () => {
  let composite_expression = expression("b", "aaa")

  it("matches_correctly", () => {
    let match = composite_expression.match("baaa")
    expect(match.found).toBe(true)    
    expect(match.index).toBe(0)
  })
})