let {expression} = require('../')

describe("Simple matches", function() {
  let simple_expression = expression("aaa")

  it("matches", function() {
    let match = simple_expression.match("baaa")

    expect(match.index).toEqual(1)
  })
})
