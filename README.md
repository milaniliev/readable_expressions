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
   chunk("/", url_chars).maybe.repeated,
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