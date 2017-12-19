let ReadableExpressions = require('../')
let {any, all, start, end, letter, digit, expression} = ReadableExpressions

describe("URL example expression", () => {
  let url_char = any(letter, digit, "-", '\\.')
  let url_chars = url_char.repeated()
  let path_segment = expression("/", url_chars)
  let path = path_segment.repeated({min: 0})

  let valid_url = expression(
     start, any("http", "https"), "://",
     url_chars,
     path.named("path"),
     end
  )

  it("constructs the correct pattern", () => {
    expect(url_char.pattern).toEqual('(?:[a-zA-Z]|[0-9]|-|\\.)')
    expect(url_chars.pattern).toEqual('(?:(?:[a-zA-Z]|[0-9]|-|\\.))+')
    expect(path_segment.pattern).toEqual('/(?:(?:[a-zA-Z]|[0-9]|-|\\.))+')

    expect(valid_url.pattern).toEqual('^(?:http|https)://(?:(?:[a-zA-Z]|[0-9]|-|\\.))+((?:/(?:(?:[a-zA-Z]|[0-9]|-|\\.))+){0,})$')
  })

  it("reports positive match", () => {
    let match = valid_url.match("https://example.com")

    expect(match.found).toBe(true)
    expect(match.index).toEqual(0)
  })

  it("reports positive match with path", () => {
    let match = valid_url.match("https://example.com/first/page")

    expect(match.found).toBe(true)
    expect(match.index).toEqual(0)
    expect(match.path).toEqual("/first/page")
  })

  it("reports negative match", () => {
    let match = valid_url.match("flowery rose")

    expect(match.found).toBe(false)
  })
})
