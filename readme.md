#This is an utility for parsing text.

#After 5 Months an update has finally come out!
  I' ll make sure to update this more frequently and add more functions.

#Docs

#approx(token) **EXPERIMENTAL**
  Autocorrects the input token with the tokens list

  **NOTE: This function is experimental and can cause some bugs**

#listify(input, output)
  Takes a string input and converts it into an array.

  First argument: input string

  Second argument: output array

#stringify(input, output)
  Takes an array and comverts it into a string.

  First argument: input array

  Second argument: output string


#add(tokens, cb, description)
  Adds a token and a callback function, throws an error if there isn't a function.

  First argument: the token

  Second argument: callback function, now if you put an argument,

  the parse() function will pass the tokens remaining.

  Third argument: description for the token

#parse(input)
  Parses the input and executes the function if the token is present.\
  If it finds an unknown token it calls the error() function (see below).

  First argument: the input, default is from argv

#error(cb)
  Error function called from parse()

  First argument: callback function called on error,

  the callback function must take 1 argument that the parse() function

  will use to pass the unknown token

#help(cb)
  Function used by user to override the

  default help function.

  First argument: callback function

#getArgs(n) **DEPRECATED, SEE CHANGELOG**
  Get arguments from a specified array

  First argument: how many arguments to return

  Second argument: from what array to get the arguments, default is argv

#ignore(n)
  Ignore errors thrown by parse().

  First argument: how many errors to ignore.

  Putting -1 will suppress all errors

#Changelog
  - Optimized code!
  - Added approx() function
  - Added forChar() function

#Examples
```

const parse = require('@nonamenpm/text-parser')

var test_string = 'foo bar'

parse.error((token) => {

    console.log('This is an error: ' + token)

})

parse.add('foo', () => {

    console.log('bar')

})

parse.parse(test_string)

```

In this case, the output will be:

  bar

  This is an error: bar
