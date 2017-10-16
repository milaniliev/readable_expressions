## Example 

### Simple

```js
let {any, all, start, end, letter, number, Expression} = require('simple_expression')

let valid_url = new Expression(
   start,
   any("http", "https", "ftp"),  
   "://",
   letter,
   any(letters, numbers, "-").any_number,
   chunk("path",
     "/",
     any(letters, numbers, "-").any_number
   ).possibly
   end
)

```

### With composition

```js

let {any, all, start, end, letter, number, Expression} = require('simple_expression')

Let url_characters = any(letters, numbers, "-").any_number

Let path_segment = new Expression("/", url_characters)

Let path = path_segment.any_number

Let valid_url = new Expression(
   start,
   any("http", "https", "ftp"),  
   "://",
   letter,
   any(letter, number, "-").any_number,
   chunk("path", path).possibly
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