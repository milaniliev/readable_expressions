## Example 

Say we're converting the following (oversimplified) URL-matching RegExp:

```
/^(http|https):\/\/[\w\d-]+(\/[\w\d-]+)*$/
```

If the above if intuitive and easy-to-read for you, congratulations! If not, this library is here to help.

### Simple

```js
let {any, all, start, end, letter, number, chunk, Expression} = require('simple_expression')

let url_chars = any(letters, numbers, "-").repeated

let valid_url = new Expression(
   start, any("http", "https"), "://", 
   url_chars,
   chunk("path", "/", url_chars).maybe.repeated,
   end
)
```

### With composition

```js

let {any, all, start, end, letter, number, chunk, Expression} = require('simple_expression')

let url_chars = any(letters, numbers, "-").repeated

let path_segment = new Expression("/", url_chars)

let path = path_segment.repeated

let valid_url = new Expression(
   start, any("http", "https"), "://",
   url_chars,
   chunk("path", path).maybe
   end
)

```

## Usage

```js

let url = valid_url.match("https://some.site/path1/path2")

url.path // => "/path1/path2"
```

### Replacement
```js

url.path = "/path3"

url.toString() // => "https://some.site/path3"

```


## Comparative Examples

String:  `{name: "Bob", age: 50 }`


Regexp Form:

```js
let regexp = /(\w+: ((\".*\")|(\d+)))+/
```

Readable Form:
```js

let key = letters.repeated

let number_value = number.repeated
let string_value = expression('"', character.repeated, '"')
let value = either(number_value, string_value).name("value")

let key_value_pair =  expression(key, whitespace.maybe.repeated, ":", whitespace.maybe.repeated, value).name("key_value_pair")

let key_value_pairs = expression(expression(key_value_pair, ",").maybe.repeated, key_value_pair)

let matches = key_value_pairs.match(`{name: "Bob", age: 50}`)

matches.key_value_pair // => [{key: 'name', value: '"Bob"'}, {key: 'age', value: 50}]
```

### Replacing values

Goal: Set each value to its reverse

Regex: ???

Readable:

```js 
matches.key_value_pair.forEach((pair) => pair.value = pair.value.reverse())
matches.toString() // => '{name: "boB", age: 05}'
```

### Matching URLs in Text

Regexp:

```
(
(ftp;https?)://[-\w]+(\.\w[-\w]+)+;
(?i: [a-z0-9] (?:[-a-z0-9]+[a-z0-9])? \. )+
(?-i: com\b
; edu\b
; biz\b
; gov\b
; in(?:t;fo)\b 
; mil\b
; net\b
; org\b
; [a-z][a-z]\b
)
)
(:\d+ )?
(
/
[ˆ.!,?;"’<>()\[\]{}\s\x7F-\xFF]+
(?:
[.!,?]+ [ˆ.!,?;"’<>()\[\]{}\s\x7F-\xFF]+
)
```

Readable:

```js
let protocol = either("ftp", "http", "https")
let subdomain = either(letter, digit, "-").repeated()

let country_tld = expression(chars("a-z"), chars("a-z"))
let top_level_domain = either("com", "org", "net", "edu", "biz", "gov", "mil", country_tld)

let port = expression(":", digit.repeated())

let path_segment = chars('ˆ.!,?;"’<>()[]{}', whitespace, letter)
let path = expression(path_segment, "/").repeated()

let url = expression(
  protocol, "://", 
  expression(subdomain, ".").repeated().maybe(), subdomain, top_level_domain, port.maybe(), 
  expression("/", path).maybe()
)
```

### Replacing HTML tags with their uppercase variants

Regexp:

```js
  let url = /<\s([a-zA-Z0-9\-_])\s>\s.*\s<\s\/$1\s>/g
  let matches = "<html><head></head><body></body></html>".match(url)

```

Readable:

```js
  let tag_chars = chars(letter, digit, "-", "_").repeated
  let attributes = expression(tag_chars, "=", tag_chars)
  let tag = expression("<", whitespace.maybe, 
    tag_chars.named("tag_name"), 
    whitespace.maybe, 
    attributes, 
    whitespace.maybe, ">", 
    anything, 
    "</", matched("tag_name"), ">").named("tag")

  let parsed_string = tag.match("<html><head></head><body></body></html>")

  parsed_string.matches('tag').forEach((match) => match.tag_name = match.tag_name.toUpperCase())

  parsed_string.toString() // => <HTML><HEAD></HEAD><BODY></BODY></HTML>
```